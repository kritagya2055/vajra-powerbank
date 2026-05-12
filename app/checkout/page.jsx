'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productName = searchParams.get('product') || 'Vajra PowerBank';
  const quantity = parseInt(searchParams.get('quantity') || '1');
  const pricePerPiece = parseInt(searchParams.get('price') || '1999');
  const totalPrice = parseInt(searchParams.get('total') || '1999');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) errs.phone = 'Please enter a valid phone number';
    if (!form.email.trim()) errs.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email address';
    if (!form.location.trim()) errs.location = 'Exact location is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          location: form.location,
          productName,
          quantity,
          pricePerPiece,
          totalPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Order submission failed. Please try again.');
      }

      // Redirect to thank you page with order details
      const params = new URLSearchParams({
        orderId: data.orderId,
        product: productName,
        quantity: quantity.toString(),
        total: totalPrice.toString(),
        name: form.name,
      });
      router.push(`/thank-you?${params.toString()}`);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vajra-black pt-20">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-vajra-black/90 backdrop-blur-md border-b border-vajra-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-vajra-blue text-2xl">⚡</span>
            <span className="font-display text-xl tracking-widest text-white">VAJRA</span>
            <span className="font-display text-xl tracking-widest text-vajra-blue">POWER</span>
          </Link>
          <div className="flex items-center gap-2 text-green-400 text-sm font-body">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Secure Checkout
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-vajra-blue font-body text-sm tracking-widest uppercase font-semibold">Step 2 of 2</span>
          <h1 className="font-display text-5xl text-white tracking-wider mt-2">COMPLETE YOUR ORDER</h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-vajra-blue to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* FORM — left */}
          <div className="lg:col-span-3 space-y-6">
            <div className="vajra-card rounded-2xl p-6">
              <h2 className="font-display text-2xl text-white tracking-wide mb-5 flex items-center gap-2">
                <span className="text-vajra-blue">👤</span> Your Details
              </h2>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-body font-semibold text-vajra-light mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Aarav Shrestha"
                    className={`w-full bg-vajra-black border rounded-lg px-4 py-3 text-white font-body placeholder-vajra-gray focus:outline-none focus:border-vajra-blue transition-colors ${
                      errors.name ? 'border-red-500' : 'border-vajra-border'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 font-body">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-body font-semibold text-vajra-light mb-1.5">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="98XXXXXXXX"
                    className={`w-full bg-vajra-black border rounded-lg px-4 py-3 text-white font-body placeholder-vajra-gray focus:outline-none focus:border-vajra-blue transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-vajra-border'
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1 font-body">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-body font-semibold text-vajra-light mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="aarav@example.com"
                    className={`w-full bg-vajra-black border rounded-lg px-4 py-3 text-white font-body placeholder-vajra-gray focus:outline-none focus:border-vajra-blue transition-colors ${
                      errors.email ? 'border-red-500' : 'border-vajra-border'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 font-body">{errors.email}</p>}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-body font-semibold text-vajra-light mb-1.5">
                    Exact Location <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Kindly share your exact location (e.g. Thamel, Kathmandu, near XYZ)"
                    rows={3}
                    className={`w-full bg-vajra-black border rounded-lg px-4 py-3 text-white font-body placeholder-vajra-gray focus:outline-none focus:border-vajra-blue transition-colors resize-none ${
                      errors.location ? 'border-red-500' : 'border-vajra-border'
                    }`}
                  />
                  {errors.location && <p className="text-red-400 text-xs mt-1 font-body">{errors.location}</p>}
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: '🔒', label: 'Secure Order' },
                { icon: '💵', label: 'Cash on Delivery' },
                { icon: '🚚', label: 'Free Delivery' },
              ].map((t, i) => (
                <div key={i} className="vajra-card rounded-xl p-3">
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <div className="text-xs font-body text-vajra-gray">{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ORDER SUMMARY — right */}
          <div className="lg:col-span-2 space-y-4">
            <div className="vajra-card rounded-2xl p-6 sticky top-24">
              <h2 className="font-display text-2xl text-white tracking-wide mb-5 flex items-center gap-2">
                <span className="text-vajra-gold">🛒</span> Order Summary
              </h2>

              {/* Product image */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
                <Image src="/images/product-4.jpg" alt="Vajra PowerBank" fill className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-vajra-blue shadow-[0_0_8px_#0ea5e9]" />
              </div>

              <div className="space-y-3 py-4 border-y border-vajra-border">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-vajra-gray">Product</span>
                  <span className="text-white font-semibold">{productName}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-vajra-gray">Quantity</span>
                  <span className="text-white font-semibold">{quantity}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-vajra-gray">Price per piece</span>
                  <span className="text-white font-semibold">Rs. {pricePerPiece.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-vajra-gray">Delivery</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-vajra-gray">Payment</span>
                  <span className="text-vajra-blue font-semibold">Cash on Delivery</span>
                </div>
              </div>

              <div className="flex justify-between py-4">
                <span className="font-display text-xl text-white tracking-wide">TOTAL</span>
                <span className="font-display text-2xl text-vajra-gold tracking-wider">Rs. {totalPrice.toLocaleString()}</span>
              </div>

              {submitError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                  <p className="text-red-400 text-sm font-body">{submitError}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-display text-xl tracking-widest transition-all duration-300 ${
                  loading
                    ? 'bg-vajra-border text-vajra-gray cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    SUBMITTING ORDER...
                  </span>
                ) : (
                  '⚡ PLACE ORDER NOW'
                )}
              </button>

              <p className="text-vajra-gray text-xs text-center font-body mt-3">
                By placing an order you agree to our terms. Our representative will call you to confirm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-vajra-black flex items-center justify-center">
        <div className="text-vajra-blue font-display text-2xl tracking-widest animate-pulse">LOADING...</div>
      </div>
    }>
      <CheckoutForm />
    </Suspense>
  );
}
