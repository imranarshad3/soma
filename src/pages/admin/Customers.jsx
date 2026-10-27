import { money } from '../../data/products'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { Dots, Mail, Plus, Search, Trash, Users, MapPin, Heart } from '../../components/Icons'
import '../../styles/admin.css'

const FILTERS = ['All Customers', 'Active', 'VIP', 'Inactive']

export default function Customers() {
  const { customers, products, notify } = useStore()
  const [filter, setFilter] = useState('All Customers')
  const [q, setQ] = useState('')

  const rows = useMemo(() => {
    let list = customers
    if (filter !== 'All Customers') list = list.filter((c) => c.status === filter)
    const t = q.trim().toLowerCase()
    if (t) list = list.filter((c) => (c.name + c.email + c.city).toLowerCase().includes(t))
    return list
  }, [customers, filter, q])

  const totalSpent = customers.reduce((s, c) => s + c.spent, 0)

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Customers</h1>
          <p>Understand who shops with you and reward your most loyal fans.</p>
        </div>
        <div className="admin-tools">
          <label className="admin-search-input">
            <Search size={16} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers..." aria-label="Search customers" />
          </label>
          <button className="btn btn-primary btn-sm" onClick={() => notify('Customer invite sent (demo)')}>
            <Plus size={15} /> Add Customer
          </button>
        </div>
      </div>

      <div className="three-col">
        <article className="card metric-card">
          <small>Total Customers</small>
          <b>{customers.length}</b>
          <em>↗ +14% vs last month</em>
        </article>
        <article className="card metric-card">
          <small>Lifetime Revenue</small>
          <b>{money(totalSpent)}</b>
          <em>↗ +9% vs last month</em>
        </article>
        <article className="card metric-card">
          <small>VIP Members</small>
          <b>{customers.filter((c) => c.status === 'VIP').length}</b>
          <em>Top 10% by spend</em>
        </article>
      </div>

      <section className="card table-card">
        <header className="card-head">
          <div>
            <h2>All Customers</h2>
            <p>Segment, contact and review customer history.</p>
          </div>
        </header>

        <div className="pill-filters" style={{ padding: '8px 24px 4px' }}>
          {FILTERS.map((f) => (
            <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="empty">No customers match this view.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Location</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Segment</th>
                  <th>Customer Since</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="cell-product">
                        <span className="mini-avatar">{c.name.charAt(0)}</span>
                        <span>
                          <b>{c.name}</b>
                          <small>{c.email}</small>
                        </span>
                      </div>
                    </td>
                    <td className="muted">{c.city}</td>
                    <td>{c.orders}</td>
                    <td className="strong">${c.spent.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${c.status.toLowerCase()}`}>{c.status}</span>
                    </td>
                    <td className="muted">{c.since}</td>
                    <td>
                      <div className="row-actions">
                        <button className="icon-btn-sm" onClick={() => notify(`Email drafted to ${c.name}`)} aria-label={`Email ${c.name}`}>
                          <Mail size={15} />
                        </button>
                        <button className="icon-btn-sm danger" onClick={() => notify('Customer removal is disabled in this demo')} aria-label={`Remove ${c.name}`}>
                          <Trash size={15} />
                        </button>
                        <button className="icon-btn-sm" aria-label={`More actions for ${c.name}`}>
                          <Dots size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card admin-panel">
        <h2>Wishlist activity</h2>
        <p className="sub">Products your customers save most often — a strong signal of future demand.</p>
        <div className="three-col">
          {products.slice(0, 3).map((p) => (
            <Link className="collection-chip" key={p.id} to={`/admin/products/${p.id}`}>
              <img className="thumb-sm" src={p.image} alt="" />
              <span>
                <b>{p.name}</b>
                <small>{p.reviews} saves this month</small>
              </span>
              <Heart size={15} />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
