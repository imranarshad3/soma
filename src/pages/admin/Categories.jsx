import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { Dots, Layers, Leaf, Plus, Search, Trash, PackageIcon } from '../../components/Icons'
import { CATEGORIES } from '../../data/products'
import '../../styles/admin.css'

const DESCRIPTIONS = {
  Serums: 'Concentrated actives for targeted results.',
  Moisturizers: 'Daily and nightly hydration for every skin type.',
  Cleansers: 'Gentle washes, foams and micellar waters.',
  Toners: 'Alcohol-free toners that rebalance and refresh.',
  'Skincare Sets': 'Curated routines and gift-ready collections.',
  'Body Care': 'Body lotions, balms and nourishing treatments.',
}

export default function Categories() {
  const { products, notify } = useStore()
  const [q, setQ] = useState('')
  const [name, setName] = useState('')

  const rows = useMemo(() => {
    const all = CATEGORIES.map((c, i) => ({
      id: `cat-${i}`,
      name: c,
      description: DESCRIPTIONS[c] || '',
      count: products.filter((p) => p.category === c).length,
      image: products.find((p) => p.category === c)?.image || '/images/set-complete.webp',
      status: i === 4 ? 'Draft' : 'Active',
    }))
    const t = q.trim().toLowerCase()
    return t ? all.filter((r) => r.name.toLowerCase().includes(t)) : all
  }, [products, q])

  const total = products.length

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Categories</h1>
          <p>Organize your catalog into browsable collections.</p>
        </div>
        <div className="admin-tools">
          <label className="admin-search-input">
            <Search size={16} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search categories..." aria-label="Search categories" />
          </label>
        </div>
      </div>

      <div className="three-col">
        <article className="card metric-card">
          <small>Total Categories</small>
          <b>{CATEGORIES.length}</b>
          <em>↗ +1 this quarter</em>
        </article>
        <article className="card metric-card">
          <small>Products categorised</small>
          <b>{total}</b>
          <em>100% covered</em>
        </article>
        <article className="card metric-card">
          <small>Draft categories</small>
          <b>{rows.filter((r) => r.status === 'Draft').length}</b>
          <em>Hidden from storefront</em>
        </article>
      </div>

      <section className="card table-card">
        <header className="card-head">
          <div>
            <h2>All Categories</h2>
            <p>Create, rename and organise the collections shown in your shop filters.</p>
          </div>
        </header>

        <div className="admin-tools" style={{ padding: '12px 24px 4px' }}>
          <input
            className="input"
            style={{ maxWidth: 320 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New category name"
            aria-label="New category name"
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              if (!name.trim()) return notify('Enter a category name first')
              notify(`“${name.trim()}” queued for creation (demo catalog is read-only)`)
              setName('')
            }}
          >
            <Plus size={15} /> Add Category
          </button>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Products</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="cell-product">
                      <img className="thumb-sm" src={r.image} alt="" />
                      <b>{r.name}</b>
                    </div>
                  </td>
                  <td className="muted">{r.description}</td>
                  <td>
                    <Link to={`/shop?category=${encodeURIComponent(r.name)}`}>{r.count}</Link>
                  </td>
                  <td>
                    <span className={`badge ${r.status.toLowerCase()}`}>{r.status}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn-sm" aria-label={`Edit ${r.name}`} onClick={() => notify(`Editing ${r.name} (demo)`)}>
                        <Leaf size={15} />
                      </button>
                      <button className="icon-btn-sm danger" aria-label={`Delete ${r.name}`} onClick={() => notify('Categories with products cannot be deleted')}>
                        <Trash size={15} />
                      </button>
                      <button className="icon-btn-sm" aria-label={`More actions for ${r.name}`}>
                        <Dots size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card admin-panel">
        <h2>Collections on the storefront</h2>
        <p className="sub">These categories appear as the shop filter rail and the home page category tiles.</p>
        <div className="three-col">
          {CATEGORIES.map((c) => (
            <div className="collection-chip" key={c}>
              <Layers size={17} />
              <span>
                <b>{c}</b>
                <small>{products.filter((p) => p.category === c).length} products</small>
              </span>
              <PackageIcon size={15} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
