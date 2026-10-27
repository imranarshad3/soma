import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import {
  Bell, Bag, Box, Chart, ChevronDown, Layers, Leaf, Menu, PackageIcon, Search, Settings, Users, Close, Dots,
} from '../../components/Icons'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: <Box size={17} />, end: true },
  { to: '/admin/products', label: 'Products', icon: <PackageIcon size={17} /> },
  { to: '/admin/categories', label: 'Categories', icon: <Layers size={17} /> },
  { to: '/admin/orders', label: 'Orders', icon: <Bag size={17} /> },
  { to: '/admin/customers', label: 'Customers', icon: <Users size={17} /> },
  { to: '/admin/analytics', label: 'Analytics', icon: <Chart size={17} /> },
  { to: '/admin/settings', label: 'Settings', icon: <Settings size={17} /> },
]

export default function AdminShell() {
  const { products, orders, customers } = useStore()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const searchInput = useRef(null)
  const [activityOpen, setActivityOpen] = useState(false)
  const section = [...NAV].reverse().find((item) => item.to === '/admin' ? pathname === item.to : pathname.startsWith(item.to))?.label || 'Workspace'
  useEffect(() => { setOpen(false); setActivityOpen(false); setQ('') }, [pathname])
  useEffect(() => {
    const handler = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchInput.current?.focus() }
      if (event.key === 'Escape') { setOpen(false); setActivityOpen(false); setQ(''); searchInput.current?.blur() }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const results =
    q.trim().length > 0
      ? [
          ...products
            .filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase()))
            .slice(0, 3)
            .map((p) => ({ label: p.name, sub: 'Product', to: `/admin/products/${p.id}` })),
          ...orders
            .filter((o) => o.id.toLowerCase().includes(q.trim().toLowerCase()))
            .slice(0, 3)
            .map((o) => ({ label: `Order #${o.id}`, sub: o.customer, to: `/admin/orders/${o.id}` })),
          ...customers
            .filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()))
            .slice(0, 3)
            .map((c) => ({ label: c.name, sub: c.email, to: '/admin/customers' })),
        ].slice(0, 6)
      : []

  return (
    <div className="admin"><a className="skip-link" href="#admin-main">Skip to admin content</a>
      <header className="admin-top">
        <button className="admin-burger" onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation" aria-expanded={open} aria-controls="admin-navigation">
          {open ? <Close size={18} /> : <Menu size={18} />}
        </button>

        <div className="admin-top-context"><span>Workspace</span><span aria-hidden="true">/</span><b>{section}</b></div>
        <div className="admin-search">
          <Search size={17} />
          <input
            ref={searchInput}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, orders, customers..."
            aria-label="Search admin"
          />
          <kbd>⌘ K</kbd>
          {results.length > 0 && (
            <ul className="admin-search-results">
              {results.map((r) => (
                <li key={r.label + r.to}>
                  <button
                    onClick={() => {
                      setQ('')
                      navigate(r.to)
                    }}
                  >
                    <b>{r.label}</b>
                    <small>{r.sub}</small>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-top-right">
          <Link className="admin-store-link" to="/">View store <ChevronDown size={14}/></Link>
          <div className="admin-activity-wrap"><button className="admin-bell" aria-label="Recent activity" aria-expanded={activityOpen} onClick={() => setActivityOpen((value) => !value)}>
            <Bell size={19} />
            <span className="dot" />
          </button>{activityOpen && <section className="admin-activity"><h2>Recent orders</h2><p>Local workspace activity</p>{orders.slice(0,3).map((order) => <Link key={order.id} to={'/admin/orders/'+order.id}><span><b>{order.id}</b><small>{order.customer}</small></span><em>{order.status}</em></Link>)}{!orders.length && <p>No orders yet.</p>}</section>}</div>
          <div className="admin-user">
            <span className="admin-avatar">SA</span>
            <span>
              <b>Soma Admin</b>
              <small>Administrator</small>
            </span>
            <ChevronDown size={15} />
          </div>
        </div>
      </header>

      <div className="admin-body">
        {open && <button className="admin-nav-backdrop" onClick={() => setOpen(false)} aria-label="Close navigation" />}
        <aside id="admin-navigation" className={`admin-side${open ? ' open' : ''}`}>
          <Link to="/" className="admin-brand">
            <Leaf size={15} />
            <span className="mark">SOMA</span>
            <span className="sub">Organic</span>
          </Link>

          <p className="admin-nav-label">Store management</p>
          <nav className="admin-nav" aria-label="Admin">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? 'on' : '')}
              >
                <span className="ic">{n.icon}</span>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="admin-promo"><span className="admin-workspace-mark"><Leaf size={20}/></span><p>Your brand.<br /><b>Thoughtfully managed.</b></p><Link to="/">Open storefront <ChevronDown size={15}/></Link></div>
          <div className="admin-side-bottom"><span className="workspace-dot"/> Local workspace <small>Browser preview</small></div>
        </aside>

        <main className="admin-main" id="admin-main" aria-label={section}>
          <div className="admin-workspace-meta"><span>SOMA / Commerce studio</span><span><i/> Local preview · changes stay in this browser</span></div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
