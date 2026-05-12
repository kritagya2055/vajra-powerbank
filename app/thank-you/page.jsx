'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'VJR-000000';
  const product = searchParams.get('product') || 'Vajra PowerBank';
  const quantity = searchParams.get('quantity') || '1';
  const total = searchParams.get('total') || '1999';
  const name = searchParams.get('name') || 'Customer';

  return (
    <div className="min-h-screen bg-vajra-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-vajra-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-vajra-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 bg-vajra-black/90 backdrop-blur-md border-b border-vajra-border z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2">
          <span className="text-vajra-blue text-2xl">⚡</span>
          <span className="font-display text-xl tracking-widest text-white">VAJRA</span>
          <span className="font-display text-xl tracking-widest text-vajra-blue">POWERBANK</span>
        </div>
      </div>

      <div className="relative max-w-xl w-full mt-16">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/30 mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-display text-5xl lg:text-6xl text-white tracking-wider mb-2">
            THANK YOU!
          </h1>
          <h2 className="font-display text-2xl text-vajra-gold tracking-wide">
            {name.split(' ')[0]}! ⚡
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-vajra-blue to-transparent mx-auto mt-4" />
        </div>

        {/* Order card */}
        <div className="vajra-card rounded-2xl p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-vajra-border">
            <span className="font-display text-lg text-vajra-gray tracking-wide">ORDER CONFIRMED</span>
            <span className="bg-green-500/10 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/20">
              ✓ Received
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between font-body text-sm">
              <span className="text-vajra-gray">Order ID</span>
              <span className="text-vajra-blue font-semibold font-mono">{orderId}</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-vajra-gray">Product</span>
              <span className="text-white font-semibold">{product}</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-vajra-gray">Quantity</span>
              <span className="text-white font-semibold">{quantity} piece{parseInt(quantity) > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-vajra-gray">Total Amount</span>
              <span className="text-vajra-gold font-display text-xl tracking-wider">Rs. {parseInt(total).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-vajra-gray">Payment Method</span>
              <span className="text-vajra-blue font-semibold">💵 Cash on Delivery</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-vajra-gray">Delivery</span>
              <span className="text-green-400 font-semibold">🚚 FREE</span>
            </div>
          </div>
        </div>

        {/* Message box */}
        <div className="bg-vajra-blue/10 border border-vajra-blue/20 rounded-2xl p-5 mb-6 text-center">
          <p className="text-4xl mb-3">📞</p>
          <p className="text-white font-semibold font-body mb-1">Our sales representative will call you soon</p>
          <p className="text-vajra-gray text-sm font-body">to confirm your order and arrange delivery.</p>
          <div className="mt-3 text-vajra-blue text-sm font-body">
            A confirmation email has been sent to your inbox ✉️
          </div>
        </div>

        {/* Delivery info */}
        <div className="grid grid-cols-3 gap-3 text-center mb-8">
          {[
            { icon: '📦', label: 'Order Placed', status: 'Done', color: 'green' },
            { icon: '📞', label: 'Confirmation Call', status: 'Soon', color: 'yellow' },
            { icon: '🚚', label: 'Delivery', status: '1-5 Days', color: 'blue' },
          ].map((s, i) => (
            <div key={i} className="vajra-card rounded-xl p-3">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xs font-body text-white font-semibold">{s.label}</div>
              <div className={`text-xs font-body mt-1 ${
                s.color === 'green' ? 'text-green-400' :
                s.color === 'yellow' ? 'text-vajra-gold' : 'text-vajra-blue'
              }`}>{s.status}</div>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="block w-full text-center btn-primary py-4 rounded-xl font-display text-xl tracking-widest"
        >
          ← BACK TO HOME
        </Link>

        <p className="text-vajra-gray text-xs text-center font-body mt-4">
          Need help? Contact us at support@vajrapower.com
        </p>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-vajra-black flex items-center justify-center">
        <div className="text-vajra-blue font-display text-2xl tracking-widest animate-pulse">LOADING...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
