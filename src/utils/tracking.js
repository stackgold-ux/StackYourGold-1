export const initGA = () => {
  if (typeof window === 'undefined') return;
  console.log('[Tracking] Initializing GA4 Placeholder');
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `;
  document.head.appendChild(script2);
};

export const initMetaPixel = () => {
  if (typeof window === 'undefined') return;
  console.log('[Tracking] Initializing Meta Pixel Placeholder');
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'XXXXXXXXXXXXXXX');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXX&ev=PageView&noscript=1" />`;
  document.body.appendChild(noscript);
};

export const trackAddToCart = (product) => {
  if (typeof window === 'undefined') return;
  
  const params = {
    content_name: product.name,
    content_category: product.type,
    value: product.price,
    currency: 'USD'
  };

  if (window.gtag) {
    window.gtag('event', 'add_to_cart', {
      items: [{
        item_name: product.name,
        item_category: product.type,
        price: product.price,
        quantity: 1
      }]
    });
  }

  if (window.fbq) {
    window.fbq('track', 'AddToCart', params);
  }

  console.log('[Tracking] AddToCart:', product.name);
};

export const trackInitiateCheckout = (cart) => {
  if (typeof window === 'undefined') return;

  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      value: total,
      currency: 'USD',
      items: cart.map(item => ({
        item_name: item.name,
        item_category: item.type,
        price: item.price,
        quantity: 1
      }))
    });
  }

  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: total,
      currency: 'USD'
    });
  }

  console.log('[Tracking] InitiateCheckout: Total $', total);
};

export const trackPurchase = (orderData) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderData.orderId,
      value: orderData.totalAmount,
      currency: 'USD',
      items: orderData.items.map(item => ({
        item_name: item.name,
        item_category: item.type,
        price: item.price,
        quantity: 1
      }))
    });
  }

  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      value: orderData.totalAmount,
      currency: 'USD'
    });
  }

  console.log('[Tracking] Purchase:', orderData.orderId);
};
