import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Newsletter } from '../../components/Shell'
import { ArrowRight, Bag, Box, Check, CheckCircle, Flask, Heart, Leaf, PackageIcon, Shield } from '../../components/Icons'
import { useStore } from '../../store/StoreContext'
import { money } from '../../data/products'
import '../../styles/checkout.css'


export default function Checkout() {
  const { cartLines, cartSubtotal, cartCount, placeOrder } = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [news, setNews] = useState(true)
  const [ship, setShip] = useState('standard')
  const [discount, setDiscount] = useState('')
  const [applied, setApplied] = useState(false)
  const [form, setForm] = useState({
    first: '', last: '', street: '', apt: '', city: '', state: '', zip: '', phone: '',
    card: '', exp: '', cvc: '',
  })
  const [error, setError] = useState('')
  const [errorField, setErrorField] = useState('')
  const fail = (message, field) => { setError(message); setErrorField(field); document.getElementById(field)?.focus() }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const shipping = ship === 'express' ? 14.95 : cartSubtotal >= 50 ? 0 : 6.95
  const discountValue = applied && discount.trim().toUpperCase() === 'SOMA10' ? cartSubtotal * 0.1 : 0
  const total = cartSubtotal + shipping - discountValue

  const summaryItems = cartLines

  const submit = (e) => {
    e.preventDefault()
    if (!cartCount) return setError('Your bag is empty. Add a product before checking out.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return fail('Please enter a valid email address.', 'co-email')
    for (const [field,label] of [['first','first name'],['street','street address'],['city','city'],['zip','postal code']]) {
      if (!form[field].trim()) return fail(`Please enter your ${label}.`, field)
    }
    if (!/^\d{12,19}$/.test(form.card.replace(/\s/g,''))) return fail('Use a test card number with 12–19 digits.', 'card')
    const expiry = form.exp.match(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/)
    if (!expiry) return fail('Enter an expiration date as MM / YY.', 'exp')
    if (new Date(2000 + Number(expiry[2]), Number(expiry[1])) <= new Date()) return fail('Please use a future expiration date.', 'exp')
    if (!/^\d{3,4}$/.test(form.cvc)) return fail('Use a test security code with 3 or 4 digits.', 'cvc')
    setErrorField('')
    setError('')
    const record = placeOrder({
      customer: `${form.first} ${form.last}`.trim(),
      email,
      items: cartCount,
      total: Math.round(total * 100) / 100,
      address: `${form.street}${form.apt ? ', ' + form.apt : ''}, ${form.city}, ${form.state} ${form.zip}`,
      payment: `Visa •••• ${form.card.replace(/\s/g, '').slice(-4) || '4242'}`,
      date: new Date().toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
      }),
    })
    navigate(`/track-order?id=${record.id}`)
  }

  if (!cartCount) return <section className="checkout-empty container"><Bag size={34}/><p className="eyebrow">Your shopping bag</p><h1>Start with a little care.</h1><p>Add an essential to your bag before continuing to checkout.</p><Link className="btn btn-primary" to="/shop">Explore the collection <ArrowRight size={18}/></Link></section>

  return (
    <>
      <div className="container"><p className="demo-notice" role="note">Store preview: checkout creates a local demonstration order. No payment is processed. Use test details only.</p>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <Link to="/cart">Shopping Cart</Link>
          <span className="sep">›</span>
          <span>Checkout</span>
        </nav>

        <section className="checkout-hero editorial-hero">
        <img className="editorial-hero-image" src="/images/cream-premium.webp" alt="SOMA hydrating moisturiser" fetchpriority="high" />
          <div className="checkout-hero-bg" aria-hidden="true" />
          <span className="watermark" aria-hidden="true">
            NATURE
            <br />
            SCIENCE
            <br />
            BEAUTY
            <br />
            TOGETHER
          </span>
          <span className="seal" aria-hidden="true">
            <Leaf size={18} />
            GLOW
            <br />
            NATURALLY
          </span>
          <div className="checkout-hero-copy">
            <p className="eyebrow">Almost There</p>
            <h1>
              A little closer
              <br />
              to your glow.
            </h1>
            <p>Review your essentials and try the demonstration checkout.</p>
          </div>
        </section>

        <ol className="steps" aria-label="Checkout progress">
          <li className="done">
            <span><Check size={14} /></span> Your Cart
          </li>
          <li className="current">
            <span>2</span> Checkout
          </li>
          <li>
            <span>3</span> Confirmation
          </li>
        </ol>

        <form className="checkout-layout" onSubmit={submit} noValidate>
          {error && <p id="checkout-error" className="form-error checkout-error" role="alert">{error}</p>}
          <div className="checkout-main">
            <section className="card co-card">
              <div className="co-head">
                <h2>Contact Information</h2>
                <p>
                  Already have an account? <Link to="/account">Log in</Link>
                </p>
              </div>
              <div className="field">
                <label htmlFor="co-email">Email address</label>
                <input
                  id="co-email"
                  aria-invalid={errorField === 'co-email'} aria-describedby={errorField === 'co-email' ? 'checkout-error' : undefined}
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <label className="checkbox-row" style={{ marginTop: 14 }}>
                <input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} />
                Email me skincare tips, new launches &amp; exclusive offers
              </label>
            </section>

            <section className="card co-card">
              <h2>Shipping Address</h2>
              <div className="grid2">
                <div className="field">
                  <label htmlFor="first">First Name</label>
                  <input id="first" aria-invalid={errorField === 'first'} aria-describedby={errorField === 'first' ? 'checkout-error' : undefined} className="input" placeholder="First name" value={form.first} onChange={set('first')} autoComplete="given-name" />
                </div>
                <div className="field">
                  <label htmlFor="last">Last Name</label>
                  <input id="last" className="input" placeholder="Last name" value={form.last} onChange={set('last')} autoComplete="family-name" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="street">Street Address</label>
                <input id="street" aria-invalid={errorField === 'street'} aria-describedby={errorField === 'street' ? 'checkout-error' : undefined} className="input" placeholder="House number and street name" value={form.street} onChange={set('street')} autoComplete="address-line1" />
              </div>
              <div className="field">
                <label htmlFor="apt">Apartment, suite, etc. (optional)</label>
                <input id="apt" className="input" placeholder="Apartment / suite / floor" value={form.apt} onChange={set('apt')} autoComplete="address-line2" />
              </div>
              <div className="grid2">
                <div className="field">
                  <label htmlFor="city">City</label>
                  <input id="city" aria-invalid={errorField === 'city'} aria-describedby={errorField === 'city' ? 'checkout-error' : undefined} className="input" placeholder="City" value={form.city} onChange={set('city')} autoComplete="address-level2" />
                </div>
                <div className="field">
                  <label htmlFor="state">State / Province</label>
                  <input id="state" className="input" value={form.state} onChange={set('state')} placeholder="State or province" autoComplete="address-level1"/>
                </div>
              </div>
              <div className="grid2">
                <div className="field">
                  <label htmlFor="zip">Postal Code</label>
                  <input id="zip" aria-invalid={errorField === 'zip'} aria-describedby={errorField === 'zip' ? 'checkout-error' : undefined} className="input" placeholder="ZIP / Postal Code" value={form.zip} onChange={set('zip')} autoComplete="postal-code" />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" className="input" type="tel" placeholder="Phone number (optional)" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                </div>
              </div>
            </section>

            <section className="card co-card">
              <h2>Delivery Method</h2>
              <label className={`ship-opt${ship === 'standard' ? ' on' : ''}`}>
                <input type="radio" name="ship" checked={ship === 'standard'} onChange={() => setShip('standard')} />
                <span>
                  <b>Standard Shipping</b>
                  <small>Delivery estimate shown at confirmation</small>
                </span>
                <em>{cartSubtotal >= 50 ? 'FREE' : money(6.95)}</em>
              </label>
              <label className={`ship-opt${ship === 'express' ? ' on' : ''}`}>
                <input type="radio" name="ship" checked={ship === 'express'} onChange={() => setShip('express')} />
                <span>
                  <b>Express Delivery</b>
                  <small>Preview delivery option</small>
                </span>
                <em>{money(14.95)}</em>
              </label>
            </section>

            <section className="card co-card">
              <h2>Test Payment Details</h2>
              <div className="pay-opt on">
                <span className="radio-dot" aria-hidden="true" />
                <span>
                  <b>Credit / Debit Card</b>
                  <small>Demonstration only — no payment is processed</small>
                </span>
                <em>
                  <span className="mini-pay">VISA</span>
                  <span className="mini-pay">Mastercard</span>
                </em>
              </div>

              <div className="field" style={{ marginTop: 16 }}>
                <label htmlFor="card">Card Number</label>
                <input id="card" aria-invalid={errorField === 'card'} aria-describedby={errorField === 'card' ? 'checkout-error' : undefined} className="input" inputMode="numeric" placeholder="0000 0000 0000 0000" value={form.card} onChange={set('card')} autoComplete="cc-number" />
              </div>
              <div className="grid2">
                <div className="field">
                  <label htmlFor="exp">Expiration Date</label>
                  <input id="exp" aria-invalid={errorField === 'exp'} aria-describedby={errorField === 'exp' ? 'checkout-error' : undefined} className="input" placeholder="MM / YY" value={form.exp} onChange={set('exp')} autoComplete="cc-exp" />
                </div>
                <div className="field">
                  <label htmlFor="cvc">Security Code</label>
                  <input id="cvc" aria-invalid={errorField === 'cvc'} aria-describedby={errorField === 'cvc' ? 'checkout-error' : undefined} className="input" placeholder="CVV" value={form.cvc} onChange={set('cvc')} autoComplete="cc-csc" />
                </div>
              </div>
              <p className="secure-note">
                <Shield size={14} /> Use test details only. No payment provider is connected.
              </p>



              <button className="btn btn-primary place-order" type="submit">
                CREATE DEMO ORDER <ArrowRight size={16} />
              </button>
              <p className="terms">This creates a local preview order in this browser. No purchase or email is sent.</p>
            </section>
          </div>

          <aside className="card co-summary">
            <h2>Order Summary</h2>
            <p className="sub">{cartCount} beautiful essentials in your bag</p>

            <ul className="co-items">
              {summaryItems.map((l) => (
                <li key={l.key}>
                  <img src={l.product.image} alt="" />
                  <span>
                    <b>{l.product.name}</b>
                    <small>
                      {l.size} • Qty: {l.qty}
                    </small>
                  </span>
                  <em>{money(l.product.price * l.qty)}</em>
                </li>
              ))}
              {summaryItems.length === 0 && <li className="muted">Your cart is empty.</li>}
            </ul>

            <div className="discount-row">
              <input
                placeholder="Discount code or gift card"
                value={discount}
                onChange={(e) => { setDiscount(e.target.value); setApplied(false) }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setApplied(!!discount.trim()) } }}
                aria-label="Discount code"
              />
              <button type="button" onClick={() => setApplied(!!discount.trim())}>
                APPLY
              </button>
            </div>
            {applied && (
              <p className="discount-note" role="status">
                {discount.trim().toUpperCase() === 'SOMA10'
                  ? 'SOMA10 applied — 10% off your order.'
                  : 'That code is not recognised. Try SOMA10.'}
              </p>
            )}

            <dl className="co-totals">
              <div>
                <dt>Subtotal</dt>
                <dd>{money(cartSubtotal)}</dd>
              </div>
              <div>
                <dt>{ship === 'express' ? 'Express Delivery' : 'Standard Shipping'}</dt>
                <dd>{shipping === 0 ? 'FREE' : money(shipping)}</dd>
              </div>
              <div>
                <dt>Estimated Tax</dt>
                <dd>Calculated at checkout</dd>
              </div>
              {discountValue > 0 && (
                <div>
                  <dt>Discount</dt>
                  <dd>−{money(discountValue)}</dd>
                </div>
              )}
              <div className="grand">
                <dt>Total before tax</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>

            <p className="kind-note">
              <Leaf size={15} /> Thank you for choosing a more natural way to care for your skin.
            </p>
            <p className="secure-foot">
              <Shield size={15} />
              <span>
                <b>Local store preview</b>
                <small>Test details stay in this browser.</small>
              </span>
            </p>
          </aside>
        </form>

        <div className="checkout-trust card">
          {[
            [<Leaf size={20} key="a" />, 'Clean Ingredients', 'Inspired by nature'],
            [<Heart size={20} key="b" />, 'Cruelty Free', 'Made with care'],
            [<Flask size={20} key="c" />, 'Thoughtful Quality', 'Carefully formulated'],
            [<PackageIcon size={20} key="d" />, 'Careful Packaging', 'Made to protect'],
          ].map(([icon, title, sub]) => (
            <div key={title}>
              <span className="ic">{icon}</span>
              <span>
                <b>{title}</b>
                <small>{sub}</small>
              </span>
            </div>
          ))}
        </div>
      </div>

      <Newsletter />
    </>
  )
}
