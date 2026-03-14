import { sendOrderConfirmationSMS } from '@/lib/sms';

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await sendOrderConfirmationSMS(body);
    
    if (result.success) {
      return Response.json(result);
    } else {
      return Response.json(result, { status: 400 });
    }
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
