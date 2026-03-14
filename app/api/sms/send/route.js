// POST /api/sms/send
// Sends a creative automated SMS to the customer via Fast2SMS
// Uses the new Fast2SMS Quick SMS API (updated 2024)

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

    // Clean phone number to 10 digits
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);

    // Short creative message (Quick SMS has 160 char limit)
    const message = `ZfO Order Confirmed! Hey ${customerName}, your ${orderDetails || 'order'} is locked in. Amount: Rs.${amount}. Dispatch soon! -Team ZfO`;

    console.log(`Sending SMS to ${cleanPhone} via Fast2SMS Quick SMS API`);

    // Try new Quick SMS endpoint first
    const payload = {
      sender_id: 'FSTSMS',
      language: 'english',
      route: 'q',
      numbers: cleanPhone,
      message: message,
    };

    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('Fast2SMS response:', JSON.stringify(result));

    if (result.return === true) {
      return Response.json({ success: true, messageId: result.request_id });
    }

    // If quick route fails, also log error details
    console.error('Fast2SMS error details:', {
      message: result.message,
      status_code: result.status_code,
      payload_sent: payload,
    });

    return Response.json({
      success: false,
      error: result.message || JSON.stringify(result),
      debug: result,
    }, { status: 400 });

  } catch (err) {
    console.error('SMS send error:', err.message);
    return Response.json({ error: 'Failed to send SMS: ' + err.message }, { status: 500 });
  }
}
