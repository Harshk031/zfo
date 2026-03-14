const Razorpay = require('razorpay');

const rzp = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET_KEY,
});

rzp.orders.all({ count: 5 }).then(orders => {
  orders.items.forEach((o, i) => {
    console.log(`Order ${i}: ID=${o.id}, Status=${o.status}, Amount=${o.amount}`);
    console.log('Notes:', o.notes);
    console.log('Created At:', new Date(o.created_at * 1000).toISOString());
    console.log('---');
  });
}).catch(console.error);
