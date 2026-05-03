import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { coalProducts, industries, stats } from '@/data/coal-products'

export const Route = createFileRoute('/')({
  component: Home,
})

// ─── Utility hook: animate counter from 0 to target ───────────────────────────
function useCounter(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

// ─── Utility hook: IntersectionObserver reveal ────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ─── Particle component ───────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 4 + 2}px`,
    delay: `${Math.random() * 8}s`,
    duration: `${Math.random() * 10 + 8}s`,
    opacity: Math.random() * 0.4 + 0.1,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            bottom: '-10px',
          }}
        />
      ))}
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Industries', href: '#industries' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,160,23,0.15)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          className="flex items-center gap-3 group cursor-pointer bg-transparent border-none"
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
            style={{ background: 'linear-gradient(135deg, #D4A017, #B8860B)' }}
          >
            ⛏️
          </div>
          <div className="text-left">
            <div
              className="font-black text-sm tracking-widest leading-tight"
              style={{ color: '#D4A017' }}
            >
              JD COAL
            </div>
            <div className="text-white text-xs tracking-widest opacity-70">
              &amp; COMMERCIAL
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer bg-transparent border-none"
              style={{ color: '#cccccc' }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.color = '#D4A017')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.color = '#cccccc')
              }
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #D4A017, #B8860B)',
              color: '#0a0a0a',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.transform =
                'translateY(-2px)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.transform = 'none')
            }
          >
            Get Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-1"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-0.5 w-6 transition-all duration-300"
              style={{
                backgroundColor: '#D4A017',
                transform:
                  menuOpen && i === 0
                    ? 'rotate(45deg) translate(4px, 4px)'
                    : menuOpen && i === 1
                      ? 'scaleX(0)'
                      : menuOpen && i === 2
                        ? 'rotate(-45deg) translate(4px, -4px)'
                        : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(10,10,10,0.98)' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-base font-medium py-2 border-b cursor-pointer bg-transparent border-none"
              style={{ color: '#cccccc', borderColor: '#1a1a1a' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-2 py-3 rounded-lg font-semibold text-center"
            style={{ background: 'linear-gradient(135deg, #D4A017, #B8860B)', color: '#0a0a0a' }}
          >
            Get Quote
          </button>
        </div>
      )}
    </nav>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid"
      style={{
        background:
          'radial-gradient(ellipse at 20% 50%, rgba(30,20,0,0.8) 0%, #0a0a0a 60%), radial-gradient(ellipse at 80% 20%, rgba(40,25,0,0.6) 0%, transparent 50%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 70%)',
        }}
      />

      <Particles />

      {/* Decorative ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          border: '1px solid rgba(212,160,23,0.05)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          border: '1px solid rgba(212,160,23,0.07)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(212,160,23,0.1)',
            border: '1px solid rgba(212,160,23,0.3)',
            color: '#D4A017',
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#D4A017' }}
          />
          India's Trusted Coal Supplier
        </div>

        {/* Main heading */}
        <h1
          className={`font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="block text-white">JD COAL</span>
          <span className="block shimmer-text">&amp; COMMERCIAL</span>
        </h1>

        {/* Tagline */}
        <p
          className={`text-lg md:text-2xl font-light tracking-widest mb-4 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ color: '#999999' }}
        >
          Premium Coal Supplier
        </p>
        <p
          className={`text-base md:text-lg font-medium tracking-wide mb-12 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ color: '#666666' }}
        >
          Reliable · Quality Assured · Pan India Delivery
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <button
            onClick={() => scrollTo('products')}
            className="px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 animate-pulse-glow"
            style={{
              background: 'linear-gradient(135deg, #D4A017 0%, #FFD700 50%, #B8860B 100%)',
              color: '#0a0a0a',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.02)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.transform = 'none')
            }
          >
            Explore Products
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300"
            style={{
              background: 'transparent',
              color: '#D4A017',
              border: '2px solid rgba(212,160,23,0.5)',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement
              btn.style.background = 'rgba(212,160,23,0.1)'
              btn.style.borderColor = '#D4A017'
              btn.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement
              btn.style.background = 'transparent'
              btn.style.borderColor = 'rgba(212,160,23,0.5)'
              btn.style.transform = 'none'
            }}
          >
            Contact Us
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-20 flex flex-col items-center gap-2 transition-all duration-700 delay-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-xs tracking-widest uppercase" style={{ color: '#444444' }}>
            Scroll to explore
          </div>
          <div
            className="w-6 h-10 rounded-full border flex items-start justify-center pt-2"
            style={{ borderColor: '#333333' }}
          >
            <div
              className="w-1 h-3 rounded-full animate-bounce"
              style={{ backgroundColor: '#D4A017' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Stats Section ────────────────────────────────────────────────────────────
function StatsSection() {
  const { ref, visible } = useReveal()

  const StatItem = ({
    label,
    value,
    suffix,
    active,
    duration,
  }: {
    label: string
    value: number
    suffix: string
    active: boolean
    duration?: number
  }) => {
    const count = useCounter(value, duration ?? 2000, active)
    return (
      <div className="text-center px-6">
        <div
          className="text-4xl md:text-5xl font-black mb-2 shimmer-text"
        >
          {count.toLocaleString()}
          {suffix}
        </div>
        <div className="text-sm tracking-widest uppercase" style={{ color: '#666666' }}>
          {label}
        </div>
      </div>
    )
  }

  return (
    <section
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}
    >
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 py-20 section-hidden ${visible ? 'section-visible' : ''}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              active={visible}
              duration={1500 + i * 200}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const { ref, visible } = useReveal()

  const highlights = [
    { icon: '🏅', text: 'ISO Certified Quality' },
    { icon: '🚚', text: 'Pan India Logistics' },
    { icon: '📊', text: 'Lab-Tested Every Batch' },
    { icon: '🤝', text: '25+ Years Industry Trust' },
  ]

  return (
    <section id="about" style={{ backgroundColor: '#0a0a0a' }}>
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 py-24 section-hidden ${visible ? 'section-visible' : ''}`}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: '#D4A017' }}
            >
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Powering India's{' '}
              <span className="gold-gradient-text">Industrial Growth</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#999999' }}>
              JD Coal &amp; Commercial has been a cornerstone of India's energy supply
              chain for over two decades. We source, procure, and deliver premium quality
              coal to industries across 15+ states, maintaining the highest standards of
              quality and reliability.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: '#777777' }}>
              From small brick kilns to large power plants, we have the expertise and
              infrastructure to fulfill bulk coal requirements on time, every time. Our
              dedicated quality control team ensures every shipment meets specification
              before dispatch.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div
                  key={h.text}
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ background: '#111111', border: '1px solid #1a1a1a' }}
                >
                  <span className="text-xl">{h.icon}</span>
                  <span className="text-sm font-medium" style={{ color: '#cccccc' }}>
                    {h.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual card */}
          <div className="relative">
            <div
              className="rounded-2xl p-10 relative overflow-hidden animate-float"
              style={{
                background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)',
                border: '1px solid #2a2a2a',
              }}
            >
              {/* Decorative glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)',
                  transform: 'translate(30%, -30%)',
                }}
              />
              <div className="relative z-10">
                <div className="text-6xl mb-6">⛏️</div>
                <h3 className="text-2xl font-black text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-base leading-relaxed mb-8" style={{ color: '#888888' }}>
                  To be India's most trusted coal supplier by delivering consistent
                  quality, ensuring timely supply, and building long-term partnerships
                  with industrial clients.
                </p>
                <div
                  className="h-px w-full mb-6"
                  style={{ background: 'linear-gradient(90deg, #D4A017, transparent)' }}
                />
                <div className="flex flex-col gap-3">
                  {[
                    'Steam & Coking Coal Specialists',
                    'Doorstep Delivery Across India',
                    'Transparent Pricing & Contracts',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: '#D4A017' }}
                      />
                      <span className="text-sm" style={{ color: '#aaaaaa' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Products Section ─────────────────────────────────────────────────────────
function ProductsSection() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="products"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 100%)' }}
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 py-24 section-hidden ${visible ? 'section-visible' : ''}`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: '#D4A017' }}
          >
            Our Products
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Premium <span className="gold-gradient-text">Coal Products</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: '#666666' }}>
            We supply a comprehensive range of coal and fuel products tailored to
            meet diverse industrial requirements across India.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coalProducts.map((product, i) => (
            <div
              key={product.id}
              className="card-hover relative rounded-2xl p-7 flex flex-col"
              style={{
                background: 'linear-gradient(135deg, #111111 0%, #161616 100%)',
                border: '1px solid #1e1e1e',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Badge */}
              {product.badge && (
                <div
                  className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                  style={{
                    background: 'rgba(212,160,23,0.15)',
                    color: '#D4A017',
                    border: '1px solid rgba(212,160,23,0.3)',
                  }}
                >
                  {product.badge}
                </div>
              )}

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.15)' }}
              >
                {product.icon}
              </div>

              {/* Name */}
              <h3 className="text-xl font-black text-white mb-2">{product.name}</h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#777777' }}>
                {product.description}
              </p>

              {/* Specs */}
              <div
                className="grid grid-cols-3 gap-3 mb-5 p-4 rounded-xl"
                style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}
              >
                <div className="text-center">
                  <div className="text-xs font-bold mb-1" style={{ color: '#D4A017' }}>
                    GCV
                  </div>
                  <div className="text-xs" style={{ color: '#888888' }}>
                    {product.gcv}
                  </div>
                </div>
                <div className="text-center" style={{ borderLeft: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' }}>
                  <div className="text-xs font-bold mb-1" style={{ color: '#D4A017' }}>
                    Moisture
                  </div>
                  <div className="text-xs" style={{ color: '#888888' }}>
                    {product.moisture}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold mb-1" style={{ color: '#D4A017' }}>
                    Ash
                  </div>
                  <div className="text-xs" style={{ color: '#888888' }}>
                    {product.ash}
                  </div>
                </div>
              </div>

              {/* Applications */}
              <div className="flex flex-wrap gap-2 mb-5">
                {product.applications.map((app) => (
                  <span
                    key={app}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ background: '#1a1a1a', color: '#888888' }}
                  >
                    {app}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://wa.me/919876543210?text=I%20am%20interested%20in%20enquiring%20about%20your%20coal%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.05))',
                  color: '#D4A017',
                  border: '1px solid rgba(212,160,23,0.25)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = 'linear-gradient(135deg, #D4A017, #B8860B)'
                  el.style.color = '#0a0a0a'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = 'linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.05))'
                  el.style.color = '#D4A017'
                }}
              >
                Enquire Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Industries Section ───────────────────────────────────────────────────────
function IndustriesSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="industries" style={{ backgroundColor: '#080808' }}>
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 py-24 section-hidden ${visible ? 'section-visible' : ''}`}
      >
        <div className="text-center mb-16">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: '#D4A017' }}
          >
            Industries We Serve
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Fueling <span className="gold-gradient-text">Every Sector</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: '#666666' }}>
            From small-scale brick kilns to large thermal power plants, we deliver
            tailored coal solutions for every industry.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {industries.map((industry, i) => (
            <div
              key={industry.id}
              className="card-hover p-6 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, #111111 0%, #141414 100%)',
                border: '1px solid #1e1e1e',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                style={{ background: 'rgba(212,160,23,0.07)', border: '1px solid rgba(212,160,23,0.12)' }}
              >
                {industry.icon}
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">{industry.name}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#666666' }}>
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUsSection() {
  const { ref, visible } = useReveal()

  const features = [
    {
      icon: '🏅',
      title: 'Quality Assured',
      description:
        'Every batch lab-tested and certified. We maintain stringent quality control with BIS and ISO-compliant processes, giving you consistency every time.',
    },
    {
      icon: '🚚',
      title: 'Pan India Delivery',
      description:
        'Extensive logistics network across 15+ states. Timely doorstep delivery with real-time tracking and dedicated support for bulk shipments.',
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description:
        'Best market rates with transparent pricing. No hidden charges. Long-term contracts available with volume discounts for consistent buyers.',
    },
    {
      icon: '👨‍💼',
      title: 'Expert Consultation',
      description:
        'Our coal experts help you choose the right grade for your industry, optimizing combustion efficiency and reducing fuel costs.',
    },
  ]

  return (
    <section
      style={{
        background:
          'linear-gradient(180deg, #080808 0%, #0a0a0a 50%, #0d0d0d 100%)',
      }}
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 py-24 section-hidden ${visible ? 'section-visible' : ''}`}
      >
        <div className="text-center mb-16">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: '#D4A017' }}
          >
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            The JD Coal{' '}
            <span className="gold-gradient-text">Advantage</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card-hover p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #111111 0%, #161616 100%)',
                border: '1px solid #1e1e1e',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6"
                style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.2)' }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-black text-white mb-3">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#777777' }}>
                {f.description}
              </p>
              <div
                className="h-px mt-6"
                style={{ background: 'linear-gradient(90deg, #D4A017 0%, transparent 100%)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, visible } = useReveal()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    product: '',
    quantity: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Build WhatsApp message
    const msg = encodeURIComponent(
      `Hello JD Coal & Commercial,\n\nName: ${formData.name}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nProduct: ${formData.product}\nQuantity: ${formData.quantity}\nMessage: ${formData.message}`,
    )
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank')
    setSubmitted(true)
  }

  const inputStyle = {
    background: '#111111',
    border: '1px solid #2a2a2a',
    color: '#ffffff',
    borderRadius: '12px',
    padding: '12px 16px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const contactInfo = [
    {
      icon: '📍',
      label: 'Address',
      value: '123 Industrial Area, Sector 5\nNew Delhi – 110001, India',
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '+91 98765 43210',
    },
    {
      icon: '✉️',
      label: 'Email',
      value: 'info@jdcoal.com',
    },
    {
      icon: '💬',
      label: 'WhatsApp',
      value: '+91 98765 43210',
    },
  ]

  return (
    <section
      id="contact"
      style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #080808 100%)' }}
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 py-24 section-hidden ${visible ? 'section-visible' : ''}`}
      >
        <div className="text-center mb-16">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: '#D4A017' }}
          >
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Request a <span className="gold-gradient-text">Quote Today</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#666666' }}>
            Fill out the form and our team will get back to you within 24 hours
            with the best pricing for your requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="flex flex-col gap-5">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{ background: '#111111', border: '1px solid #1e1e1e' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'rgba(212,160,23,0.1)' }}
                >
                  {info.icon}
                </div>
                <div>
                  <div
                    className="text-xs font-bold tracking-widest uppercase mb-1"
                    style={{ color: '#D4A017' }}
                  >
                    {info.label}
                  </div>
                  <div
                    className="text-sm whitespace-pre-line"
                    style={{ color: '#cccccc' }}
                  >
                    {info.value}
                  </div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              className="rounded-xl overflow-hidden flex items-center justify-center mt-4"
              style={{
                background: 'linear-gradient(135deg, #111111, #1a1a1a)',
                border: '1px solid #1e1e1e',
                height: '160px',
              }}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <div className="text-sm" style={{ color: '#555555' }}>
                  New Delhi, India
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div
            className="p-8 rounded-2xl"
            style={{ background: '#111111', border: '1px solid #1e1e1e' }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                <div className="text-5xl">✅</div>
                <h3 className="text-xl font-black text-white">Enquiry Sent!</h3>
                <p style={{ color: '#888888' }}>
                  Thank you for your interest. Our team will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #D4A017, #B8860B)', color: '#0a0a0a' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-bold tracking-wide mb-2 uppercase"
                      style={{ color: '#888888' }}
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.target as HTMLInputElement).style.borderColor = '#D4A017')
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLInputElement).style.borderColor = '#2a2a2a')
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-bold tracking-wide mb-2 uppercase"
                      style={{ color: '#888888' }}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.target as HTMLInputElement).style.borderColor = '#D4A017')
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLInputElement).style.borderColor = '#2a2a2a')
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-bold tracking-wide mb-2 uppercase"
                    style={{ color: '#888888' }}
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor = '#D4A017')
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor = '#2a2a2a')
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-bold tracking-wide mb-2 uppercase"
                      style={{ color: '#888888' }}
                    >
                      Product *
                    </label>
                    <select
                      required
                      value={formData.product}
                      onChange={(e) =>
                        setFormData({ ...formData, product: e.target.value })
                      }
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={(e) =>
                        ((e.target as HTMLSelectElement).style.borderColor = '#D4A017')
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLSelectElement).style.borderColor = '#2a2a2a')
                      }
                    >
                      <option value="" style={{ background: '#111111' }}>Select product</option>
                      {coalProducts.map((p) => (
                        <option key={p.id} value={p.name} style={{ background: '#111111' }}>
                          {p.shortName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-xs font-bold tracking-wide mb-2 uppercase"
                      style={{ color: '#888888' }}
                    >
                      Quantity (MT)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 500 MT"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.target as HTMLInputElement).style.borderColor = '#D4A017')
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLInputElement).style.borderColor = '#2a2a2a')
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-bold tracking-wide mb-2 uppercase"
                    style={{ color: '#888888' }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={(e) =>
                      ((e.target as HTMLTextAreaElement).style.borderColor = '#D4A017')
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLTextAreaElement).style.borderColor = '#2a2a2a')
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="py-4 rounded-xl font-black text-base tracking-wide transition-all duration-300 mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #D4A017 0%, #FFD700 50%, #B8860B 100%)',
                    color: '#0a0a0a',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.transform = 'none')
                  }
                >
                  Send Enquiry via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer
      style={{
        background: '#050505',
        borderTop: '1px solid #111111',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{ background: 'linear-gradient(135deg, #D4A017, #B8860B)' }}
              >
                ⛏️
              </div>
              <div>
                <div
                  className="font-black text-sm tracking-widest"
                  style={{ color: '#D4A017' }}
                >
                  JD COAL
                </div>
                <div className="text-white text-xs tracking-widest opacity-50">
                  &amp; COMMERCIAL
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#555555' }}>
              India's trusted premium coal supplier. Quality, reliability, and
              timely delivery since 1999.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
              style={{ background: '#25D366', color: '#ffffff' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs font-black tracking-widest uppercase mb-5"
              style={{ color: '#D4A017' }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About Us', id: 'about' },
                { label: 'Products', id: 'products' },
                { label: 'Industries', id: 'industries' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm transition-colors duration-200 cursor-pointer bg-transparent border-none text-left"
                    style={{ color: '#555555' }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLButtonElement).style.color = '#D4A017')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLButtonElement).style.color = '#555555')
                    }
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4
              className="text-xs font-black tracking-widest uppercase mb-5"
              style={{ color: '#D4A017' }}
            >
              Our Products
            </h4>
            <ul className="flex flex-col gap-3">
              {coalProducts.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => scrollTo('products')}
                    className="text-sm transition-colors duration-200 cursor-pointer bg-transparent border-none text-left"
                    style={{ color: '#555555' }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLButtonElement).style.color = '#D4A017')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLButtonElement).style.color = '#555555')
                    }
                  >
                    {p.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-black tracking-widest uppercase mb-5"
              style={{ color: '#D4A017' }}
            >
              Contact Info
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { icon: '📍', text: '123 Industrial Area, Sector 5\nNew Delhi – 110001' },
                { icon: '📞', text: '+91 98765 43210' },
                { icon: '✉️', text: 'info@jdcoal.com' },
                { icon: '🕐', text: 'Mon–Sat: 9 AM – 7 PM' },
              ].map((item) => (
                <div key={item.icon} className="flex items-start gap-3">
                  <span className="text-sm mt-0.5">{item.icon}</span>
                  <span
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: '#555555' }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid #111111' }}
        >
          <p className="text-xs" style={{ color: '#333333' }}>
            © 2024 JD Coal &amp; Commercial. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#333333' }}>
            Premium Coal Supplier | Pan India Delivery | Est. 1999
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Home Component ──────────────────────────────────────────────────────
function Home() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProductsSection />
      <IndustriesSection />
      <WhyChooseUsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
