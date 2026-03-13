'use client';

import { useEffect, useState } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (data.orders) setOrders(data.orders);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch orders", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-black uppercase mb-8 tracking-tighter">Orders Dashboard</h1>

      {loading ? (
        <p className="text-white/50 animate-pulse">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-white/50">No orders placed yet.</p>
      ) : (
        <div className="overflow-x-auto border border-white/10 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-white/50 uppercase text-xs tracking-widest">
                <th className="p-4 font-medium border-b border-white/10">ID</th>
                <th className="p-4 font-medium border-b border-white/10">Date</th>
                <th className="p-4 font-medium border-b border-white/10">Status</th>
                <th className="p-4 font-medium border-b border-white/10">Product</th>
                <th className="p-4 font-medium border-b border-white/10">Amount</th>
                <th className="p-4 font-medium border-b border-white/10">Customer Name</th>
                <th className="p-4 font-medium border-b border-white/10">Phone</th>
                <th className="p-4 font-medium border-b border-white/10">Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="p-4 text-white/70">#{order.id}</td>
                  <td className="p-4 text-white/70">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'PAID' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/90 uppercase text-sm font-bold tracking-tight">
                    {order.optionId === 'combo' ? '4× 275ml Bottles' : '1× 275ml Bottle'}
                  </td>
                  <td className="p-4 font-bold">₹{order.amount}</td>
                  <td className="p-4 text-white/70">{order.customerName}</td>
                  <td className="p-4 text-white/70">{order.customerPhone}</td>
                  <td className="p-4 text-white/50 max-w-xs truncate" title={order.customerAddress}>
                    {order.customerAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
