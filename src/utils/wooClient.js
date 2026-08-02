const WOO_URL = '/wp-json/wc/v3';
const CONSUMER_KEY = 'ck_bde4fe78a59aafa76fad25a062da31be961bcb3f';
const CONSUMER_SECRET = 'cs_030ac71365a689a5597919f44676a78919d529db';

export const wooClient = {
  getProducts: async (categorySlug) => {
    try {
      let categoryId = null;
      if (categorySlug) {
        const catUrl = `${WOO_URL}/products/categories?slug=${categorySlug}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;
        const catResponse = await fetch(catUrl);
        if (catResponse.ok) {
          const cats = await catResponse.json();
          if (cats.length > 0) {
            categoryId = cats[0].id;
          }
        }
      }

      const url = `${WOO_URL}/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}${categoryId ? `&category=${categoryId}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const products = await response.json();
      return products.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description.replace(/<[^>]*>?/gm, ''), // Basic HTML strip
        price: parseFloat(p.price) || 0,
        images: p.images.length > 0 ? p.images.map(img => ({ url: img.src })) : [{ url: 'https://via.placeholder.com/300' }],
        variants: p.variations.length > 0 ? p.variations.map(v => ({ id: v, title: 'Variation', price: parseFloat(p.price) })) : [{ id: p.id, title: 'Default', price: parseFloat(p.price) }],
        tags: p.tags.map(t => t.name),
        media: []
      }));
    } catch (error) {
      console.error('WooCommerce fetch error:', error);
      return [];
    }
  },

  createOrder: async (orderData) => {
    try {
      const url = `${WOO_URL}/orders?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          payment_method: orderData.paymentMethod,
          payment_method_title: orderData.paymentMethod === 'card' ? 'Credit Card' : 'Other',
          set_paid: true,
          billing: {
            first_name: orderData.customerName.split(' ')[0],
            last_name: orderData.customerName.split(' ').slice(1).join(' '),
            address_1: orderData.shippingAddress,
            email: orderData.customerEmail,
            phone: orderData.customerPhone
          },
          shipping: {
            first_name: orderData.customerName.split(' ')[0],
            last_name: orderData.customerName.split(' ').slice(1).join(' '),
            address_1: orderData.shippingAddress
          },
          line_items: orderData.items.map(item => ({
            product_id: item.wooProductId || 0, // Fallback if not a real woo product
            name: item.name,
            quantity: 1,
            total: item.price.toString()
          }))
        })
      });

      if (!response.ok) {
        throw new Error('WooCommerce order creation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('WooCommerce order error:', error);
      throw error;
    }
  }
};
