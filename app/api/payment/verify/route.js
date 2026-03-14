import crypto from 'crypto';
import { getDb } from '@/lib/db';
import { sendOrderConfirmationSMS } from '@/lib/sms';

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

      // In Vercel, we MUST await this or use edge waitUntil, otherwise the process kills before SMS sends.
      try {
        const smsResult = await sendOrderConfirmationSMS({
          phone: order.customerPhone,
          customerName: order.customerName,
          orderDetails,
          amount: order.amount,
        });
        console.log('SMS Result for Order #', internalOrderId, ':', smsResult);
      } catch (err) {
        console.error('SMS dispatch failed for Order #', internalOrderId, ':', err);
      }
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('Verification error:', error);
    return Response.json({ error: 'Error verifying payment' }, { status: 500 });
  }
}
