import crypto from 'crypto';
import { getDb } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, internalOrderId } = body;

    // 1. Verify Signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const isLiveMode = secret && !secret.includes('placeholder');

    if (isLiveMode) {
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
      const generatedSignature = hmac.digest('hex');
      if (generatedSignature !== razorpay_signature) {
        return Response.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else {
      console.warn('MOCK MODE: Skipping signature verification.');
    }

    // 2. Update order in DB and fetch customer details for SMS
    const db = getDb();
    db.prepare(`UPDATE orders SET status = 'PAID', razorpayPaymentId = ? WHERE id = ?`)
      .run(razorpay_payment_id || 'mock_payment_id', internalOrderId);

    // Fetch the order from DB to get customer details for SMS
    const order = db.prepare(`SELECT * FROM orders WHERE id = ?`).get(internalOrderId);

    // 3. Trigger SMS notification (fire & forget — don't block payment success)
    if (order && order.customerPhone) {
      const orderDetails = order.optionId === 'combo'
        ? 'Combo of 4 × 275ml Glass Bottles'
        : '1 × 275ml Glass Bottle';

      // Fire async SMS, don't await so payment response is instant
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/sms/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: order.customerPhone,
          customerName: order.customerName,
          orderDetails,
          amount: order.amount,
        }),
      }).catch(err => console.error('SMS trigger failed (non-blocking):', err));
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('Verification error:', error);
    return Response.json({ error: 'Error verifying payment' }, { status: 500 });
  }
}
