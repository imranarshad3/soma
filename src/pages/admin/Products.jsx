import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { Box, EditIcon, PackageIcon, Plus, Search, Trash, Eye } from '../../components/Icons'
import { CATEGORIES, money } from '../../data/products'
import '../../styles/admin.css'

const STATUSES = ['All Status', 'Active', 'Draft', 'Coming Soon']
const STOCKS = ['All Stock Levels', 'In Stock', 'Low Stock', 'Out of Stock']
const SORTS = [['newest', 'Newest'], ['price-asc', 'Price: Low'], ['price-desc', 'Price: High'], ['name', 'Name A–Z']]

const statusOf = (p) => ['Active', 'Draft', 'Coming Soon'].includes(p.status) ? p.status : 'Active'

export default function Products() {
  const { products, productViews, upsertProduct, removeProduct, notify } = useStore()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All Categories')
  const [status, setStatus] = useState('All Status')
  const [stock, setStock] = useState('All Stock Levels')
  const [sort, setSort] = useState('newest')

  const rows = useMemo(() => {
    let list = products.filter((p) => {
      const t = q.trim().toLowerCase()
      if (t && !(p.name + p.category + p.tagline).toLowerCase().includes(t)) return false
      if (cat !== 'All Categories' && p.category !== cat) return false
      if (status !== 'All Status' && statusOf(p) !== status) return false
      if (stock === 'In Stock' && p.stock <= 25) return false
      if (stock === 'Low Stock' && !(p.stock > 0 && p.stock <= 25)) return false
      if (stock === 'Out of Stock' && p.stock !== 0) return false
      return true
    })
    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name),
      newest: () => 0,
    }
    return [...list].sort(sorters[sort])
  }, [products, q, cat, status, stock, sort])

  const counts = {
    total: products.length,
    active: products.filter((p) => statusOf(p) === 'Active').length,
    low: products.filter((p) => p.stock > 0 && p.stock <= 25).length,
    out: products.filter((p) => p.stock === 0).length,
  }

  const stats = [
    [<PackageIcon size={20} key="a" />, 'Total products', counts.total],
    [<Eye size={20} key="b" />, 'Active', counts.active],
    [<Box size={20} key="c" />, 'Low stock', counts.low],
    [<Trash size={20} key="d" />, 'Out of stock', counts.out],
  ]


  return (
    <div className="admin-products">
      <header className="admin-head products-head">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Products</h1>
          <p>Manage product details, pricing, and inventory in one place.</p>
        </div>
        <Link className="btn btn-primary" to="/admin/products/new"><Plus size={17} /> Add product</Link>
      </header>

      <div className="kpi-row">
        {stats.map(([icon, label, value]) => (
          <article className="card kpi" key={label}>
            <span className="ic">{icon}</span>
            <span className="body">
              <small>{label}</small>
              <b>{value}</b>
            </span>
          </article>
        ))}
      </div>

      <section className="card table-card">
        <header className="card-head products-card-head">
          <div>
            <h2>Product catalog <span>{rows.length} shown</span></h2>
            <p>Search and filter your catalog. Views count product-page visits in this browser.</p>
          </div>
        </header>

        <div className="admin-tools products-toolbar">
          <label className="admin-search-input">
            <Search size={16} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products by name..."
              aria-label="Search products"
            />
          </label>
          <select className="select sm" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category">
            <option>All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select className="select sm" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select className="select sm" value={stock} onChange={(e) => setStock(e.target.value)} aria-label="Stock level">
            {STOCKS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select className="select sm" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
            {SORTS.map(([v, l]) => (
              <option key={v} value={v}>
                Sort by: {l}
              </option>
            ))}
          </select>
        </div>

        {rows.length === 0 ? (
          <p className="empty">No products match those filters.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Views</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => {
                  const st = statusOf(p)
                  return (
                    <tr key={p.id}>
                      <td>
                        <div className="cell-product">
                          <img className="thumb-sm" src={p.image} alt="" />
                          <span>
                            <b>{p.name}</b>
                            <small>{p.tagline}</small>
                          </span>
                        </div>
                      </td>
                      <td className="muted">{(Number(productViews[p.id]) || 0).toLocaleString()}</td>
                      <td className="strong">{money(p.price)}</td>
                      <td>{p.stock}</td>
                      <td>
                        <select className={`select sm product-status ${st.toLowerCase().replace(/\s/g, '')}`} value={st} aria-label={`Status for ${p.name}`} onChange={(event) => {
                          upsertProduct({ id: p.id, status: event.target.value })
                          notify(`${p.name}: ${event.target.value}`)
                        }}>
                          {STATUSES.slice(1).map((value) => <option key={value}>{value}</option>)}
                        </select>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="icon-btn-sm"
                            onClick={() => navigate(`/admin/products/${p.id}`)}
                            aria-label={`Edit ${p.name}`}
                          >
                            <EditIcon size={17} />
                          </button>
                          <button
                            className="icon-btn-sm danger"
                            onClick={() => {
                              removeProduct(p.id)
                              notify(`${p.name} removed`)
                            }}
                            aria-label={`Delete ${p.name}`}
                          >
                            <Trash size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
