import { Truck, RotateCcw, FileText, Lock, Mail, Phone } from 'lucide-react';

const sections = {
  shipping: {
    icon: Truck,
    title: 'Shipping Policy',
    body: [
      {
        h: 'Fully insured, every time',
        p: 'Every order we ship is fully insured by us until it reaches your door. If a package is lost or damaged in transit, we make it right — you are never left holding the risk on a shipment.',
      },
      {
        h: 'Discreet packaging',
        p: 'Your metals arrive in secure, durable packaging with no mention of gold, silver, or precious metals anywhere on the outside. Your privacy is part of the product.',
      },
      {
        h: 'Tracking on every order',
        p: 'You will receive tracking information by email as soon as your order leaves our hands. Signature confirmation is used on higher-value shipments.',
      },
      {
        h: 'Where we ship',
        p: 'We currently ship to addresses within the United States. If you need delivery elsewhere, contact us first and we will see what we can do.',
      },
    ],
  },
  returns: {
    icon: RotateCcw,
    title: 'Returns & Refunds',
    body: [
      {
        h: 'Bullion sales are final',
        p: 'Because precious metals prices move every minute, all bullion sales are final once your price locks at checkout. This is standard across the industry and it is how we can offer transparent pricing.',
      },
      {
        h: 'Wrong or damaged item?',
        p: 'If your order arrives with the wrong item or damage from shipping, contact us within 7 days with your order number and photos. We will replace it or refund you — your choice.',
      },
      {
        h: 'Swag and non-bullion items',
        p: 'Unworn, unwashed swag in original condition may be returned within 14 days of delivery for an exchange or store credit. Email us first so we can get you sorted quickly.',
      },
    ],
  },
  terms: {
    icon: FileText,
    title: 'Terms of Service',
    body: [
      {
        h: 'Price lock',
        p: 'Your price is locked the moment you complete checkout. Market moves after that point do not change what you pay — or what we deliver.',
      },
      {
        h: 'Authenticity',
        p: 'Every product we sell is verified authentic. Bullion is sourced from sovereign mints and accredited refineries, and sealed assay products arrive in their original packaging.',
      },
      {
        h: 'Payment',
        p: 'We accept major credit and debit cards through our secure checkout. Orders are processed once payment is confirmed.',
      },
      {
        h: 'Fair use',
        p: 'By using this site you agree not to misuse it — no fraud, no chargeback abuse, no automated scraping. We reserve the right to cancel orders that violate these terms.',
      },
    ],
  },
  privacy: {
    icon: Lock,
    title: 'Privacy Policy',
    body: [
      {
        h: 'What we collect',
        p: 'To fulfill your order we collect your name, email, phone number, shipping address, and payment details (processed securely by our payment provider — we never store full card numbers).',
      },
      {
        h: 'What we never do',
        p: 'We never sell your personal information. We never share it with third parties except the carriers and payment processors required to get your order to you.',
      },
      {
        h: 'Marketing emails',
        p: 'If you join the Stack List, you will get spot-price alerts, restock heads-ups, and drop announcements. Every email has an unsubscribe link, and unsubscribing takes effect immediately.',
      },
      {
        h: 'Cookies',
        p: 'We use basic cookies to keep your cart working and to understand how the site is used. You can manage cookie consent anytime through the banner on your first visit.',
      },
    ],
  },
  contact: {
    icon: Mail,
    title: 'Contact Us',
    body: [
      {
        h: 'Email',
        p: 'For orders, questions, or anything else: contact@stackyourgold.com — we answer every message personally.',
      },
      {
        h: 'Phone',
        p: 'Prefer to talk? Call or text 1-510-999-9999.',
      },
      {
        h: 'Whatnot',
        p: 'Catch us live at @stackgold_silver on Whatnot — Stack Your Silver, gold, on screen.',
      },
      {
        h: 'Response time',
        p: 'We aim to reply within one business day. During live show nights, messages may take a little longer — we are busy stacking with you.',
      },
    ],
  },
};

const Policies = ({ page }) => {
  const section = sections[page] || sections.shipping;
  const Icon = section.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-4 bg-primary/10 rounded-2xl text-primary">
          <Icon size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
          {section.title}
        </h1>
      </div>
      <div className="space-y-8">
        {section.body.map((block, i) => (
          <div key={i} className="bg-surface border border-border p-8 rounded-2xl">
            <h2 className="text-xl font-black uppercase tracking-wider mb-3 text-primary">
              {block.h}
            </h2>
            <p className="text-text-muted leading-relaxed">{block.p}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 p-8 bg-primary/10 border border-primary/30 rounded-2xl text-center">
        <p className="font-bold uppercase tracking-widest text-sm mb-2">Our promise</p>
        <p className="text-text-muted text-sm">
          Fully insured delivery · Authenticity guaranteed · Live transparent pricing · Discreet packaging
        </p>
      </div>
    </div>
  );
};

export default Policies;
