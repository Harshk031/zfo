'use client';

import { useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

// ─── Correct PIN is set via NEXT_PUBLIC_ADMIN_PIN env var, defaults to '2612' ───
const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || '2612';

const STATUS_CONFIG = {
  CREATED:   { label: 'Pending',    color: '#facc15', bg: 'rgba(250,204,21,0.1)' },
  PAID:      { label: 'Paid ✓',    color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
  DISPATCHED:{ label: 'Dispatched', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
  DELIVERED: { label: 'Delivered 🎉',color:'#a78bfa', bg: 'rgba(167,139,250,0.1)' },
};

/* ─────────────────────────────────────────
   PIN Lock Screen
───────────────────────────────────────── */
function PinLock({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleDigit = (d) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === ADMIN_PIN) {
          onUnlock();
        } else {
          setError(true);
          setShake(true);
          setTimeout(() => { setPin(''); setError(false); setShake(false); }, 800);
        }
      }, 150);
    }
  };

  const handleBackspace = () => setPin(p => p.slice(0, -1));

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12">
        <p className="text-white/20 uppercase tracking-[0.5em] text-[10px] mb-3">ZfO Internal</p>
        <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-2">Admin Access</h1>
        <p className="text-white/30 text-sm">Enter your 4-digit PIN to continue</p>
      </div>

      {/* PIN dots */}
      <div className={`flex gap-5 mb-10 ${shake ? 'animate-[shake_0.4s_ease]' : ''}`}>
        {[0,1,2,3].map(i => (
          <div
            key={i}
            className="w-4 h-4 rounded-full transition-all duration-200"
            style={{
              background: pin.length > i ? (error ? '#ef4444' : '#facc15') : 'rgba(255,255,255,0.1)',
              boxShadow: pin.length > i && !error ? '0 0 16px rgba(250,204,21,0.8)' : 'none',
            }}
          />
        ))}
      </div>
      {error && <p className="text-red-400 text-sm mb-6 -mt-6 font-medium">Wrong PIN. Try again.</p>}

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((d, i) => (
          <button
            key={i}
            onClick={() => d === '⌫' ? handleBackspace() : d !== '' ? handleDigit(String(d)) : null}
            disabled={d === ''}
            className="h-16 rounded-2xl text-xl font-black text-white transition-all duration-150 active:scale-95"
            style={{
              background: d === '' ? 'transparent' : 'rgba(255,255,255,0.05)',
              border: d === '' ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {d}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Admin Dashboard
───────────────────────────────────────── */
export default function AdminDashboard() {
  const [unlocked, setUnlocked] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) setOrders(data.orders.reverse()); // newest first
    } catch { /* silent */ }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (unlocked) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 30000); // auto-refresh every 30s
      return () => clearInterval(interval);
    }
  }, [unlocked, fetchOrders]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch('/api/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        showToast(`Order #${orderId} marked as ${newStatus}`);
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    }
    setUpdatingId(null);
  };

  // Stats
  const stats = {
    total: orders.length,
    paid: orders.filter(o => o.status === 'PAID').length,
    dispatched: orders.filter(o => o.status === 'DISPATCHED').length,
    revenue: orders.filter(o => ['PAID','DISPATCHED','DELIVERED'].includes(o.status)).reduce((s,o) => s + o.amount, 0),
  };

  const filtered = orders.filter(o => {
    const matchFilter = filter === 'ALL' || o.status === filter;
    const matchSearch = !search || [o.customerName, o.customerPhone, String(o.id)]
      .some(f => f?.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  if (!unlocked) return <PinLock onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl font-bold text-sm shadow-2xl"
          style={{
            background: toast.type === 'error' ? 'rgba(239,68,68,0.15)' : 'rgba(74,222,128,0.15)',
            border: `1px solid ${toast.type === 'error' ? 'rgba(239,68,68,0.4)' : 'rgba(74,222,128,0.4)'}`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {toast.type === 'error' ? '❌' : '✅'} {toast.msg}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl p-8"
            style={{ background: '#0d0d14', border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Order #{selectedOrder.id}</p>
                <h2 className="text-2xl font-black text-white">{selectedOrder.customerName}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-white/30 hover:text-white text-2xl">×</button>
            </div>
            <div className="space-y-4 text-sm">
              {[
                ['📱 Phone', selectedOrder.customerPhone],
                ['📦 Product', selectedOrder.optionId === 'combo' ? '4 × 275ml Bottles' : '1 × 275ml Bottle'],
                ['💰 Amount', `₹${selectedOrder.amount}`],
                ['📍 Address', selectedOrder.customerAddress],
                ['🗓 Date', new Date(selectedOrder.createdAt).toLocaleString('en-IN')],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="text-white/30 w-28 flex-shrink-0">{label}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
            {/* Status buttons */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {Object.entries(STATUS_CONFIG).map(([status, cfg]) => (
                <button
                  key={status}
                  onClick={() => { updateStatus(selectedOrder.id, status); setSelectedOrder(null); }}
                  disabled={selectedOrder.status === status}
                  className="py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 disabled:opacity-30"
                  style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-white/5 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl font-black tracking-widest text-white">ZFO</span>
          <span className="text-white/20 text-sm">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            ↻ Refresh
          </button>
          <button
            onClick={() => setUnlocked(false)}
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-red-400/70 hover:text-red-400 transition-colors"
            style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)' }}
          >
            Lock
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Orders', value: stats.total, color: '#facc15' },
            { label: 'Paid', value: stats.paid, color: '#4ade80' },
            { label: 'Dispatched', value: stats.dispatched, color: '#60a5fa' },
            { label: 'Revenue', value: `₹${stats.revenue}`, color: '#a78bfa' },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{label}</p>
              <p className="text-3xl font-black" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {['ALL', 'CREATED', 'PAID', 'DISPATCHED', 'DELIVERED'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200"
                style={{
                  background: filter === f ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${filter === f ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  color: filter === f ? 'white' : 'rgba(255,255,255,0.4)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by name, phone, or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl text-sm text-white placeholder-white/30 outline-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>

        {/* Orders table */}
        {loading ? (
          <div className="text-white/40 text-sm animate-pulse py-20 text-center">Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div className="text-white/20 text-sm py-20 text-center uppercase tracking-widest">No orders found</div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {['#', 'Customer', 'Phone', 'Product', 'Amount', 'Status', 'Date', 'Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-white/30 text-xs uppercase tracking-widest font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, idx) => {
                  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.CREATED;
                  return (
                    <tr
                      key={order.id}
                      className="cursor-pointer transition-colors duration-150"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-4 py-4 text-white/30 font-mono text-xs">#{order.id}</td>
                      <td className="px-4 py-4 font-bold text-white">{order.customerName}</td>
                      <td className="px-4 py-4 text-white/50">{order.customerPhone}</td>
                      <td className="px-4 py-4 text-white/70 text-xs uppercase tracking-wide">
                        {order.optionId === 'combo' ? '4× Bottles' : '1× Bottle'}
                      </td>
                      <td className="px-4 py-4 font-black text-white">₹{order.amount}</td>
                      <td className="px-4 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider"
                          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}
                        >
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-white/30 text-xs">
                        {new Date(order.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                        <select
                          value={order.status}
                          onChange={e => updateStatus(order.id, e.target.value)}
                          disabled={updatingId === order.id}
                          className="text-xs px-3 py-2 rounded-lg outline-none cursor-pointer disabled:opacity-40"
                          style={{
                            background: '#0d0d14',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: cfg.color,
                          }}
                        >
                          {Object.entries(STATUS_CONFIG).map(([s, c]) => (
                            <option key={s} value={s} style={{ color: c.color }}>{c.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-white/10 text-xs mt-6 text-center uppercase tracking-widest">
          Click any row to see full order details · Auto-refreshes every 30 seconds
        </p>
      </div>
    </div>
  );
}
