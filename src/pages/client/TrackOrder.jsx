import React, { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Newsletter } from '../../components/Shell'
import { ArrowLeft, ArrowRight, Check, Headset, Leaf, MessageChat, PackageIcon, Truck, Mail } from '../../components/Icons'
import { useStore } from '../../store/StoreContext'
import { money } from '../../data/products'
import '../../styles/track.css'

const DEMO = {
  id: 'SOMA123456',
  status: 'In Transit',
  placed: 'Apr 12, 2026',
  items: 3,
  total: 94,
  customer: 'Imran Arshad',
  address: '123 Green Valley Street, DHA Phase 7, Lahore 54000, Pakistan',
  phone: '+92 300 1234567',
  payment: 'Visa •••• 4242',
  lines: [
    { name: 'Radiant Glow Face Serum', size: '30 ml', qty: 1, price: 34, image: '/images/serum-premium.webp' },
    { name: 'Hydrating Day Cream', size: '50 ml', qty: 1, price: 32, image: '/images/cream-premium.webp' },
    { name: 'Gentle Foaming Cleanser', size: '100 ml', qty: 1, price: 28, image: '/images/cleanser-premium.webp' },
  ],
}

const STAGES = [
  ['Order Placed', 'Apr 12, 2026', '10:24 AM'],
  ['Confirmed', 'Apr 12, 2026', '1:10 PM'],
  ['Packed', 'Apr 13, 2026', '9:20 AM'],
  ['In Transit', 'Apr 14, 2026', '4:30 PM'],
  ['Out for Delivery', 'Expected', 'Apr 16, 2026'],
  ['Delivered', 'Expected', 'Apr 16, 2026'],
]

const EVENTS = [
  ['Arrived at Sort Facility', 'Lahore, Pakistan', 'Apr 14, 2026 • 4:30 PM'],
  ['Departed from Warehouse', 'Lahore, Pakistan', 'Apr 13, 2026 • 10:15 AM'],
  ['Order Packed', 'Lahore, Pakistan', 'Apr 13, 2026 • 9:20 AM'],
  ['Order Confirmed', 'Lahore, Pakistan', 'Apr 12, 2026 • 1:10 PM'],
  ['Order Placed', 'Lahore, Pakistan', 'Apr 12, 2026 • 10:24 AM'],
]

const ACTIVE_STAGE = 3

export default function TrackOrder() {
  const { orders, products } = useStore()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)

  const tracked = useMemo(() => {
    const id = params.get('id')
    if (!id) return null
    const found = orders.find((o) => o.id.toLowerCase() === id.toLowerCase())
    if (!found) return null
    return {
      id: found.id,
      status: found.status,
      placed: found.date,
      items: found.items,
      total: found.total,
      customer: found.customer,
      address: found.address,
      phone: '—',
      payment: found.payment,
      lines: products.slice(0, Math.max(1, Math.min(3, found.items))).map((p) => ({
        name: p.name,
        size: p.sizes?.[0],
        qty: 1,
        price: p.price,
        image: p.image,
      })),
      real: true,
    }
  }, [params, orders, products])

  const order = tracked || DEMO

  const submit = (e) => {
    e.preventDefault()
    setSearched(true)
    const id = query.trim().toUpperCase().replace(/^#/, '')
    const found = orders.find((o) => o.id.toUpperCase() === id || o.id.toUpperCase() === `SO-${id}`)
    setParams(found ? { id: found.id } : {})
  }

  const stageIndex = tracked && order.status === 'Delivered' ? 5 : order.status === 'Processing' ? 1 : ACTIVE_STAGE

  return (
    <>
      <section className="track-hero editorial-hero">
        <img className="editorial-hero-image" src="/images/night-premium.webp" alt="SOMA organic skincare essentials" fetchpriority="high" />
        <div className="track-hero-bg" aria-hidden="true" />
        <span className="script" aria-hidden="true">
          Pure
          <br />
          Beauty
          <br />
          In Every
          <br />
          Delivery
        </span>
        <div className="container track-hero-inner">
          <p className="eyebrow">Order Tracking</p>
          <h1>Track Your Order</h1>
          <p className="lead">
            Follow your order journey, from our hands to yours.
            <br />
            Natural goodness is on the way!
          </p>

          <form className="track-search" onSubmit={submit}>
            <span className="ic" aria-hidden="true">
              <Truck size={22} />
            </span>
            <span className="fields">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your order number"
                aria-label="Order number"
              />
              <small>Example: SOMA123456</small>
            </span>
            <button className="btn btn-primary" type="submit">
              Track Order <ArrowRight size={16} />
            </button>
          </form>
          {searched && !tracked && (
            <p className="track-hint">
              Showing the latest SOMA shipment. Use the order id from your confirmation email (for example SO-1028).
            </p>
          )}
        </div>
      </section>

      <section className="track-main"><div className="container"><p className="demo-notice">{tracked ? "Local order preview. Carrier tracking is not connected." : "Example shipment — this is demonstration data, not a live order."}</p></div>
        <div className="container">
          <Link className="back-link" to="/account">
            <ArrowLeft size={15} /> Back to Orders
          </Link>

          <div className="track-head">
            <div>
              <h2>
                Order #{order.id} <span className="status">{order.status}</span>
              </h2>
              <p>
                Placed on {order.placed} <span className="dot">•</span> {order.items} items{' '}
                <span className="dot">•</span> {money(order.total)}
              </p>
            </div>
            <button className="btn btn-outline" type="button">
              <MessageChat size={16} /> Get Updates on WhatsApp
            </button>
          </div>

          <ol className="track-steps">
            {STAGES.map(([label, a, b], i) => (
              <li key={label} className={i < stageIndex ? 'done' : i === stageIndex ? 'now' : ''}>
                <span className="dot">{i <= stageIndex ? <Check size={14} /> : <PackageIcon size={14} />}</span>
                <b>{label}</b>
                <small>{a}</small>
                <small>{b}</small>
              </li>
            ))}
          </ol>

          <div className="track-grid">
            <div className="track-left">
              <section className="card panel">
                <div className="panel-head">
                  <span className="ic">
                    <Truck size={22} />
                  </span>
                  <div>
                    <h3>Your order is {order.status.toLowerCase()}</h3>
                    <p>
                      {order.status === 'Delivered'
                        ? 'Your package has arrived. We hope your skin loves it.'
                        : 'Your package has left our warehouse and is on its way to you.'}
                    </p>
                  </div>
                </div>
                <ul className="timeline">
                  {EVENTS.map(([title, place, when], i) => (
                    <li key={title} className={i === 0 ? 'now' : ''}>
                      <span className="bullet" aria-hidden="true" />
                      <span>
                        <b>{title}</b>
                        <small>{place}</small>
                      </span>
                      <em>{when}</em>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="card panel">
                <h3>Items in This Order</h3>
                <ul className="track-items">
                  {order.lines.map((l) => (
                    <li key={l.name}>
                      <img src={l.image} alt="" />
                      <span>
                        <b>{l.name}</b>
                        <small>{l.size}</small>
                      </span>
                      <em>
                        Qty: {l.qty}
                        <strong>{money(l.price)}</strong>
                      </em>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="track-right">
              <section className="card panel map-panel">
                <div className="map" aria-hidden="true">
                  <span className="route" />
                  <span className="pin p1">Lahore</span>
                  <span className="pin p2">Islamabad</span>
                  <span className="pin p3">Karachi</span>
                  <span className="truck-chip">
                    <Truck size={15} /> In Transit
                    <small>Lahore, Pakistan</small>
                  </span>
                </div>
                <div className="eta">
                  <span className="ic">
                    <PackageIcon size={20} />
                  </span>
                  <span>
                    <small>Estimated Delivery</small>
                    <b>Apr 16, 2026</b>
                    <em>We’ll keep you updated at every step.</em>
                  </span>
                  <span className="pill">2 Days Left</span>
                </div>
              </section>

              <section className="card panel">
                <div className="panel-title">
                  <h3>Shipping Details</h3>
                  <button type="button">Edit</button>
                </div>
                <p className="detail-strong">{order.customer}</p>
                <p className="detail">{order.address}</p>
                <p className="detail">{order.phone}</p>
              </section>

              <section className="card panel">
                <h3>Payment Details</h3>
                <div className="pay-line">
                  <span>Payment Method</span>
                  <span>{order.payment}</span>
                </div>
                <dl className="pay-totals">
                  <div>
                    <dt>Subtotal</dt>
                    <dd>{money(order.total)}</dd>
                  </div>
                  <div>
                    <dt>Shipping</dt>
                    <dd>Free</dd>
                  </div>
                  <div className="grand">
                    <dt>Total</dt>
                    <dd>{money(order.total)}</dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>

          <section className="help card">
            <div>
              <h3>Need Help?</h3>
              <p>Our support team is here for you.</p>
            </div>
            <div className="help-actions">
              <Link className="btn btn-outline" to="/contact">
                <Headset size={16} /> Contact Support
              </Link>
              <button className="btn btn-outline" type="button">
                <MessageChat size={16} /> Chat on WhatsApp
              </button>
              <Link className="btn btn-outline" to="/contact">
                <Mail size={16} /> Email Us
              </Link>
            </div>
          </section>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
