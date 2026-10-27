import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { RevenueChart } from './Dashboard'
import { ArrowRight, Chart, Bag, Users, Sparkle } from '../../components/Icons'
import { money } from '../../data/products'
import '../../styles/admin.css'

export default function Analytics() {
  const { products, orders, customers } = useStore()
  const [mode, setMode] = useState('revenue')

  const revenueSeries = useMemo(() => [2400, 3100, 2750, 3600, 3300, 4100, 3900, 4600, 4250, 5100, 4700, 5450, 5200, 6100, 5850], [])
  const orderSeries = useMemo(() => [180, 210, 195, 240, 225, 268, 250, 300, 285, 330, 315, 355, 340, 380, 365], [])

  const revenue = orders.reduce((s, o) => s + o.total, 0)
  const aov = orders.length ? revenue / orders.length : 0

  const byCategory = useMemo(() => {
    const map = {}
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + p.reviews
    })
    const max = Math.max(...Object.values(map), 1)
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, v]) => ({ name, value: v, pct: Math.round((v / max) * 100) }))
  }, [products])

  const topProducts = useMemo(() => [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5), [products])

  const sources = [
    ['Organic search', 44],
    ['Direct', 26],
    ['Instagram', 16],
    ['Email campaigns', 9],
    ['Referral', 5],
  ]

  const metrics = [
    [<Chart size={20} key="a" />, 'Total Revenue', money(revenue), '+18% vs last month'],
    [<Bag size={20} key="b" />, 'Orders', String(orders.length), '+12% vs last month'],
    [<Sparkle size={20} key="c" />, 'Avg. Order Value', money(aov), '+5% vs last month'],
    [<Users size={20} key="d" />, 'Customers', String(customers.length), '+14% vs last month'],
  ]

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Analytics</h1>
          <p>A clear view of your local orders, catalog and illustrative performance trends.</p>
        </div>
        <div className="admin-tools">
          <select className="select sm" defaultValue="30" aria-label="Date range">
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last 12 months</option>
          </select>
          <Link className="link-more" to="/admin/orders">
            View Orders <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="kpi-row">
        {metrics.map(([icon, label, value, delta]) => (
          <article className="card kpi" key={label}>
            <span className="ic">{icon}</span>
            <span className="body">
              <small>{label}</small>
              <b>{value}</b>
              <em>↗ {delta}</em>
            </span>
          </article>
        ))}
      </div>

      <section className="card chart-card">
        <header className="card-head">
          <div>
            <h2>Revenue &amp; Orders</h2>
            <p>Performance trend over the selected period.</p>
          </div>
          <div className="card-actions">
            <div className="seg">
              <button className={mode === 'revenue' ? 'on' : ''} onClick={() => setMode('revenue')}>
                Revenue
              </button>
              <button className={mode === 'orders' ? 'on' : ''} onClick={() => setMode('orders')}>
                Orders
              </button>
            </div>
          </div>
        </header>
        <RevenueChart revenue={mode === 'revenue' ? revenueSeries : orderSeries} orders={orderSeries} />
      </section>

      <div className="two-col">
        <section className="card admin-panel">
          <h2>Revenue by category</h2>
          <p className="sub">Based on engagement across your catalog.</p>
          <div className="bar-list">
            {byCategory.map((c) => (
              <div className="bar-row" key={c.name}>
                <span className="lbl">
                  <span>{c.name}</span>
                  <span>{c.value} signals</span>
                </span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: `${c.pct}%` }} />
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="card admin-panel">
          <h2>Traffic sources</h2>
          <p className="sub">Where your shoppers come from.</p>
          <div className="bar-list">
            {sources.map(([name, pct]) => (
              <div className="bar-row" key={name}>
                <span className="lbl">
                  <span>{name}</span>
                  <span>{pct}%</span>
                </span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: `${pct}%` }} />
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="card table-card">
        <header className="card-head">
          <div>
            <h2>Top performing products</h2>
            <p>Ranked by customer reviews and demand signals.</p>
          </div>
          <Link className="link-more" to="/admin/products">
            View All Products <ArrowRight size={14} />
          </Link>
        </header>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Reviews</th>
                <th>Est. Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="cell-product">
                      <img className="thumb-sm" src={p.image} alt="" />
                      <b>{p.name}</b>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td>{money(p.price)}</td>
                  <td>{p.reviews}</td>
                  <td className="strong">{money(Math.round(p.reviews / 2) * p.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
