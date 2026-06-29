/**
 * HubSpot CRM Integration Client for Stack Your Gold
 * Handles contact creation, deal synchronization, and lead tagging.
 */

const HUBSPOT_CONFIG = {
  accessToken: import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN,
  portalId: import.meta.env.VITE_HUBSPOT_PORTAL_ID
};

class HubSpotClient {
  constructor() {
    this.isAuthenticated = !!HUBSPOT_CONFIG.accessToken;
    if (!this.isAuthenticated) {
      console.warn('HubSpot Client: Missing Access Token. Integration will run in MOCK mode.');
    }
  }

  /**
   * Creates or updates a contact in HubSpot
   */
  async syncContact(contactData) {
    console.log('[HUBSPOT] Syncing contact:', contactData.email);
    
    if (!this.isAuthenticated) {
      return { success: true, mock: true, contactId: 'MOCK-CONTACT-' + Date.now() };
    }

    try {
      const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_CONFIG.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: contactData.email
            }]
          }]
        })
      });

      const searchResult = await response.json();
      let contactId;

      const properties = {
        email: contactData.email,
        firstname: contactData.firstName,
        lastname: contactData.lastName,
        phone: contactData.phone,
        stack_profile: contactData.stackProfile // Custom property
      };

      if (searchResult.total > 0) {
        contactId = searchResult.results[0].id;
        // Update existing
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_CONFIG.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ properties })
        });
      } else {
        // Create new
        const createResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_CONFIG.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ properties })
        });
        const createResult = await createResponse.json();
        contactId = createResult.id;
      }

      return { success: true, contactId };
    } catch (error) {
      console.error('[HUBSPOT ERROR] Contact sync failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Synchronizes an order as a HubSpot Deal
   */
  async syncDeal(orderData, contactEmailOrId) {
    console.log('[HUBSPOT] Syncing deal for:', contactEmailOrId);

    if (!this.isAuthenticated) {
      return { success: true, mock: true, dealId: 'MOCK-DEAL-' + Date.now() };
    }

    try {
      let contactId = contactEmailOrId;

      // If email provided, look up contactId first
      if (contactEmailOrId.includes('@')) {
        const searchResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_CONFIG.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filterGroups: [{
              filters: [{
                propertyName: 'email',
                operator: 'EQ',
                value: contactEmailOrId
              }]
            }]
          })
        });
        const searchResult = await searchResponse.json();
        if (searchResult.total > 0) {
          contactId = searchResult.results[0].id;
        }
      }

      const properties = {
        dealname: `Order ${orderData.orderId} - ${orderData.metalType}`,
        amount: String(orderData.amount),
        pipeline: 'default',
        dealstage: 'appointmentscheduled',
        metal_type: orderData.metalType,
        subscription_tier: orderData.subscriptionTier
      };

      const response = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_CONFIG.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties })
      });

      const deal = await response.json();

      // Associate Deal with Contact
      if (deal.id && contactId) {
        await fetch(`https://api.hubapi.com/crm/v3/associations/deals/contacts/batch/create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_CONFIG.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: [{
              from: { id: deal.id },
              to: { id: contactId },
              type: 'deal_to_contact'
            }]
          })
        });
      }

      return { success: true, dealId: deal.id };
    } catch (error) {
      console.error('[HUBSPOT ERROR] Deal sync failed:', error);
      return { success: false, error: error.message };
    }
  }
}

export const hubspotClient = new HubSpotClient();
export default hubspotClient;
