import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    // Get all orders ordered by newest first
    const orders = db.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all();

    return new Response(JSON.stringify({ orders }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), { status: 500 });
  }
}
