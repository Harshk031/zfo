import Razorpay from 'razorpay';

export async function GET() {
  try {
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET_KEY;

    if (!key_id || !key_secret || key_id.includes('placeholder')) {
      return new Response(JSON.stringify({ orders: [] }), { status: 200 });
    }

    const razorpay = new Razorpay({ key_id, key_secret });
    
    // Fetch last 100 orders from Razorpay
    const rzpOrders = await razorpay.orders.all({ count: 100 });
    
    // Map Razorpay data to the Admin Dashboard format
    const orders = rzpOrders.items
      .filter(o => o.receipt && o.receipt.startsWith('rcpt_')) // Filter for our website's orders based on receipt prefix
      .map(o => {
        let status = 'CREATED';
        if (o.status === 'paid') status = 'PAID';
        if (o.notes && o.notes.status) status = o.notes.status; // Override with our custom fulfillment status

        return {
          id: o.id,
          optionId: o.notes?.product?.includes('4') ? 'combo' : 'single (or legacy)',
          amount: o.amount / 100, // Convert from paise to rupees
          customerName: o.notes?.customerName || 'Legacy Order (No Name Saved)',
          customerPhone: o.notes?.customerPhone || 'N/A',
          customerAddress: o.notes?.customerAddress || 'Check Razorpay Dashboard for details',
          status: status,
          createdAt: new Date(o.created_at * 1000).toISOString(),
        };
      });

    return new Response(JSON.stringify({ orders }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Failed to fetch Razorpay orders:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), { status: 500 });
  }
}

