// POST /api/sms/send
// Sends a creative automated SMS to the customer via Fast2SMS
// Docs: https://www.fast2sms.com/dev/

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone, customerName, orderDetails, amount } = body;

    if (!phone || !customerName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey) {
      console.warn('FAST2SMS_API_KEY not set — SMS skipped.');
      return Response.json({ skipped: true, reason: 'No SMS API key configured' });
    }

    // Creative ZfO-branded SMS message
    const message = `⚡ ZfO ORDER CONFIRMED ⚡

Hey ${customerName}! 

Your ${orderDetails} just got locked in. The fizz is REAL, the spices are REAL, and your order is REALLY on its way. 🍾

Amount Paid: ₹${amount}
Status: Being Bottled Up For You

We'll dispatch your order very soon. Track us on @drinkzfo

- Team ZfO (We don't do boring.)`;

    const smsPayload = {
      route: 'q', // quick transactional route
      message: message,
      language: 'english',
      flash: 0,
      numbers: phone.replace(/\s+/g, ''),
    };

    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        authorization: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(smsPayload),
    });

    const result = await response.json();
    console.log('Fast2SMS response:', result);

    if (result.return === true) {
      return Response.json({ success: true, messageId: result.request_id });
    } else {
      console.error('Fast2SMS error:', result);
      return Response.json({ success: false, error: result.message }, { status: 400 });
    }
  } catch (err) {
    console.error('SMS send error:', err);
    return Response.json({ error: 'Failed to send SMS' }, { status: 500 });
  }
}
