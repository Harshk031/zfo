import Razorpay from 'razorpay';

export async function POST(req) {
  try {
    const { orderId, status } = await req.json();
    const validStatuses = ['CREATED', 'PAID', 'DISPATCHED', 'DELIVERED'];

    if (!orderId || !validStatuses.includes(status)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET_KEY;

    if (!key_id || !key_secret || key_id.includes('placeholder')) {
      throw new Error('Razorpay keys missing or invalid');
    }

    const razorpay = new Razorpay({ key_id, key_secret });

    // Fetch the existing order to get its current notes (so we don't overwrite address/name)
    const existingOrder = await razorpay.orders.fetch(orderId);
    
    // Update the status inside the notes while keeping customer details intact
    await razorpay.orders.edit(orderId, {
      notes: { 
        ...existingOrder.notes, 
        status 
      }
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Status update error:', err);
    return Response.json({ error: 'Failed to update' }, { status: 500 });
  }
}
