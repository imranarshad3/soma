import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { ArrowRight, Bag, Chart, Dots, Search, Users, Box, Eye } from '../../components/Icons'
import { money } from '../../data/products'
import '../../styles/admin.css'

const TABS = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
const STATUSES = ['All Statuses', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function Orders() {
  const { orders, products, setOrders, notify } = useStore()
  const [tab, setTab] = useState('All Orders')
  const [status, setStatus] = useState('All Statuses')
  const [q, setQ] = useState('')

  const rows = useMemo(() => {
    let list = orders
    if (tab !== 'All Orders') list = list.filter((o) => o.status === tab)
    if (status !== 'All Statuses') list = list.filter((o) => o.status === status)
    const t = q.trim().toLowerCase()
    if (t) list = list.filter((o) => (o.id + o.customer + o.email).toLowerCase().includes(t))
    return list
  }, [orders, tab, status, q])

  const metrics = [
    [<Bag size={20} key="a" />, 'Total Orders', orders.length],
    [<Box size={20} key="b" />, 'Awaiting Fulfilment', orders.filter((o) => o.status === 'Processing').length],
    [<Chart size={20} key="c" />, 'Revenue', money(orders.reduce((s, o) => s + o.total, 0))],
    [<Users size={20} key="d" />, 'Unique Customers', new Set(orders.map((o) => o.customer)).size],
  ]

  const advance = (order) => {
    const flow = { Processing: 'Shipped', Shipped: 'Delivered', Delivered: 'Delivered', Cancelled: 'Cancelled' }
    const next = flow[order.status]
    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: next } : o)))
    notify(`${order.id} moved to ${next}`)
  }

  return (
    <div className="admin-orders">
      <div className="admin-head">
        <div>
          <h1>Orders</h1>
          <p>Track, fulfil and update every customer order.</p>
        </div>
        <div className="admin-tools">
          <label className="admin-search-input">
            <Search size={16} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders..." aria-label="Search orders" />
          </label>
          <select className="select sm" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Order status">
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="three-col">
        {metrics.map(([icon, label, value]) => (
          <article className="card metric-card" key={label}>
            <span className="ic" style={{ color: 'var(--forest)' }}>{icon}</span>
            <small>{label}</small>
            <b>{value}</b>
          </article>
        ))}
      </div>

      <section className="card table-card">
        <header className="card-head">
          <div>
            <h2>All Orders</h2>
            <p>Status changes are saved in this browser and reflected on the tracking page.</p>
          </div>
          <Link className="link-more" to="/admin/analytics">
            View Analytics <ArrowRight size={14} />
          </Link>
        </header>

        <div className="pill-filters" style={{ padding: '8px 24px 4px' }}>
          {TABS.map((t) => (
            <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="empty">No orders match this view.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {rows.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <Link to={`/admin/orders/${o.id}`}>#{o.id}</Link>
                    </td>
                    <td>
                      <div className="cell-product">
                        <span className="mini-avatar">{o.customer.charAt(0)}</span>
                        <span>
                          <b>{o.customer}</b>
                          <small>{o.email}</small>
                        </span>
                      </div>
                    </td>
                    <td>{o.items}</td>
                    <td className="strong">{money(o.total)}</td>
                    <td>
                      <span className={`badge ${o.status.toLowerCase()}`}>{o.status}</span>
                    </td>
                    <td className="muted order-date"><span>{o.date.split(', ').slice(0, 2).join(', ')}</span><small>{o.date.split(', ').slice(2).join(', ')}</small></td>
                    <td>
                      <div className="row-actions">
                        <button className="icon-btn-sm" onClick={() => advance(o)} aria-label={`Advance ${o.id}`}>
                          <ArrowRight size={15} />
                        </button>
                        <Link className="icon-btn-sm" to={`/admin/orders/${o.id}`} aria-label={`Open ${o.id}`}>
                          <Eye size={17} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
