import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { CheckCircle, CreditCard, Globe, Leaf, Mail, Truck, Bell, Shield, Trash } from '../../components/Icons'
import '../../styles/admin.css'

const readSettings = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback } }

export default function Settings() {
  const { notify } = useStore()
  const [store, setStore] = useState(() => readSettings('soma.admin.storeSettings', {
    name: 'SOMA Organic',
    email: 'hello@somaorganic.com',
    phone: '+1 (555) 012-3456',
    currency: 'PKR — Pakistani Rupee',
    timezone: '(GMT+05:00) Karachi',
    address: '24 Willow Lane, Portland, OR 97205',
  }))
  const [toggles, setToggles] = useState(() => readSettings('soma.admin.preferenceSettings', {
    orderEmails: true,
    lowStock: true,
    newsletter: true,
    reviews: false,
    twoFactor: true,
    guestCheckout: true,
  }))

  const set = (k) => (e) => setStore((s) => ({ ...s, [k]: e.target.value }))
  const flip = (k) => setToggles((t) => ({ ...t, [k]: !t[k] }))

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Settings</h1>
          <p>Store profile, notifications, shipping, payments and security.</p>
        </div>
        <div className="admin-tools">
          <Link className="btn btn-outline btn-sm" to="/">
            View Store
          </Link>
          <button className="btn btn-primary btn-sm" onClick={() => { try { localStorage.setItem('soma.admin.storeSettings', JSON.stringify(store)); localStorage.setItem('soma.admin.preferenceSettings', JSON.stringify(toggles)); notify('Store profile and preferences saved in this browser') } catch { notify('Unable to save settings in this browser') } }}>
            Save Changes
          </button>
        </div>
      </div>

      <div className="two-col">
        <div className="editor-main">
          <section className="card admin-panel">
            <h2>Store Profile</h2>
            <p className="sub">Store identity for this local workspace. This does not update live receipts or email services.</p>
            <div className="form-2">
              <div className="field">
                <label htmlFor="s-name">Store name</label>
                <input id="s-name" className="input" value={store.name} onChange={set('name')} />
              </div>
              <div className="field">
                <label htmlFor="s-email">Support email</label>
                <input id="s-email" className="input" value={store.email} onChange={set('email')} />
              </div>
              <div className="field">
                <label htmlFor="s-phone">Support phone</label>
                <input id="s-phone" className="input" value={store.phone} onChange={set('phone')} />
              </div>
              <div className="field">
                <label htmlFor="s-addr">Business address</label>
                <input id="s-addr" className="input" value={store.address} onChange={set('address')} />
              </div>
              <div className="field">
                <label htmlFor="s-cur">Currency</label>
                <select id="s-cur" className="select" value={store.currency} onChange={set('currency')}>
                  <option>USD — US Dollar</option>
                  <option>EUR — Euro</option>
                  <option>GBP — British Pound</option>
                  <option>PKR — Pakistani Rupee</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="s-tz">Timezone</label>
                <select id="s-tz" className="select" value={store.timezone} onChange={set('timezone')}>
                  <option>(GMT-08:00) Pacific Time</option>
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT+00:00) London</option>
                  <option>(GMT+05:00) Karachi</option>
                </select>
              </div>
            </div>
          </section>

          <section className="card admin-panel">
            <h2>Notifications</h2>
            <p className="sub">Choose what the team and customers get told about.</p>
            <div className="switch-row">
              <span>
                <b>Order confirmation emails</b>
                <small>Sent to customers as soon as an order is placed.</small>
              </span>
              <input type="checkbox" role="switch" checked={toggles.orderEmails} onChange={() => flip('orderEmails')} aria-label="Order confirmation emails" />
            </div>
            <div className="switch-row">
              <span>
                <b>Low stock alerts</b>
                <small>Warn the team when a product drops below 25 units.</small>
              </span>
              <input type="checkbox" role="switch" checked={toggles.lowStock} onChange={() => flip('lowStock')} aria-label="Low stock alerts" />
            </div>
            <div className="switch-row">
              <span>
                <b>Weekly newsletter digest</b>
                <small>Automated campaign to subscribed customers.</small>
              </span>
              <input type="checkbox" role="switch" checked={toggles.newsletter} onChange={() => flip('newsletter')} aria-label="Weekly newsletter" />
            </div>
            <div className="switch-row">
              <span>
                <b>Review request emails</b>
                <small>Sent 14 days after delivery.</small>
              </span>
              <input type="checkbox" role="switch" checked={toggles.reviews} onChange={() => flip('reviews')} aria-label="Review request emails" />
            </div>
          </section>

          <section className="card admin-panel">
            <h2>Shipping &amp; Tax</h2>
            <p className="sub">Illustrative shipping values. Checkout integration is not connected.</p>
            <div className="form-3">
              <div className="field">
                <label htmlFor="s-free">Free shipping over</label>
                <input id="s-free" className="input" defaultValue="50" type="number" />
              </div>
              <div className="field">
                <label htmlFor="s-rate">Standard rate</label>
                <input id="s-rate" className="input" defaultValue="6.95" type="number" step="0.05" />
              </div>
              <div className="field">
                <label htmlFor="s-exp">Express rate</label>
                <input id="s-exp" className="input" defaultValue="14.95" type="number" step="0.05" />
              </div>
            </div>
            <div className="switch-row" style={{ marginTop: 10 }}>
              <span>
                <b>Guest checkout</b>
                <small>Allow orders without creating an account.</small>
              </span>
              <input type="checkbox" role="switch" checked={toggles.guestCheckout} onChange={() => flip('guestCheckout')} aria-label="Guest checkout" />
            </div>
          </section>
        </div>

        <aside className="editor-side">
          <section className="card admin-panel">
            <h3>Store status</h3>
            <div className="switch-row">
              <span>
                <b>Storefront live</b>
                <small>Customers can browse and buy.</small>
              </span>
              <input type="checkbox" role="switch" defaultChecked aria-label="Storefront live" />
            </div>
            <div className="switch-row">
              <span>
                <b>Maintenance mode</b>
                <small>Show a holding page instead.</small>
              </span>
              <input type="checkbox" role="switch" aria-label="Maintenance mode" />
            </div>
          </section>

          <section className="card admin-panel">
            <h3>Payments</h3>
            <ul className="info-lines">
              <li>
                <CreditCard size={15} /> Visa &amp; Mastercard — not connected
              </li>
              <li>
                <Globe size={15} /> PayPal — not connected
              </li>
              <li>
                <Shield size={15} /> Payment security requires a provider
              </li>
            </ul>
            <button className="btn btn-outline btn-sm btn-block" onClick={() => notify('Payment settings (demo)')}>
              Manage Payment Methods
            </button>
          </section>

          <section className="card admin-panel">
            <h3>Channels</h3>
            <ul className="info-lines">
              <li>
                <Truck size={15} /> Shipping carriers — not connected
              </li>
              <li>
                <Mail size={15} /> Email provider — not connected
              </li>
              <li>
                <Bell size={15} /> WhatsApp updates — not connected
              </li>
            </ul>
          </section>

          <section className="card admin-panel danger-zone">
            <h3>Danger zone</h3>
            <p className="sub">Destructive actions are disabled in this preview.</p>
            <button className="btn btn-outline danger btn-block" onClick={() => notify('Catalog reset disabled in this demo')}>
              <Trash size={15} /> Reset demo catalog
            </button>
            <p className="zone-note">
              <CheckCircle size={14} /> Your session data lives in this browser only.
            </p>
          </section>
        </aside>
      </div>
    </>
  )
}
