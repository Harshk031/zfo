import crypto from 'crypto';
import { getDb } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, internalOrderId } = body;

    // 1. Verify Signature (Skip if using mock keys in dev)
    const secret = process.env.RAZORPAY_KEY_SECRET;
    
    if (secret && secret !== 'secret_placeholder') {
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generatedSignature = hmac.digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
      }
    } else {
      console.warn("Skipping signature verification due to mock mode.");
    }

    // 2. Update order status in local SQLite DB
    const db = getDb();
    const stmt = db.prepare(`
      UPDATE orders 
      SET status = 'PAID', razorpayPaymentId = ? 
      WHERE id = ?
    `);
    
    stmt.run(razorpay_payment_id || 'mock_payment_id', internalOrderId);

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("Verification error:", error);
    return new Response(JSON.stringify({ error: "Error verifying payment" }), { status: 500 });
  }
}
