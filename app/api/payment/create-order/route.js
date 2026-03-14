import Razorpay from 'razorpay';
import { getDb } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { optionId, amount, customerDetails } = body;

    if (!optionId || !amount || !customerDetails.name) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // 1. Initialise Razorpay — support both NEXT_PUBLIC_ and plain key names
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret || key_id.includes('placeholder') || key_secret.includes('placeholder')) {
      console.warn('Razorpay keys missing or placeholder — running in MOCK mode.');
    }

    const razorpay = new Razorpay({
      key_id: key_id || 'rzp_test_placeholder',
      key_secret: key_secret || 'secret_placeholder',
    });

    // 2. Create order on Razorpay
    const orderOptions = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };

    let rzpOrder;
    const isLiveMode = key_id && !key_id.includes('placeholder') && key_secret && !key_secret.includes('placeholder');
    let debugReason = 'unknown';
    if (!key_id) debugReason = 'no_key_id';
    else if (!key_secret) debugReason = 'no_secret';
    else if (key_id.includes('placeholder')) debugReason = 'id_is_placeholder';
    else if (key_secret.includes('placeholder')) debugReason = 'secret_is_placeholder';

    if (isLiveMode) {
      rzpOrder = await razorpay.orders.create(orderOptions);
    } else {
      console.warn('MOCK MODE: No real Razorpay order created. Reason:', debugReason);
      rzpOrder = { id: `order_mock_${debugReason}_${Date.now()}` };
    }

    // 3. Save to local SQLite database
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO orders (
        optionId, amount, customerName, customerPhone, customerEmail, customerAddress, razorpayOrderId, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'CREATED')
    `);
    
    const info = stmt.run(
      optionId, 
      amount, 
      customerDetails.name, 
      customerDetails.phone, 
      customerDetails.email || '', 
      customerDetails.address, 
      rzpOrder.id
    );

    // 4. Return to client
    return new Response(JSON.stringify({
      id: rzpOrder.id,
      currency: "INR",
      amount: amount * 100,
      internalId: info.lastInsertRowid
    }), { status: 200 });

  } catch (error) {
    console.error("Order creation error:", error);
    return new Response(JSON.stringify({ error: "Error creating order" }), { status: 500 });
  }
}
