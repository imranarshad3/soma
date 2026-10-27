import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../../components/ProductCard'
import { Newsletter } from '../../components/Shell'
import {
  ArrowRight, Bag, Bell, CheckCircle, ChevronRight, CreditCard, Dots, Heart, Leaf, MapPin, PackageIcon,
  Search, Settings, Share, Star, Trash, UserIcon,
} from '../../components/Icons'
import { useStore } from '../../store/StoreContext'
import { money } from '../../data/products'
import '../../styles/account.css'
import ProductReviews from '../../components/ProductReviews'
import '../../styles/account-polish.css'

const NAV = [
  { key: 'orders', label: 'Orders', icon: <PackageIcon size={17} /> },
  { key: 'profile', label: 'Profile', icon: <UserIcon size={17} /> },
  { key: 'addresses', label: 'Addresses', icon: <MapPin size={17} /> },
  { key: 'saved', label: 'Saved Products', icon: <Bag size={17} /> },
  { key: 'wishlist', label: 'Wishlist', icon: <Heart size={17} />, to: '/wishlist' },
  { key: 'payment', label: 'Payment Methods', icon: <CreditCard size={17} /> },
  { key: 'notifications', label: 'Notifications', icon: <Bell size={17} /> },
  { key: 'reviews', label: 'Reviews', icon: <Star size={17} /> },
  { key: 'settings', label: 'Settings', icon: <Settings size={17} /> },
  { key: 'logout', label: 'Logout', icon: <ArrowRight size={17} /> },
]

const TABS = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
const PAGE_SIZE = 4

const statusLabel = (s) => (s === 'Shipped' ? 'In Transit' : s)

const STATUS_NOTE = {
  Delivered: (d) => `Delivered on\n${d}`,
  Processing: () => 'Being prepared\nright now',
  Shipped: () => 'Shipment in progress',
  Cancelled: (d) => `Cancelled on\n${d}`,
}

function Thumbs({ index, count }) {
  const { products } = useStore()
  const picks = useMemo(
    () => Array.from({ length: Math.min(3, Math.max(1, count)) }, (_, i) => products[(index + i * 3) % products.length]),
    [products, index, count]
  )
  return (
    <div className="order-thumbs">
      {picks.map((p, i) => (
        <img key={p.id + i} src={p.image} alt="" loading="lazy" />
      ))}
      {count > 3 && <span className="more">+{count - 3}</span>}
    </div>
  )
}

export default function Account() {
  const { orders, products, wishlistProducts, notify } = useStore()
  const [panel, setPanel] = useState('orders')
  const [tab, setTab] = useState('All Orders')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [preferences, setPreferences] = useState(() => {
    try { return JSON.parse(localStorage.getItem('soma.notificationPreferences')) || [true, true, true, false] } catch { return [true, true, true, false] }
  })
  useEffect(() => { try { localStorage.setItem('soma.notificationPreferences', JSON.stringify(preferences)) } catch {} }, [preferences])

  const filtered = useMemo(() => {
    let list = orders.filter((o) => (tab === 'All Orders' ? true : o.status === tab))
    if (q.trim()) {
      const t = q.trim().toLowerCase()
      list = list.filter((o) => (o.id + o.customer + o.status).toLowerCase().includes(t))
    }
    if (sort === 'high') list = [...list].sort((a, b) => b.total - a.total)
    if (sort === 'low') list = [...list].sort((a, b) => a.total - b.total)
    return list
  }, [orders, tab, q, sort])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const stats = [
    [<PackageIcon size={20} key="a" />, orders.length, 'Total Orders'],
    [<Heart size={20} key="b" />, wishlistProducts.length, 'Saved Products'],
    [<PackageIcon size={20} key="c" />, orders.filter((o) => o.status === 'Processing').length, 'In Progress'],
    [<CheckCircle size={20} key="d" />, orders.filter((o) => o.status === 'Delivered').length, 'Delivered'],
  ]

  const go = (key) => {
    if (key === 'logout') return notify('You have been signed out of this demo session')
    setPanel(key)
    setPage(1)
  }

  return (
    <>
      <section className="account-hero editorial-hero">
        <img className="editorial-hero-image" src="/images/serum-premium.webp" alt="SOMA botanical face serum" fetchpriority="high" />
        <div className="account-hero-bg" aria-hidden="true" />
        <span className="script" aria-hidden="true">
          Glow
          <br />
          Naturally
          <br />
          With Soma
        </span>
        <div className="container">
          <p className="eyebrow">My Account</p>
          <h1>
            Welcome Back,
            <br />
            Imran <Leaf size={26} />
          </h1>
          <p className="lead">Manage your orders, profile and explore your natural beauty journey.</p>
        </div>
      </section>

      <section className="account-main"><div className="container"><p className="demo-notice">Account preview — profile and order records are demonstration data stored in this browser.</p></div>
        <div className="container account-layout">
          {/* sidebar */}
          <aside className="account-side">
            <div className="who card">
              <span className="avatar">IA</span>
              <span>
                <b>Imran Arshad</b>
                <small>imran@example.com</small>
              </span>
              <button onClick={() => setPanel('profile')} aria-label="Edit profile">
                <Share size={14} />
              </button>
            </div>

            <nav className="side-nav card" aria-label="Account sections">
              {NAV.map((n) =>
                n.to ? (
                  <Link key={n.key} to={n.to} className="side-link">
                    <span className="ic">{n.icon}</span> {n.label}
                  </Link>
                ) : (
                  <button
                    key={n.key}
                    className={`side-link${panel === n.key ? ' on' : ''}`}
                    onClick={() => go(n.key)}
                    aria-current={panel === n.key ? 'page' : undefined}
                  >
                    <span className="ic">{n.icon}</span> {n.label}
                  </button>
                )
              )}
            </nav>

            <div className="side-promo">
              <h4>
                A moment
                <br />
                for your ritual.
              </h4>
              <p>Explore ingredient notes and simple skincare routines.</p>
              <Link className="btn btn-light btn-sm" to="/journal">
                Read the Journal <ArrowRight size={14} />
              </Link>
            </div>
          </aside>

          {/* content */}
          <div className="account-content"><div className="account-workspace-heading"><div><p className="eyebrow">Your personal space</p><h2>Care, all in one place.</h2></div><span>Account overview</span></div>
            <div className="stat-row">
              {stats.map(([icon, value, label]) => (
                <div className="stat card" key={label}>
                  <span className="ic">{icon}</span>
                  <span>
                    <b>{value}</b>
                    <small>{label}</small>
                  </span>
                </div>
              ))}
            </div>

            {panel === 'orders' && (
              <>
                <div className="panel-head">
                  <h2>My Orders</h2>
                  <div className="panel-tools">
                    <label className="shop-search">
                      <Search size={16} />
                      <input
                        value={q}
                        onChange={(e) => { setQ(e.target.value); setPage(1) }}
                        placeholder="Search orders..."
                        aria-label="Search orders"
                      />
                    </label>
                    <select
                      className="select"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      aria-label="Sort orders"
                    >
                      <option value="newest">Newest First</option>
                      <option value="high">Highest Total</option>
                      <option value="low">Lowest Total</option>
                    </select>
                  </div>
                </div>

                <div className="tabs-row order-tabs" role="tablist" aria-label="Order status">
                  {TABS.map((t) => (
                    <button
                      key={t}
                      role="tab"
                      aria-selected={tab === t}
                      className={tab === t ? 'on' : ''}
                      onClick={() => { setTab(t); setPage(1) }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {shown.length === 0 ? (
                  <div className="empty-state">
                    <h3>No orders here</h3>
                    <p>When you place an order it will appear in this list.</p>
                    <Link className="btn btn-primary" to="/shop">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <ul className="order-list">
                    {shown.map((o, i) => {
                      const note = (STATUS_NOTE[o.status] || (() => ''))(o.date)
                      const canTrack = o.status === 'Shipped' || o.status === 'Processing'
                      return (
                        <li className="order card" key={o.id}>
                          <Thumbs index={i * 2} count={o.items} />
                          <div className="order-meta">
                            <b>Order #{o.id}</b>
                            <small>
                              {o.date} • {o.items} items
                            </small>
                            <strong>{money(o.total)}</strong>
                          </div>
                          <div className="order-state">
                            <span className={`badge ${o.status.toLowerCase()}`}>{statusLabel(o.status)}</span>
                            {note.split('\n').map((line) => (
                              <small key={line}>{line}</small>
                            ))}
                            <span className="order-cta">
                              {canTrack && (
                                <Link className="btn btn-primary btn-sm" to={`/track-order?id=${o.id}`}>
                                  Track Order
                                </Link>
                              )}
                              {o.status === 'Delivered' && (
                                <Link className="btn btn-primary btn-sm" to="/shop">
                                  Reorder
                                </Link>
                              )}
                              <Link className="btn btn-outline btn-sm" to={`/track-order?id=${o.id}`}>
                                View Details
                              </Link>
                            </span>
                          </div>
                          <ChevronRight size={18} />
                        </li>
                      )
                    })}
                  </ul>
                )}

                {pages > 1 && (
                  <nav className="pager" aria-label="Order pages">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                      ‹
                    </button>
                    {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                      <button key={n} className={n === page ? 'on' : ''} onClick={() => setPage(n)}>
                        {n}
                      </button>
                    ))}
                    <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>
                      ›
                    </button>
                  </nav>
                )}
              </>
            )}

            {panel === 'profile' && (
              <section className="panel card">
                <h2>Profile</h2>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="pf-name">Full name</label>
                    <input id="pf-name" className="input" defaultValue="Imran Arshad" />
                  </div>
                  <div className="field">
                    <label htmlFor="pf-email">Email</label>
                    <input id="pf-email" className="input" defaultValue="imran@example.com" />
                  </div>
                  <div className="field">
                    <label htmlFor="pf-phone">Phone</label>
                    <input id="pf-phone" className="input" defaultValue="+92 300 1234567" />
                  </div>
                  <div className="field">
                    <label htmlFor="pf-bday">Birthday</label>
                    <input id="pf-bday" className="input" defaultValue="12 March 1994" />
                  </div>
                </div>
                <button className="btn btn-primary" onClick={() => notify('Profile saved')}>
                  Save Changes
                </button>
              </section>
            )}

            {panel === 'addresses' && (
              <section className="panel card">
                <h2>Addresses</h2>
                <div className="addr-grid">
                  {[
                    ['Home', '123 Green Valley Street', 'DHA Phase 7, Lahore 54000', 'Pakistan', true],
                    ['Studio', '88 Magnolia Avenue', 'Brooklyn, NY 11201', 'United States', false],
                  ].map(([label, l1, l2, l3, def]) => (
                    <article key={label} className="addr">
                      <header>
                        <b>{label}</b>
                        {def && <span className="chip-mini">Default</span>}
                      </header>
                      <p>
                        {l1}
                        <br />
                        {l2}
                        <br />
                        {l3}
                      </p>
                      <button className="link-mini" onClick={() => notify('Address editing is part of the demo')}>
                        Edit
                      </button>
                    </article>
                  ))}
                </div>
                <button className="btn btn-outline" onClick={() => notify('New address form (demo)')}>
                  Add New Address
                </button>
              </section>
            )}

            {panel === 'saved' && (
              <section className="panel">
                <div className="panel-head">
                  <h2>Saved Products</h2>
                  <Link className="link-more" to="/wishlist">
                    Open Wishlist <ArrowRight size={14} />
                  </Link>
                </div>
                {wishlistProducts.length === 0 ? (
                  <div className="empty-state">
                    <h3>Nothing saved yet</h3>
                    <p>Tap the heart on a product to save it here.</p>
                    <Link className="btn btn-primary" to="/shop">
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="wish-grid">
                    {wishlistProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </section>
            )}

            {panel === 'payment' && (
              <section className="panel card">
                <h2>Payment Methods</h2>
                <ul className="pay-list">
                  <li>
                    <span className="pay-chip-lg">VISA</span>
                    <span>
                      <b>Visa ending 4218</b>
                      <small>Expires 08/2029</small>
                    </span>
                    <span className="chip-mini">Default</span>
                  </li>
                  <li>
                    <span className="pay-chip-lg">MC</span>
                    <span>
                      <b>Mastercard ending 9902</b>
                      <small>Expires 02/2028</small>
                    </span>
                  </li>
                </ul>
                <button className="btn btn-outline" onClick={() => notify('Add card form (demo)')}>
                  Add Payment Method
                </button>
              </section>
            )}

            {panel === 'notifications' && (
              <section className="panel card">
                <p className="eyebrow">Your preferences</p><h2>Notifications</h2><p className="account-panel-description">Choose what you would like to hear about. Preferences are saved in this browser; message delivery is not connected.</p>
                <ul className="toggle-list">
                  {['Order and shipping updates', 'New product launches', 'Restock alerts for saved products', 'Skincare tips from the Journal'].map(
                    (t, i) => (
                      <li key={t}>
                        <span><b>{t}</b><small>{['Keep an eye on your order journey.', 'Discover new additions to the collection.', 'Hear when a favourite is available again.', 'A little inspiration for your everyday routine.'][i]}</small></span>
                        <button type="button" className={`preference-switch${preferences[i] ? ' is-on' : ''}`} role="switch" aria-checked={!!preferences[i]} aria-label={t} onClick={() => setPreferences((previous) => previous.map((value, index) => index === i ? !value : value))}><span aria-hidden="true" /></button>
                      </li>
                    )
                  )}
                </ul>
              </section>
            )}

            {panel === 'reviews' && <ProductReviews products={products} />}

            {panel === 'settings' && (
              <section className="panel card">
                <h2>Settings</h2>
                <ul className="toggle-list">
                  <li>
                    <span>Two-factor authentication</span>
                    <input type="checkbox" aria-label="Two-factor authentication" />
                  </li>
                  <li>
                    <span>Personalised product recommendations</span>
                    <input type="checkbox" defaultChecked aria-label="Personalised recommendations" />
                  </li>
                  <li>
                    <span>Marketing emails</span>
                    <input type="checkbox" defaultChecked aria-label="Marketing emails" />
                  </li>
                </ul>
                <button className="btn btn-outline danger" onClick={() => notify('Account deletion is disabled in this demo')}>
                  <Trash size={15} /> Delete Account
                </button>
              </section>
            )}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
