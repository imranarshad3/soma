import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../../components/ProductCard'
import { Newsletter, TrustBar } from '../../components/Shell'
import { ArrowRight, Heart, Leaf, Share, Trash } from '../../components/Icons'
import { useStore } from '../../store/StoreContext'
import '../../styles/wishlist.css'

export default function Wishlist() {
  const { wishlistProducts, products, clearWishlist, notify } = useStore()

  const suggestions = useMemo(() => {
    const saved = new Set(wishlistProducts.map((p) => p.id))
    const rest = products.filter((p) => !saved.has(p.id))
    return (rest.length >= 4 ? rest : products).slice(0, 3)
  }, [wishlistProducts, products])

  const share = async () => {
    const url = `${window.location.origin}/wishlist`
    try {
      if (navigator.share) await navigator.share({ title: 'My SOMA wishlist', url })
      else {
        await navigator.clipboard.writeText(url)
        notify('Wishlist link copied to clipboard')
      }
    } catch {
      notify('Wishlist link: ' + url)
    }
  }

  return (
    <>
      <section className="wish-hero editorial-hero">
        <img className="editorial-hero-image" src="/images/hero-premium.webp" alt="Your SOMA skincare essentials" fetchpriority="high" />
        <div className="wish-hero-bg" aria-hidden="true" />
        <span className="script" aria-hidden="true">
          Glow
          <br />
          Naturally
          <br />
          Always
        </span>
        <div className="container wish-hero-inner">
          <div>
            <p className="eyebrow">My Wishlist</p>
            <h1>
              Your Beauty
              <br />
              Wishlist <Heart size={30} />
            </h1>
            <p className="lead">Save your favourite products and come back to them anytime.</p>
          </div>
          <div className="wish-art" aria-hidden="true">
            <div className="wish-stage">
              <img src="/images/hero-premium.webp" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">
              {wishlistProducts.length} Saved {wishlistProducts.length === 1 ? 'Product' : 'Products'}
            </h2>
            <div className="wish-actions">
              <button className="btn btn-outline btn-sm" onClick={share}>
                <Share size={15} /> Share Wishlist
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  clearWishlist()
                  notify('Wishlist cleared')
                }}
                disabled={!wishlistProducts.length}
              >
                <Trash size={15} /> Clear All
              </button>
            </div>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="empty-state">
              <h3>Your wishlist is empty</h3>
              <p>Tap the heart on any product to keep it here for later.</p>
              <Link className="btn btn-primary" to="/shop">
                Browse Products <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="wish-grid">
              {wishlistProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
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
