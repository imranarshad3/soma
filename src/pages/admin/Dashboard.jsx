import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { ArrowRight, Bag, Cart, Chart, Dots, Leaf, PackageIcon, Users } from '../../components/Icons'
import { money } from '../../data/products'
import '../../styles/admin.css'

export function RevenueChart({ revenue, orders }) {
  const [hover, setHover] = useState(null)
  const max = Math.max(...revenue, 1)
  const w = 640
  const h = 190
  const step = w / revenue.length
  const linePts = revenue
    .map((v, i) => `${(i + 0.5) * step},${h - (v / max) * (h - 26)}`)
    .join(' ')
  const orderMax = Math.max(...orders, 1)
  const line2 = orders
    .map((v, i) => `${(i + 0.5) * step},${h - (v / orderMax) * (h - 46)}`)
    .join(' ')

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${w} ${h + 24}`} role="img" aria-label="Revenue and orders over the last 30 days">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="0" x2={w} y1={(i * (h - 26)) / 4 + 6} y2={(i * (h - 26)) / 4 + 6} stroke="#eceae2" strokeWidth="1" />
        ))}
        {revenue.map((v, i) => {
          const bh = (v / max) * (h - 26)
          return (
            <rect
              key={i}
              x={i * step + step * 0.24}
              y={h - bh + 6}
              width={step * 0.52}
              height={Math.max(bh, 2)}
              rx="4"
              fill={hover === i ? '#163c2a' : '#c3d2b8'}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
          )
        })}
        <polyline points={linePts} fill="none" stroke="#163c2a" strokeWidth="2" strokeLinejoin="round" />
        <polyline points={line2} fill="none" stroke="#c7b89b" strokeWidth="2" strokeDasharray="5 5" />
        {revenue.map((v, i) => (
          <circle key={i} cx={(i + 0.5) * step} cy={h - (v / max) * (h - 26) + 6} r="3" fill="#163c2a" />
        ))}
        {['Apr 1', 'Apr 5', 'Apr 10', 'Apr 15', 'Apr 20', 'Apr 25', 'Apr 30'].map((t, i) => (
          <text key={t} x={(i * w) / 6} y={h + 20} fontSize="10" fill="#8b8f86" textAnchor={i === 0 ? 'start' : i === 6 ? 'end' : 'middle'}>
            {t}
          </text>
        ))}
      </svg>
      {hover !== null && (
        <div className="chart-tip" style={{ left: `${((hover + 0.5) / revenue.length) * 100}%` }}>
          <b>Apr {hover + 1}, 2026</b>
          <span>Revenue: {money(revenue[hover])}</span>
          <span>Orders: {orders[hover]}</span>
        </div>
      )}
      <div className="chart-legend">
        <span><i className="dot green" /> Revenue (PKR)</span>
        <span><i className="dot gold" /> Orders</span>
      </div>
    </div>
  )
}

const KPIS = [
  [<Bag size={20} key="a" />, 'Total Orders', 'orders'],
  [<Chart size={20} key="b" />, 'Total Revenue', 'revenue'],
  [<Users size={20} key="c" />, 'Total Customers', 'customers'],
  [<PackageIcon size={20} key="d" />, 'Total Products', 'products'],
]

const DELTAS = ['+12%', '+18%', '+14%', '+4%']

export default function Dashboard() {
  const { products, orders, customers } = useStore()
  const [mode, setMode] = useState('revenue')

  const revenue = useMemo(() => [2400, 3100, 2750, 3600, 3300, 4100, 3900, 4600, 4250, 5100, 4700, 5450, 5200, 6100, 5850], [])
  const orderSeries = useMemo(() => [180, 210, 195, 240, 225, 268, 250, 300, 285, 330, 315, 355, 340, 380, 365], [])

  const kpiValues = {
    orders: orders.length,
    revenue: money(orders.reduce((s, o) => s + o.total, 0)),
    customers: customers.length,
    products: products.length,
  }

  const topProducts = useMemo(
    () => [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4),
    [products]
  )

  const topStats = {
    'Radiant Glow Face Serum': [342, 11628],
    'Hydrating Day Cream': [286, 9152],
    'Gentle Foaming Cleanser': [241, 6748],
    'Detox Face Mask': [198, 5346],
  }

  return (
    <>
      <section className="admin-hero">
        <div className="admin-hero-bg" aria-hidden="true" />
        <span className="script" aria-hidden="true">Pure Progress Naturally</span>
        <div className="admin-hero-copy">
          <p className="eyebrow">Welcome Back</p>
          <h1>
            Good Morning,
            <br />
            Soma Admin <Leaf size={24} />
          </h1>
          <p>
            Here’s what’s happening with your natural beauty brand today. Keep creating a healthier, more radiant
            tomorrow.
          </p>
        </div>
      </section>

      <div className="kpi-row">
        {KPIS.map(([icon, label, key], i) => (
          <article className="card kpi" key={label}>
            <span className="ic">{icon}</span>
            <span className="body">
              <small>{label}</small>
              <b>{kpiValues[key]}</b>
              <em>
                ↗ {DELTAS[i]} <span>vs last month</span>
              </em>
            </span>
          </article>
        ))}
      </div>

      <div className="dash-grid">
        <section className="card chart-card">
          <header className="card-head">
            <div>
              <h2>Revenue &amp; Orders</h2>
              <p>Track your store’s performance over time.</p>
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
              <select className="select sm" defaultValue="30" aria-label="Date range">
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last 12 months</option>
              </select>
            </div>
          </header>
          <RevenueChart revenue={mode === 'revenue' ? revenue : orderSeries} orders={orderSeries} />
        </section>

        <section className="card">
          <header className="card-head">
            <h2>Top Products</h2>
            <Link className="link-more" to="/admin/products">
              View All Products <ArrowRight size={14} />
            </Link>
          </header>
          <ul className="top-list">
            {topProducts.map((p) => {
              const stat = topStats[p.name] || [Math.round(p.reviews / 2), Math.round((p.reviews / 2) * p.price)]
              return (
                <li key={p.id}>
                  <img src={p.image} alt="" />
                  <span className="nm">
                    <b>{p.name}</b>
                    <small>{p.category}</small>
                  </span>
                  <span className="num">
                    <b>{stat[0]}</b>
                    <small>sold</small>
                  </span>
                  <span className="num right">
                    <b>{money(stat[1])}</b>
                    <small>revenue</small>
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <section className="card table-card">
        <header className="card-head">
          <div>
            <h2>Recent Orders</h2>
            <p>A quick look at your latest customer orders.</p>
          </div>
          <Link className="link-more" to="/admin/orders">
            View All Orders <ArrowRight size={14} />
          </Link>
        </header>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id}>
                  <td>
                    <Link to={`/admin/orders/${o.id}`}>#{o.id}</Link>
                  </td>
                  <td>{o.customer}</td>
                  <td>
                    <span className="mini-thumbs">
                      {[0, 1, 2].map((i) => (
                        <img key={i} src={products[(i * 3) % products.length].image} alt="" />
                      ))}
                    </span>
                  </td>
                  <td className="strong">{money(o.total)}</td>
                  <td>
                    <span className={`badge ${o.status.toLowerCase()}`}>{o.status}</span>
                  </td>
                  <td className="muted">{o.date}</td>
                  <td>
                    <button className="ghost-btn" aria-label={`Actions for ${o.id}`}>
                      <Dots size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
