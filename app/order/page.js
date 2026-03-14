import OrderRitual from '@/components/OrderRitual';

export const metadata = {
  title: 'Order ZfO Masala Soda Online | Buy Craft Soda India',
  description: 'Order ZfO premium masala soda in glass bottles. Single bottle ₹45 or Combo of 4 for ₹169. Real spices, no artificial flavours. Fast delivery across India. Secure payment via Razorpay.',
  alternates: {
    canonical: 'https://www.zfo.co.in/order',
  },
  openGraph: {
    title: 'Order ZfO Masala Soda — Glass Bottle Craft Soda India',
    description: 'Buy ZfO crafted masala soda online. ₹45 single or ₹169 combo. Premium glass bottles. Real Indian spices.',
    url: 'https://www.zfo.co.in/order',
  },
};

export default function OrderPage() {
  return <OrderRitual />;
}
