import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard, Qty } from '../../components/ProductCard'
import { Newsletter, TrustBar } from '../../components/Shell'
import { ArrowRight, Bag, CheckCircle, Heart, Leaf, Refresh, Shield, Trash, Truck } from '../../components/Icons'
import { useStore } from '../../store/StoreContext'
import { money } from '../../data/products'
import '../../styles/cart.css'


export default function Cart() {
  const { cartLines, cartSubtotal, cartCount, setQty, removeFromCart, clearCart, products, toggleWishlist, inWishlist } =
    useStore()

  const suggestions = useMemo(() => {
    const inCart = new Set(cartLines.map((l) => l.id))
    const rest = products.filter((p) => !inCart.has(p.id))
    return (rest.length >= 4 ? rest : products).slice(0, 3)
  }, [cartLines, products])

  const shipping = cartSubtotal >= 50 || cartSubtotal === 0 ? 0 : 6.95
  const tax = 0
  const total = cartSubtotal + shipping + tax

  return (
    <>
      <section className="cart-hero editorial-hero">
        <img className="editorial-hero-image" src="/images/hero-premium.webp" alt="SOMA daily skincare ritual" fetchpriority="high" />
        <div className="cart-hero-bg" aria-hidden="true" />
        <span className="script" aria-hidden="true">
          Glow
          <br />
          Naturally
          <br />
          With Soma
        </span>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Cart</span>
          </nav>
          <h1>Your Cart</h1>
          <p className="lead">Natural beauty is always a good choice.</p>
        </div>
      </section>

      <section className="cart-main">
        <div className="container cart-layout">
          {/* lines */}
          <div className="cart-lines card">
            {cartLines.length === 0 ? (
              <div className="empty-state">
                <h3>Your cart is empty</h3>
                <p>Fill it with the botanicals your skin has been asking for.</p>
                <Link className="btn btn-primary" to="/shop">
                  Start Shopping <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-lines-head">
                  <h2>
                    {cartCount} {cartCount === 1 ? 'Item' : 'Items'} in your cart
                  </h2>
                  <button className="clear" onClick={clearCart}>
                    <Trash size={15} /> Clear Cart
                  </button>
                </div>

                <ul className="line-list">
                  {cartLines.map((l) => (
                    <li className="line" key={l.key}>
                      <Link className="line-img" to={`/products/${l.product.slug}`}>
                        <img src={l.product.image} alt={l.product.name} />
                      </Link>
                      <div className="line-info">
                        <div className="line-top">
                          <Link className="line-name" to={`/products/${l.product.slug}`}>
                            {l.product.name}
                          </Link>
                          <button
                            className={'heart' + (inWishlist(l.product.id) ? ' on' : '')}
                            aria-pressed={inWishlist(l.product.id)}
                            onClick={() => toggleWishlist(l.product.id)}
                            aria-label={`${inWishlist(l.product.id) ? 'Remove' : 'Save'} ${l.product.name} ${inWishlist(l.product.id) ? 'from' : 'to'} wishlist`}
                          >
                            <Heart size={20} filled={inWishlist(l.product.id)} />
                          </button>
                        </div>
                        <p className="line-meta">
                          <b>{l.size}</b>
                          <span className="dot">|</span>
                          {l.product.tagline}
                        </p>
                        <div className="line-bottom">
                          <span className="line-price">{money(l.product.price)}</span>
                          <Qty value={l.qty} onChange={(v) => setQty(l.key, v)} />
                          <button className="remove" onClick={() => removeFromCart(l.key)}>
                            <Trash size={15} /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* summary */}
          <aside className="summary card">
            <h2>Order Summary</h2>
            <dl>
              <div>
                <dt>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</dt>
                <dd>{money(cartSubtotal)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'Free' : money(shipping)}</dd>
              </div>
              <div>
                <dt>Estimated Tax</dt>
                <dd>Not included in preview</dd>
              </div>
              <div className="total">
                <dt>Total before tax</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>

            {cartCount > 0 ? <Link className="btn btn-primary btn-block" to="/checkout">
              <Bag size={16} /> Proceed to Checkout <ArrowRight size={16} />
            </Link> : <button className="btn btn-primary btn-block" disabled>Add products to continue</button>}

            <p className="demo-notice">Checkout is a store preview. No payment will be processed.</p>
          </aside>
        </div>
      </section>

      <section className="section related">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">You May Also Like</h2>
            <Link className="link-more" to="/shop">
              View All Products <ArrowRight size={15} />
            </Link>
          </div>
          <div className="product-grid">
            {suggestions.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <TrustBar variant="values" />
      <Newsletter />
    </>
  )
}
