// lib/sms.js
// Utility to send SMS via Fast2SMS

export async function sendOrderConfirmationSMS({ phone, customerName, orderDetails, amount }) {
  try {
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey) {
      console.warn('FAST2SMS_API_KEY not set — SMS skipped.');
      return { success: false, reason: 'No API key' };
    }

    // Clean phone number to 10 digits
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);

    // Short creative message (Quick SMS has 160 char limit)
    const message = `ZfO Order Confirmed! Hey ${customerName}, your ${orderDetails || 'order'} is locked in. Total paid: Rs.${amount} (incl. Rs.30 delivery). Dispatching soon! -Team ZfO`;

    console.log(`Sending SMS to ${cleanPhone} via Fast2SMS Bulk V2...`);

    // Try new Bulk V2 endpoint with 'dlt' or 'v3' or 'q' route.
    // 'q' is Quick SMS, works for most new accounts without DLT for testing.
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
    console.log('Fast2SMS raw response:', JSON.stringify(result));

    if (result.return === true) {
      console.log('SMS sent successfully!');
      return { success: true, request_id: result.request_id };
    } else {
      console.error('Fast2SMS error:', result.message || JSON.stringify(result));
      return { success: false, error: result.message };
    }

  } catch (err) {
    console.error('lib/sms error:', err.message);
    return { success: false, error: err.message };
  }
}
