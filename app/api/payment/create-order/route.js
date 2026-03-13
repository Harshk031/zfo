import Razorpay from 'razorpay';
import { getDb } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { optionId, amount, customerDetails } = body;

    if (!optionId || !amount || !customerDetails.name) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // 1. Initialise Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
    });

    // 2. Create order on Razorpay
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    };

    let rzpOrder;
    // Only attempt Razorpay API if we have actual keys configured, otherwise mock it for dev
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'rzp_test_placeholder') {
      rzpOrder = await razorpay.orders.create(options);
    } else {
      console.warn("Using Razorpay mock mode (No API keys provided).");
      rzpOrder = { id: `order_mock_${Date.now()}` }; 
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
