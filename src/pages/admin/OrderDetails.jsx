import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { ArrowLeft, CheckCircle, CreditCard, Leaf, Mail, MapPin, PackageIcon, Truck, Users, Print } from '../../components/Icons'
import { money } from '../../data/products'
import '../../styles/admin.css'

const FLOW = ['Processing', 'Shipped', 'Delivered']

export default function OrderDetails() {
  const { id } = useParams()
  const { orders, products, setOrders, notify } = useStore()
  const navigate = useNavigate()
  const order = orders.find((o) => o.id === id)

  if (!order) {
    return (
      <div className="card admin-panel">
        <h2>Order not found</h2>
        <p className="sub">This order id does not exist in the current session.</p>
        <Link className="btn btn-primary" to="/admin/orders">
          Back to Orders
        </Link>
      </div>
    )
  }

  const lines = products.slice(0, Math.max(1, Math.min(3, order.items)))
  const shipping = order.total >= 50 ? 0 : 6.95
  const stageIndex = FLOW.indexOf(order.status)

  const setStatus = (status) => {
    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)))
    notify(`${order.id} updated to ${status}`)
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <button className="back-mini" onClick={() => navigate('/admin/orders')}>
            <ArrowLeft size={14} /> Back to Orders
          </button>
          <h1>
            Order #{order.id} <span className={`badge ${order.status.toLowerCase()}`}>{order.status}</span>
          </h1>
          <p>Placed on {order.date} • {order.items} items • {money(order.total)}</p>
        </div>
        <div className="admin-tools">
          <button className="btn btn-outline btn-sm" onClick={() => window.print()}>
            <Print size={15} /> Print Packing Slip
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => notify('Customer notified by email')}>
            <Mail size={15} /> Notify Customer
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setStatus('Delivered')}>
            Mark as Delivered
          </button>
        </div>
      </div>

      <div className="two-col">
        <div className="editor-main">
          <section className="card admin-panel">
            <h2>Items in this order</h2>
            <p className="sub">Picked and packed by the SOMA fulfilment team.</p>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="cell-product">
                          <img className="thumb-sm" src={p.image} alt="" />
                          <span>
                            <b>{p.name}</b>
                            <small>{p.category}</small>
                          </span>
                        </div>
                      </td>
                      <td>{p.sizes?.[0]}</td>
                      <td>1</td>
                      <td className="strong">{money(p.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <dl className="totals-list">
              <div>
                <dt>Subtotal</dt>
                <dd>{money(order.total)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : money(shipping)}</dd>
              </div>
              <div>
                <dt>Tax</dt>
                <dd>{money(0)}</dd>
              </div>
              <div className="grand">
                <dt>Total</dt>
                <dd>{money(order.total + shipping)}</dd>
              </div>
            </dl>
          </section>

          <section className="card admin-panel">
            <h2>Fulfilment status</h2>
            <p className="sub">Moving an order forward updates the customer tracking page immediately.</p>
            <div className="fulfil-flow">
              {FLOW.map((s, i) => (
                <button
                  key={s}
                  className={order.status === s ? 'on' : i < stageIndex ? 'done' : ''}
                  onClick={() => setStatus(s)}
                >
                  <CheckCircle size={15} /> {s}
                </button>
              ))}
              <button
                className={order.status === 'Cancelled' ? 'on cancel' : ''}
                onClick={() => setStatus('Cancelled')}
              >
                Cancel Order
              </button>
            </div>
          </section>
        </div>

        <aside className="editor-side">
          <section className="card admin-panel">
            <h3>Customer</h3>
            <div className="cell-product" style={{ marginBottom: 14 }}>
              <span className="mini-avatar lg">{order.customer.charAt(0)}</span>
              <span>
                <b>{order.customer}</b>
                <small>{order.email}</small>
              </span>
            </div>
            <ul className="info-lines">
              <li>
                <MapPin size={15} /> {order.address}
              </li>
              <li>
                <Users size={15} /> {order.items} items in this order
              </li>
            </ul>
          </section>

          <section className="card admin-panel">
            <h3>Payment</h3>
            <ul className="info-lines">
              <li>
                <CreditCard size={15} /> {order.payment}
              </li>
              <li>
                <Truck size={15} /> {shipping === 0 ? 'Free standard shipping' : 'Paid shipping'}
              </li>
              <li>
                <PackageIcon size={15} /> {order.status}
              </li>
            </ul>
            <dl className="totals-list">
              <div className="grand">
                <dt>Paid</dt>
                <dd>{money(order.total + shipping)}</dd>
              </div>
            </dl>
          </section>

          <section className="card admin-panel">
            <h3>Notes</h3>
            <textarea
              className="textarea"
              aria-label="Internal order note"
              placeholder="Internal note about this order..."
              defaultValue="Gift wrap requested — include the sample sachets."
            />
            <button className="btn btn-outline btn-sm btn-block" style={{ marginTop: 12 }} onClick={() => notify('Note saved')}>
              <Leaf size={14} /> Save Note
            </button>
          </section>
        </aside>
      </div>
    </>
  )
}
