/**
 * KickVault knowledge base.
 *
 * A fictional NYC sneaker store used as the RAG knowledge source for the
 * QuickReply AI demo. These 20 chunks are embedded into the in-memory vector
 * store and retrieved at query time to ground the assistant's answers.
 */

export interface KnowledgeChunk {
  id: string;
  category: "products" | "policies" | "info";
  title: string;
  content: string;
}

export const BUSINESS_NAME = "KickVault";

export const SYSTEM_PROMPT = `You are the KickVault Support assistant — a friendly, concise WhatsApp customer-support agent for KickVault, a premium sneaker store in New York City.

Rules:
- Only answer using the KNOWLEDGE provided below. Never invent products, prices, sizes, or policies.
- If the answer is not in the knowledge, say you're not sure and offer to connect them with the team at support@kickvault.com or (212) 555-0847.
- Keep replies short and chatty, like a real WhatsApp message (1–4 sentences). Use the occasional tasteful emoji (👟 👋 ✅) but don't overdo it.
- Always be warm, helpful, and ready to help place an order or check stock.
- Use the customer's wording. Quote exact prices and sizes from the knowledge.
- Never mention that you are an AI model or that you are using a knowledge base.`;

export const KICKVAULT_KNOWLEDGE: KnowledgeChunk[] = [
  // ── Products (10) ───────────────────────────────────────────────
  {
    id: "prod-aj1",
    category: "products",
    title: "Nike Air Jordan 1 Retro High OG",
    content:
      "The Nike Air Jordan 1 Retro High OG is our flagship sneaker, available in three colorways: Chicago ($180), Shadow ($175), and Royal ($170). It comes in men's sizes 7 to 13, including half sizes. The Air Jordan 1 runs true to size. All three colorways are currently in stock.",
  },
  {
    id: "prod-airmax90",
    category: "products",
    title: "Nike Air Max 90",
    content:
      "The Nike Air Max 90 is a classic everyday runner. We carry the White/Black colorway at $130 and the iconic Infrared colorway at $140. Available in sizes 6 to 12, including half sizes. Runs true to size. Great cushioning with the visible Air unit in the heel.",
  },
  {
    id: "prod-yeezy350",
    category: "products",
    title: "Adidas Yeezy Boost 350 V2",
    content:
      "The Adidas Yeezy Boost 350 V2 is a limited-availability favorite. We stock the Zebra colorway at $220 and the Beluga colorway at $210. Sizes are limited — typically 8 to 11. Important: Yeezys run small, so we recommend sizing up half a size from your usual fit.",
  },
  {
    id: "prod-nb550",
    category: "products",
    title: "New Balance 550",
    content:
      "The New Balance 550 is a retro basketball silhouette. We offer White/Green at $110 and White/Blue at $105, in sizes 7 to 12 including half sizes. Runs true to size. Tip: all New Balance is currently 15% off with code NB15 at checkout.",
  },
  {
    id: "prod-chuck70",
    category: "products",
    title: "Converse Chuck 70",
    content:
      "The Converse Chuck 70 is a premium upgrade on the classic Chuck Taylor, with better cushioning and durable canvas. Available in Black, White, and Red, all priced at $85. We stock the full size range. Runs true to size.",
  },
  {
    id: "prod-aj1-stock",
    category: "products",
    title: "Air Jordan 1 sizes and colorways",
    content:
      "Air Jordan 1 Retro High OG size availability: Chicago, Shadow, and Royal are all available from size 7 through 13 with half sizes. The most popular sizes (9, 10, 11) restock weekly. If your size is out, we can notify you when it's back — just share your email.",
  },
  {
    id: "prod-sale-nb",
    category: "products",
    title: "Current sale — New Balance 15% off",
    content:
      "Current promotion: 15% off all New Balance sneakers with the code NB15 at checkout. This applies to the New Balance 550 White/Green ($110) and White/Blue ($105). The discount stacks on top of the listed price and works alongside free standard shipping on orders over $100.",
  },
  {
    id: "prod-bestsellers",
    category: "products",
    title: "Best sellers and recommendations",
    content:
      "Our best sellers right now are the Air Jordan 1 Chicago ($180), the Nike Air Max 90 Infrared ($140), and the Adidas Yeezy Boost 350 V2 Zebra ($220). For an everyday versatile sneaker on a budget, we recommend the Converse Chuck 70 ($85) or the discounted New Balance 550 (15% off with NB15).",
  },
  {
    id: "prod-price-range",
    category: "products",
    title: "Price overview",
    content:
      "Price overview across our lineup: Converse Chuck 70 starts at $85, New Balance 550 is $105–$110 (before the NB15 discount), Nike Air Max 90 is $130–$140, Air Jordan 1 Retro High OG is $170–$180, and the Adidas Yeezy Boost 350 V2 is $210–$220.",
  },
  {
    id: "prod-restock",
    category: "products",
    title: "Restocks and notifications",
    content:
      "We restock popular models weekly, usually on Thursdays. If a size or colorway is sold out, share your email and we'll send a back-in-stock alert the moment it returns. Limited models like the Yeezy Boost 350 V2 sell out fast, so we recommend signing up for alerts and following @kickvaultnye for drop announcements.",
  },

  // ── Policies & Info (10) ────────────────────────────────────────
  {
    id: "pol-returns",
    category: "policies",
    title: "Return policy",
    content:
      "We offer free 30-day returns on all unworn shoes in their original box. To start a return, just open the link in your order confirmation email and we'll email you a prepaid shipping label. Refunds are issued to your original payment method within 3–5 business days after we receive the shoes.",
  },
  {
    id: "pol-shipping",
    category: "policies",
    title: "Shipping options and times",
    content:
      "Shipping: Standard shipping takes 3–5 business days and is FREE on orders over $100 (otherwise $6.99). Express shipping takes 1–2 business days and costs $12.99. Orders placed before 2pm EST on weekdays ship the same day. We currently ship within the United States.",
  },
  {
    id: "pol-payment",
    category: "policies",
    title: "Accepted payment methods",
    content:
      "We accept Visa, Mastercard, PayPal, and Apple Pay. We also offer Klarna for buy-now-pay-later, so you can split your purchase into interest-free installments. All payments are securely processed and we never store your full card details.",
  },
  {
    id: "info-hours",
    category: "info",
    title: "Store hours",
    content:
      "KickVault store hours: Monday to Saturday from 10am to 8pm EST, and Sunday from 12pm to 6pm EST. Our online store and this WhatsApp assistant are available 24/7, so you can browse and order any time.",
  },
  {
    id: "info-location",
    category: "info",
    title: "Store location",
    content:
      "Our flagship store is located at 145 Orchard Street, New York, NY 10002, in the Lower East Side. Come by for in-person fittings and to see the full collection. Street parking is limited, so public transit is recommended.",
  },
  {
    id: "pol-authentic",
    category: "policies",
    title: "Authenticity guarantee",
    content:
      "Every pair sold at KickVault is 100% authentic. Each order includes a certificate of authenticity, and our sneakers are sourced directly from authorized distributors and verified suppliers. If you ever doubt a pair, contact us and we'll verify it for you.",
  },
  {
    id: "info-sizing",
    category: "info",
    title: "Sizing guidance",
    content:
      "Sizing: Most of our sneakers run true to size — order your usual size for Air Jordan 1, Air Max 90, New Balance 550, and Converse Chuck 70. The one exception is the Adidas Yeezy Boost 350 V2, which runs small — we recommend sizing up half a size. Unsure? Message us your usual size and we'll advise.",
  },
  {
    id: "info-loyalty",
    category: "info",
    title: "KickPoints loyalty program",
    content:
      "Our loyalty program is called KickPoints. You earn 1 point for every $1 spent, and once you reach 50 points you can redeem them for $5 off your next order. Points are added automatically to your account after each purchase and never expire.",
  },
  {
    id: "info-contact",
    category: "info",
    title: "Contact information",
    content:
      "You can reach the KickVault team by email at support@kickvault.com or by phone at (212) 555-0847 during store hours. This WhatsApp line is the fastest way to get help with products, orders, sizing, and returns.",
  },
  {
    id: "info-social",
    category: "info",
    title: "Social media and exclusive drops",
    content:
      "Follow us on Instagram and TikTok at @kickvaultnye for new arrivals, restock announcements, and exclusive drops. DM us on social for early access to limited releases. We post drop dates and behind-the-scenes content regularly.",
  },
];
