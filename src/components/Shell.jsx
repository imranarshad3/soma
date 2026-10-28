import { money } from '../data/products'
// Shared storefront shell: announcement bar, header, trust strip, newsletter, footer.
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../store/StoreContext'
import {
  ArrowRight, Bag, Cart, Close, Facebook, Heart, Instagram, Leaf, List, Menu, Pinterest,
  Search, Shield, Truck, UserIcon, Youtube, Refresh, Headset, Sparkle, Flask, Rabbit, Eco, CheckCircle,
} from './Icons'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/ingredients', label: 'Ingredients' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
]

function SearchPanel({ open, onClose }) {
  const { products } = useStore()
  const [q, setQ] = useState('')
  const box = useRef(null)
  const input = useRef(null)
  const navigate = useNavigate()
  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    return products.filter((p) => !term || [p.name, p.category, p.tagline, ...(p.ingredientTags || [])].join(' ').toLowerCase().includes(term)).slice(0, term ? 6 : 3)
  }, [q, products])
  useEffect(() => {
    if (!open) return
    setQ('')
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    input.current?.focus()
    return () => { document.body.style.overflow = overflow; previous?.focus?.() }
  }, [open])
  if (!open) return null
  const go = (slug) => { onClose(); navigate(`/products/${slug}`) }
  const handleKeys = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
    if (event.key !== 'Tab') return
    const focusable = [...box.current.querySelectorAll('button, input, a[href]')].filter((element) => !element.disabled)
    const first = focusable[0], last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }
  return <div className="search-overlay premium-search-overlay" onClick={(event) => { if (event.target === event.currentTarget) onClose() }} onKeyDown={handleKeys}>
    <section className="premium-search-panel" ref={box} role="dialog" aria-modal="true" aria-labelledby="search-title">
      <div className="premium-search-heading"><div><p className="eyebrow">The SOMA collection</p><h2 id="search-title">Find your everyday essential.</h2></div><button className="search-dismiss" onClick={onClose} aria-label="Close search"><Close size={22}/></button></div>
      <form className="premium-search-field" onSubmit={(event) => { event.preventDefault(); if (results.length) go(results[0].slug) }}><Search size={23}/><input ref={input} value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search a product, ingredient or routine…" aria-label="Search products" autoComplete="off"/>{q && <button type="button" className="search-clear" onClick={() => { setQ(''); input.current?.focus() }} aria-label="Clear search"><Close size={16}/></button>}<span className="search-shortcut">ESC</span></form>
      {!q && <div className="search-suggestions"><span>Explore</span>{['Serum','Moisturizers','Aloe Vera'].map((term) => <button key={term} onClick={() => { setQ(term); input.current?.focus() }}>{term} <ArrowRight size={13}/></button>)}</div>}
      <div className="search-results-heading"><span>{q ? 'Search results' : 'Start with the essentials'}</span><span role="status" aria-live="polite">{results.length} {results.length === 1 ? 'product' : 'products'}</span></div>
      <div className="premium-search-results">
        {!results.length && <div className="search-empty"><Search size={28}/><h3>A fresh search?</h3><p>No products match “{q}”. Try a product name or an ingredient.</p><button onClick={() => { setQ(''); input.current?.focus() }}>Explore the collection <ArrowRight size={16}/></button></div>}
        {results.map((product) => <button key={product.id} className="premium-search-result" onClick={() => go(product.slug)}><img src={product.image} alt="" width="80" height="80"/><span><small>{product.category}</small><b>{product.name}</b><em>{money(product.price)}</em></span><ArrowRight size={18}/></button>)}
      </div>
      <div className="search-panel-note"><Leaf size={16}/><span>A little care. A ritual of your own.</span></div>
    </section>
  </div>
}

export function AnnouncementBar() { return <div className="announcement"><Link to="/products/radiant-glow-face-serum">Meet your everyday essential — discover Radiant Glow <ArrowRight size={13} /></Link></div> }

export function SiteHeader() {
  const { cartCount, wishlist } = useStore()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const location = useLocation()
  const menuButton = useRef(null)
  useEffect(() => {
    if (!open) return
    const onKey = (event) => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() } }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    setOpen(false)
    setSearch(false)
  }, [location.pathname])

  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="SOMA Organic home">
            <span className="leaf">
              <Leaf size={16} />
            </span>
            <span className="mark">SOMA</span>
            <span className="sub">Organic</span>
          </Link>

          <nav className="main-nav" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive || (n.to === '/shop' && location.pathname.startsWith('/products/')) ? 'active' : '')}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-btn" onClick={() => setSearch(true)} aria-label="Search" title="Search products">
              <Search size={19} />
            </button>
            <NavLink className={({ isActive }) => `icon-btn hide-mobile${isActive ? ' is-current' : ''}`} to="/account" aria-label="My account" title="My account">
              <UserIcon size={19} />
            </NavLink>
            <NavLink className={({ isActive }) => `icon-btn${isActive ? ' is-current' : ''}`} to="/wishlist" aria-label="Wishlist" title="Wishlist">
              <Heart size={19} />
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </NavLink>
            <NavLink className={({ isActive }) => `icon-btn cart-action${isActive ? ' is-current' : ''}`} to="/cart" aria-label="Cart" title="Cart">
              <Bag size={19} />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </NavLink>
            <button
              className="icon-btn nav-toggle"
              ref={menuButton}
              aria-controls="soma-mobile-navigation"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="mobile-nav" id="soma-mobile-navigation" aria-label="Mobile">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'}>
                {n.label}
              </NavLink>
            ))}
            <NavLink to="/account">My Account</NavLink>
            <NavLink to="/track-order">Track Order</NavLink>
          </nav>
        )}
      </header>
      <SearchPanel open={search} onClose={() => setSearch(false)} />
    </>
  )
}

export function TrustBar({ variant = 'home' }) {
  const items = [
    { icon: <Leaf size={22} />, title: 'Know your formula', sub: 'Explore the ingredient library' },
    { icon: <Bag size={22} />, title: 'Build your ritual', sub: 'Choose your everyday essentials' },
    { icon: <UserIcon size={22} />, title: 'Make it yours', sub: 'Save favourites to your wishlist' },
  ]
  return (
    <div className="trust-bar">
      <div className="container">
        <div className="trust-grid">
          {items.map((i) => (
            <div className="trust-item" key={i.title}>
              <span className="ic">{i.icon}</span>
              <span>
                <span className="tt">{i.title}</span>
                <br />
                <span className="ss">{i.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setDone(true)
    setEmail('')
  }
  return (
    <section className="newsletter">
      <div className="bg" aria-hidden="true" />
      <div className="container newsletter-inner">
        <div>
          <h3>A little care, in your <em>inbox</em>.</h3>
          <p>
            Product notes and simple rituals. Newsletter signup is being prepared.
          </p>
        </div>
        {done ? (
          <p className="done" role="status">Signup is not connected yet. Your email has not been sent or subscribed.</p>
        ) : (
          <form onSubmit={submit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              required
            />
            <button type="submit">
              Subscribe <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

const FOOT = {
  Shop: [
    ['All Products', '/shop'],
    ['Serums', '/shop?category=Serums'],
    ['Moisturizers', '/shop?category=Moisturizers'],
    ['Cleansers', '/shop?category=Cleansers'],
    ['Skincare Sets', '/shop?category=Skincare%20Sets'],
    ['Body Care', '/shop?category=Body%20Care'],
  ],
  About: [
    ['Our Story', '/about'],
    ['Ingredients', '/ingredients'],
    ['Sustainability', '/about'],
    ['Journal', '/journal'],
    ['Contact', '/contact'],
  ],
  Support: [
    ['FAQs', '/contact'],
    ['Shipping', '/contact'],
    ['Returns', '/contact'],
    ['Track Order', '/track-order'],
    
    
  ],
}

export function SiteFooter() {
  return <footer className="site-footer premium-footer">
    <div className="container">
      <div className="footer-intro">
        <div className="footer-intro-copy"><p className="eyebrow">SOMA / Everyday, with intention</p><h2>A little care.<br /><em>A lasting ritual.</em></h2><Link className="footer-explore" to="/shop">Explore the collection <ArrowRight size={20} /></Link></div>
        <Link className="footer-campaign" to="/products/radiant-glow-face-serum"><img src="/images/serum-premium.webp" width="640" height="640" alt="Radiant Glow Face Serum" loading="lazy" /><span>The daily essential <ArrowRight size={18}/></span></Link>
      </div>
      <div className="footer-navigation">
        <div className="footer-identity"><Link to="/" className="brand" aria-label="SOMA Organic home"><Leaf size={19}/><span className="mark">SOMA</span><span className="sub">Organic</span></Link><p>Botanical inspiration.<br />A more considered daily routine.</p><Link className="footer-story-link" to="/about">Get to know SOMA <ArrowRight size={16}/></Link></div>
        {Object.entries({Shop:[['All Products','/shop'],['Radiant Glow Serum','/products/radiant-glow-face-serum'],['Skincare Sets','/shop?category=Skincare%20Sets'],['My Wishlist','/wishlist']],Discover:[['Our Perspective','/about'],['Ingredient Library','/ingredients'],['The Journal','/journal']],Support:[['Questions & Answers','/contact'],['Track an Order','/track-order'],['My Account','/account'],['Shopping Bag','/cart']]}).map(([title,links])=><nav className="footer-link-group" aria-label={'Footer '+title} key={title}><h3>{title}</h3><ul>{links.map(([label,to])=><li key={label}><Link to={to}>{label}</Link></li>)}</ul></nav>)}

      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} SOMA Organic</span><span>Thoughtfully considered. Every day.</span><a href="#main-content" className="footer-back-top">Back to top <ArrowRight size={15}/></a></div>
    </div>
  </footer>
}
