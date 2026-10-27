// Product card, star rating and quantity stepper shared across storefront pages.
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store/StoreContext'
import { ArrowRight, Cart, Heart, Minus, Plus, Star } from './Icons'
import { money } from '../data/products'

export function Stars({ rating, size = 13 }) {
  return (
    <span className="stars" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const full = rating >= i - 0.25
        const half = !full && rating >= i - 0.75
        return <Star key={i} size={size} filled={full} half={half} />
      })}
    </span>
  )
}

export function ProductCard({ product }) {
  const { addToCart, toggleWishlist, inWishlist, cart, setQty } = useStore()
  const navigate = useNavigate()
  const size = product.sizes?.[0]
  const line = cart.find((item) => item.id === product.id && item.size === size)
  const quantity = line?.qty || 0
  const available = product.stock > 0
  const buyNow = () => {
    if (!available) return
    if (!quantity) addToCart(product)
    navigate('/checkout')
  }
  const wished = inWishlist(product.id)
  return (
    <article className="product-card">
      <div className="product-media">
        <Link to={`/products/${product.slug}`} aria-label={product.name}>
          <img src={product.image} alt={product.name} loading="lazy" width="600" height="520" />
        </Link>
        <button
          className={`wish-btn${wished ? ' on' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={wished}
        >
          <Heart size={16} filled={wished} />
        </button>
      </div>
      <div className="product-body">
        <h3 className="product-name">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="card-category">{product.category} <span> / {product.sizes?.[0]}</span></p>
        <div className="price-row">
          <span className="price">{money(product.price)}</span>
          {product.cardSale && product.compareAt && <span className="price-old">{money(product.compareAt)}</span>}
          {product.cardSale && <span className="price-off">{product.discountLabel}</span>}
        </div>
        <div className="product-purchase">
          {quantity > 0 ? (
            <div className="card-cart-control">
              <span className="in-cart-label">In your bag</span>
              <Qty value={quantity} min={0} max={Math.min(99, product.stock)} label={`Quantity of ${product.name}`} onChange={(value) => setQty(line.key, value)} />
            </div>
          ) : (
            <button className="btn btn-primary btn-sm" disabled={!available} onClick={() => addToCart(product)}>
              <Cart size={15} /> {available ? 'Add to Cart' : 'Sold out'}
            </button>
          )}
          <button className="card-buy-now" disabled={!available} onClick={buyNow}>Buy Now <ArrowRight size={15} /></button>
        </div>
      </div>
    </article>
  )
}

export function Qty({ value, onChange, min = 1, max = 99, label = 'Quantity' }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button onClick={() => onChange(Math.max(min, value - 1))} aria-label="Decrease quantity" disabled={value <= min}>
        <Minus size={16} />
      </button>
      <span aria-live="polite">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} aria-label="Increase quantity" disabled={value >= max}>
        <Plus size={16} />
      </button>
    </div>
  )
}
