// POST /api/orders/update-status
// Updates an order's status — admin only (no public exposure)
import { getDb } from '@/lib/db';

export async function POST(req) {
  try {
    const { orderId, status } = await req.json();
    const validStatuses = ['CREATED', 'PAID', 'DISPATCHED', 'DELIVERED'];

    if (!orderId || !validStatuses.includes(status)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    const db = getDb();
    db.prepare(`UPDATE orders SET status = ? WHERE id = ?`).run(status, orderId);

    return Response.json({ success: true });
  } catch (err) {
    console.error('Status update error:', err);
    return Response.json({ error: 'Failed to update' }, { status: 500 });
  }
}
