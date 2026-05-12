'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PRODUCT = {
  name: 'Vajra PowerBank',
  price: 1999,
  originalPrice: 2999,
  delivery: 0,
};

const IMAGES = [
  '/images/product-4.jpg', // hero brand shot
  '/images/product-1.jpg',
  '/images/product-2.jpg',
  '/images/product-3.jpg',
  '/images/product-5.jpg',
];

const BENEFITS = [
  { icon: '⚡', title: '65W Ultra-Fast Charging', desc: 'Charge 0–100% in under 45 minutes' },
  { icon: '🔋', title: '20,000 mAh Capacity', desc: 'Charge your phone up to 5 times' },
  { icon: '🏔️', title: 'Built for Nepal', desc: 'From Himalayan cold to Terai heat' },
  { icon: '✈️', title: 'Aerospace Aluminum Body', desc: 'Ultra-slim, scratch-resistant, premium' },
  { icon: '💡', title: 'Smart LED Indicator', desc: 'Always know your exact power level' },
  { icon: '🔌', title: 'Charge 3 Devices', desc: 'USB-A, USB-C & Wireless simultaneously' },
];

const TESTIMONIALS = [
  { name: 'Ayush Baral', location: 'Kathmandu', rating: 5, text: 'Vajra le mero phone kabhi off hudaina! Design ekdam premium cha. Mero saathi haru sab sodhcha yo powerbank kahile kineko bhane.' },
  { name: 'Arun Ramtel', location: 'Pokhara', rating: 5, text: 'Superfast charging, premium look. Worth every paisa! Trek ko bela ekdam helpful thiyo. 3 din samma charge diyeko power cha yo ma.' },
  { name: 'Rijen Prajapati', location: 'Lalitpur', rating: 5, text: 'This is the best powerbank I have used. The build quality is insane — feels like a premium device. Highly recommend to everyone!' },
  { name: 'Bikal Karki', location: 'Bhaktapur', rating: 5, text: 'Design ekdam supercar jasto cha. Office ma liyera gaye pachi sab le sodhcha yo ke ho! Ekdam proud feel huncha.' },
  { name: 'Prabhakar Kafle', location: 'Chitwan', rating: 5, text: 'Free delivery ma aayo, packaging ekdam ramro thiyo. Product is exactly as shown. Vajra PowerBank is worth every rupee!' },
];

const FAQS = [
  { q: 'Delivery kati dina ma aaucha?', a: 'Kathmandu Valley ma 1-2 business days, outside valley ma 3-5 business days ma deliver huncha.' },
  { q: 'Cash on Delivery available cha?', a: 'Yes! Hami full COD accept garcha Nepal bhar. Order garda payment gardina, delivery ko bela tirna sakincha.' },
  { q: 'Warranty cha?', a: 'Yes, Vajra PowerBank ma 1 year full replacement warranty cha. Kei problem aayo bhane hami replace gardinchau.' },
  { q: 'Kun devices sanga compatible cha?', a: 'iPhone, Android, iPad, AirPods, Earbuds, Laptops — USB-C, USB-A, ra Wireless charging sabai support garcha.' },
  { q: 'Return policy ke cha?', a: '7-day no-questions-asked return policy cha. Unopened condition ma return garnuhos, full refund paincha.' },
  { q: 'Wireless charging support garcha?', a: 'Yes! Qi-compatible devices — Samsung, iPhone 12 and above — wireless charging support garcha.' },
];

export default function LandingPage() {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);
  const carouselRef = useRef(null);

  const total = PRODUCT.price * quantity + PRODUCT.delivery;
  const savings = (PRODUCT.originalPrice - PRODUCT.price) * quantity;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const goToCheckout = () => {
    const params = new URLSearchParams({
      product: PRODUCT.name,
      quantity: quantity.toString(),
      price: PRODUCT.price.toString(),
      total: total.toString(),
    });
    router.push(`/checkout?${params.toString()}`);
  };

  const renderStars = (count) =>
    Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-vajra-gold">★</span>
    ));

  return (
    <main className="min-h-screen bg-vajra-black">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-vajra-black/90 backdrop-blur-md border-b border-vajra-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-vajra-blue text-2xl">⚡</span>
            <span className="font-display text-xl tracking-widest text-white">VAJRA</span>
            <span className="font-display text-xl tracking-widest text-vajra-blue">POWER</span>
          </div>
          <button
            onClick={goToCheckout}
            className="btn-primary px-5 py-2 rounded text-sm font-display tracking-wider"
          >
            ORDER NOW
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden noise-bg">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vajra-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vajra-gold/5 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vajra-blue/30 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-vajra-blue/10 border border-vajra-blue/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-vajra-blue rounded-full animate-pulse" />
              <span className="text-vajra-blue text-sm font-body font-semibold tracking-widest uppercase">New Launch — Limited Stock</span>
            </div>

            <h1 className="font-display text-6xl lg:text-8xl tracking-wider text-white leading-none mb-4">
              VAJRA
              <span className="block text-glow-blue text-vajra-blue">POWER</span>
              <span className="block text-4xl lg:text-5xl text-vajra-gold text-glow-gold">BANK</span>
            </h1>

            <div className="led-strip my-6 w-32" />

            <p className="text-vajra-light/70 text-lg font-body leading-relaxed mb-8 max-w-lg">
              Named after the sacred thunderbolt of the Himalayas. 20,000mAh of raw power, 65W ultra-fast charging,
              aerospace-grade aluminum body. <span className="text-vajra-blue font-semibold">Charge like thunder. Never stop.</span>
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl text-vajra-gold tracking-wider">Rs. 1,999</span>
                <span className="price-strike font-display text-2xl">Rs. 2,999</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-1.5 text-sm text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full">
                🚚 Free Delivery
              </span>
              <span className="flex items-center gap-1.5 text-sm text-vajra-blue bg-vajra-blue/10 border border-vajra-blue/20 px-3 py-1.5 rounded-full">
                💵 Cash on Delivery
              </span>
              <span className="flex items-center gap-1.5 text-sm text-vajra-gold bg-vajra-gold/10 border border-vajra-gold/20 px-3 py-1.5 rounded-full">
                🛡️ 1 Year Warranty
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={goToCheckout}
                className="btn-primary px-8 py-4 rounded-lg text-xl font-display tracking-widest"
              >
                ⚡ ORDER NOW
              </button>
              <button
                onClick={goToCheckout}
                className="btn-gold px-8 py-4 rounded-lg text-xl font-display tracking-widest"
              >
                PURCHASE NOW
              </button>
            </div>
          </div>

          {/* Hero image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative w-full aspect-video lg:aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-vajra-blue/10 rounded-2xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden gradient-border">
                <Image
                  src="/images/product-4.jpg"
                  alt="Vajra PowerBank"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
                {/* LED strip overlay */}
                <div className="absolute bottom-0 left-0 right-0 led-strip" />
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-vajra-gold text-vajra-black font-display text-lg px-4 py-2 rounded-lg rotate-3 shadow-lg">
                33% OFF
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs tracking-widest text-vajra-gray uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-vajra-blue to-transparent animate-pulse" />
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="py-20 bg-vajra-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vajra-border to-transparent" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Carousel */}
            <div className="relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden vajra-card">
                {IMAGES.map((src, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === currentImage ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <Image
                      src={src}
                      alt={`Vajra PowerBank view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="absolute bottom-0 left-0 right-0 led-strip" />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4">
                {IMAGES.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`relative flex-1 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      i === currentImage ? 'border-vajra-blue shadow-[0_0_10px_rgba(14,165,233,0.5)]' : 'border-vajra-border opacity-50 hover:opacity-75'
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <span className="text-vajra-blue font-body text-sm tracking-widest uppercase font-semibold">Nepal's Premium PowerBank</span>
                <h2 className="font-display text-5xl lg:text-6xl text-white tracking-wider mt-2">VAJRA POWERBANK</h2>
                <div className="led-strip w-24 mt-3" />
              </div>

              <div className="space-y-2">
                {BENEFITS.slice(0, 4).map((b, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-vajra-border/50">
                    <span className="text-xl">{b.icon}</span>
                    <div>
                      <span className="text-white font-semibold font-body">{b.title}</span>
                      <span className="text-vajra-gray text-sm font-body ml-2">— {b.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="vajra-card rounded-xl p-5 space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl text-vajra-gold tracking-wider">Rs. 1,999</span>
                  <span className="price-strike font-display text-xl">Rs. 2,999</span>
                  <span className="bg-red-500/20 text-red-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-red-500/30">SAVE Rs. {savings}</span>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm font-body">
                  <span>🚚</span> <span className="font-semibold">FREE Delivery</span>
                  <span className="text-vajra-gray">• 1-2 days Kathmandu Valley</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-vajra-gray text-sm font-body">Quantity:</span>
                  <div className="flex items-center gap-3 border border-vajra-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-vajra-blue hover:bg-vajra-blue/10 transition-colors font-display text-xl"
                    >
                      −
                    </button>
                    <span className="font-display text-xl text-white w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-vajra-blue hover:bg-vajra-blue/10 transition-colors font-display text-xl"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-vajra-gray text-sm font-body">Total: <span className="text-vajra-gold font-semibold">Rs. {total.toLocaleString()}</span></span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={goToCheckout}
                  className="btn-primary flex-1 py-4 rounded-lg text-xl font-display tracking-widest"
                >
                  ⚡ BUY NOW
                </button>
                <button
                  onClick={goToCheckout}
                  className="btn-gold flex-1 py-4 rounded-lg text-xl font-display tracking-widest"
                >
                  ORDER NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 bg-vajra-black relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vajra-border to-transparent" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-vajra-blue font-body text-sm tracking-widest uppercase font-semibold">Why Choose Vajra</span>
            <h2 className="font-display text-5xl lg:text-6xl text-white tracking-wider mt-2">
              THUNDERBOLT <span className="text-vajra-blue">FEATURES</span>
            </h2>
            <div className="led-strip w-32 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {BENEFITS.map((b, i) => (
              <div key={i} className="vajra-card rounded-xl p-6 group hover:border-vajra-blue/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="font-display text-xl text-white tracking-wide mb-2">{b.title}</h3>
                <p className="text-vajra-gray font-body text-sm leading-relaxed">{b.desc}</p>
                <div className="led-strip w-12 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={goToCheckout}
              className="btn-primary px-12 py-4 rounded-lg text-2xl font-display tracking-widest"
            >
              ⚡ PURCHASE NOW — Rs. 1,999
            </button>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-10 bg-vajra-dark border-y border-vajra-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '💵', label: 'Cash on Delivery', sub: 'Pay when received' },
              { icon: '🚚', label: 'Free Delivery', sub: 'All over Nepal' },
              { icon: '🛡️', label: '1 Year Warranty', sub: 'Full replacement' },
              { icon: '📞', label: '24/7 Support', sub: 'Always here for you' },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-vajra-card transition-colors">
                <span className="text-3xl">{t.icon}</span>
                <span className="font-display text-lg text-white tracking-wide">{t.label}</span>
                <span className="text-vajra-gray text-xs font-body">{t.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-vajra-black relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-vajra-gold font-body text-sm tracking-widest uppercase font-semibold">Customer Reviews</span>
            <h2 className="font-display text-5xl lg:text-6xl text-white tracking-wider mt-2">
              WHAT NEPAL <span className="text-vajra-gold">SAYS</span>
            </h2>
            <div className="led-strip w-32 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`vajra-card rounded-xl p-6 ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="flex mb-3">{renderStars(t.rating)}</div>
                <p className="text-vajra-light/80 font-body leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-vajra-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vajra-blue to-vajra-gold flex items-center justify-center font-display text-lg text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold font-body text-white">{t.name}</div>
                    <div className="text-vajra-gray text-xs font-body">{t.location}, Nepal ✓ Verified Buyer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-vajra-dark relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vajra-border to-transparent" />
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-vajra-blue font-body text-sm tracking-widest uppercase font-semibold">Got Questions?</span>
            <h2 className="font-display text-5xl lg:text-6xl text-white tracking-wider mt-2">
              FAQ <span className="text-vajra-blue">SECTION</span>
            </h2>
            <div className="led-strip w-24 mx-auto mt-4" />
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="vajra-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-vajra-blue/5 transition-colors"
                >
                  <span className="font-semibold font-body text-white pr-4">{faq.q}</span>
                  <span className={`text-vajra-blue text-xl font-display transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                  <div className="px-6 pb-4 text-vajra-gray font-body leading-relaxed border-t border-vajra-border pt-3">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-vajra-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vajra-blue/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="text-vajra-blue font-body text-sm tracking-widest uppercase font-semibold">Limited Time Offer</span>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider mt-4 mb-2">
            DON'T MISS
          </h2>
          <h2 className="font-display text-5xl lg:text-7xl text-vajra-gold text-glow-gold tracking-wider mb-6">
            THIS DEAL
          </h2>
          <div className="led-strip w-48 mx-auto mb-8" />
          <p className="text-vajra-light/70 font-body text-lg mb-4">
            Rs. 1,999 only — <span className="line-through text-vajra-gray">Rs. 2,999</span> &nbsp;|&nbsp; Save <span className="text-green-400 font-semibold">Rs. 1,000</span>
          </p>
          <p className="text-vajra-gray font-body mb-10">🚚 Free Delivery &nbsp;•&nbsp; 💵 Cash on Delivery &nbsp;•&nbsp; 🛡️ 1 Year Warranty</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goToCheckout}
              className="btn-primary px-12 py-5 rounded-xl text-2xl font-display tracking-widest"
            >
              ⚡ ORDER NOW
            </button>
            <button
              onClick={goToCheckout}
              className="btn-gold px-12 py-5 rounded-xl text-2xl font-display tracking-widest"
            >
              PURCHASE NOW
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-vajra-dark border-t border-vajra-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-vajra-blue text-xl">⚡</span>
            <span className="font-display text-lg tracking-widest text-white">VAJRA</span>
            <span className="font-display text-lg tracking-widest text-vajra-blue">POWERBANK</span>
          </div>
          <p className="text-vajra-gray text-sm font-body">
            Nepal ko premium powerbank — Named after the sacred thunderbolt of the Himalayas.
          </p>
          <p className="text-vajra-gray/50 text-xs font-body mt-4">
            © 2025 Vajra PowerBank. All rights reserved. &nbsp;|&nbsp; support@vajrapower.com
          </p>
        </div>
      </footer>
    </main>
  );
}
