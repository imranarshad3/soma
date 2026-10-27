import React, { useEffect, useRef, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductCard, Qty, Stars } from '../../components/ProductCard'
import { Newsletter, TrustBar } from '../../components/Shell'
import {
  ArrowRight, ArrowLeft, Close, Plus, Cart, CheckCircle, Eco, Flask, Heart, Leaf, Play, Rabbit, Refresh, Shield, Truck,
} from '../../components/Icons'
import { useStore } from '../../store/StoreContext'
import { money } from '../../data/products'
import NotFound from './NotFound'
import '../../styles/product.css'


const TABS = ['Description', 'Ingredients', 'How to Use', 'Shipping & Returns']



export default function ProductDetails() {
  const { slug } = useParams()
  const { products, recordProductView, addToCart, toggleWishlist, inWishlist } = useStore()
  const product = products.find((p) => p.slug === slug)
  const [size, setSize] = useState(product?.sizes?.[0])
  const [qty, setQty] = useState(1)
  const [active, setActive] = useState(0)
  const [shot, setShot] = useState(0)
  const [zoom, setZoom] = useState(false)
  const imageDialog = useRef(null)
  useEffect(() => {
    if (!zoom || !imageDialog.current) return
    const dialog = imageDialog.current
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => { dialog.close(); document.body.style.overflow = previous }
  }, [zoom])
  const detailPanel = useRef(null)
  useEffect(() => {
    setSize(product?.sizes?.[0]); setShot(0); setQty(1); setActive(0)
  }, [product?.id])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let stopped = false
    let animation
    import('gsap').then(({ gsap }) => {
      if (!stopped && detailPanel.current) animation = gsap.fromTo(detailPanel.current, { opacity: .6, y: 8 }, { opacity: 1, y: 0, duration: .35, ease: 'power2.out', clearProps: 'opacity,transform' })
    })
    return () => { stopped = true; animation?.revert() }
  }, [active])
  const lastViewed = useRef(null)
  useEffect(() => {
    if (product?.id && lastViewed.current !== product.id) {
      lastViewed.current = product.id
      recordProductView(product.id)
    }
  }, [product?.id, recordProductView])


  const related = useMemo(
    () => products.filter((p) => p.id !== product?.id).slice(0, 3),
    [products, product]
  )

  if (!product) return <NotFound />

  const wished = inWishlist(product.id)
  const gallery = product.gallery?.length ? product.gallery : [product.image]

  return (
    <div className="product-detail-page">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <Link to="/shop">Shop</Link>
          <span className="sep">›</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span className="sep">›</span>
          <span>{product.name}</span>
        </nav>

        <section className="pdp">
          {/* gallery */}
          <div className="pdp-gallery">
            <div className="thumbs" role="group" aria-label="Product images">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  className={`thumb${shot === i ? ' on' : ''}`}
                  onClick={() => setShot(i)}
                  aria-pressed={shot === i}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}

            </div>

            <div className="stage">
              <img src={gallery[shot % gallery.length]} alt={product.name} width="760" height="760" fetchpriority="high" />
              <button className="gallery-open" onClick={() => setZoom(true)} aria-label={`View full image of ${product.name}`}><Plus size={20}/><span>View image</span></button>
            </div>
            <div className="gallery-caption"><span>SOMA / {product.category}</span><span>{String(shot + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></div>
          </div>

          {/* info */}
          <div className="pdp-info">
            <div className="pdp-top">
              <span className="eyebrow">{product.category}</span>
              <button
                className={`wish-big${wished ? ' on' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'}
                aria-pressed={wished}
              >
                <Heart size={20} filled={wished} />
              </button>
            </div>

            <h1>{product.name}</h1>
            <p className="pdp-tagline">{product.tagline}</p>

            <div className="price-row pdp-price">
              <span className="price">{money(product.price)}</span>
              {product.compareAt && <span className="price-old">{money(product.compareAt)}</span>}
              {product.compareAt && <span className="price-off">{product.discountLabel}</span>}
            </div>

            <p className="pdp-desc">{product.description}</p>

            {product.sizes?.length > 1 && (
              <div className="pdp-size">
                <h4>Size</h4>
                <div className="size-row">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`size${size === s ? ' on' : ''}`}
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pdp-buy">
              <Qty value={qty} onChange={(value) => setQty(Math.max(1, value))} />
              <button className="btn btn-primary" onClick={() => addToCart(product, qty, size)}>
                <Cart size={16} /> Add to Cart
              </button>
            </div>


          </div>
        </section>

      </div>

      {/* tabs */}
      <section className="section product-information" aria-label="Product details">
        <div className="container">
          <div className="details-heading"><div><p className="eyebrow">Thoughtfully considered</p><h2>A closer look.</h2></div><p>Your formula, ingredients, and everyday ritual.</p></div>
          <div className="product-details-shell">
          <div className="tabs" role="tablist" aria-label="Product information">
            {TABS.map((t, i) => (
              <button
                key={t}
                role="tab"
                aria-selected={active === i}
                id={`product-tab-${i}`}
                aria-controls="product-details-panel"
                tabIndex={active === i ? 0 : -1}
                onKeyDown={(event) => {
                  let next
                  if (event.key === 'ArrowRight') next = (i + 1) % TABS.length
                  if (event.key === 'ArrowLeft') next = (i - 1 + TABS.length) % TABS.length
                  if (event.key === 'Home') next = 0
                  if (event.key === 'End') next = TABS.length - 1
                  if (next !== undefined) { event.preventDefault(); setActive(next); event.currentTarget.parentElement.children[next].focus() }
                }}
                className={active === i ? 'on' : ''}
                onClick={() => setActive(i)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="tab-panel">
            <div className="tab-main" id="product-details-panel" role="tabpanel" aria-labelledby={`product-tab-${active}`} tabIndex={0} ref={detailPanel}>
              {active === 0 && (
                <>
                  <h3>Product Description</h3>
                  <p>{product.description}</p>
                  <ul className="tick-list">
                    {product.bullets.map((b) => (
                      <li key={b}>
                        <CheckCircle size={17} /> {b}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {active === 1 && (
                <>
                  <h3>Ingredient highlights</h3>
                  <p>These ingredients are listed in the catalog. Refer to your product packaging for the complete formula.</p>
                  <ul className="tick-list">
                    {product.ingredientTags?.map((t) => (
                      <li key={t}>
                        <CheckCircle size={17} /> {t}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {active === 2 && (
                <>
                  <h3>How to Use</h3>
                  <p>{product.howToUse}</p>
                  <ul className="tick-list">
                    <li>
                      <CheckCircle size={17} /> Patch test before first use
                    </li>
                    <li>
                      <CheckCircle size={17} /> Layer from thinnest to thickest texture
                    </li>
                    <li>
                      <CheckCircle size={17} /> Always finish your morning routine with SPF
                    </li>
                  </ul>
                </>
              )}
              {active === 3 && (
                <>
                  <h3>Shipping & Returns</h3><p>Review the shipping options in checkout. Contact the store before ordering if you need confirmation of delivery or return arrangements.</p>

                </>
              )}
            </div>

            <aside className="routine-editorial"><img src="/images/botanicals/laboratory-wide.webp" alt="Botanical leaves and a glass pipette" loading="lazy" width="800" height="500" /><div><p className="eyebrow">A considered routine</p><h3>Keep it simple.</h3><p>Cleanse, treat, and moisturise. Follow the directions on your product label.</p><Link className="brand-text-link" to="/ingredients">Explore the ingredients <ArrowRight size={17} /></Link></div></aside>
          </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="section related">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">You May Also Like</h2>
            <Link className="link-more" to="/shop">
              View All Products <ArrowRight size={15} />
            </Link>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <TrustBar variant="results" />
      <Newsletter />
      <dialog ref={imageDialog} className="soma-image-dialog" aria-label={`${product.name} gallery`} onCancel={() => setZoom(false)} onClose={() => setZoom(false)} onClick={(event) => { if (event.target === event.currentTarget) setZoom(false) }}>
        <div className="image-dialog-head"><span>{product.name}</span><button onClick={() => setZoom(false)} aria-label="Close image gallery" autoFocus><Close size={23}/></button></div>
        <img src={gallery[shot % gallery.length]} alt={product.name} />
        <div className="image-dialog-controls"><button onClick={() => setShot((value) => (value - 1 + gallery.length) % gallery.length)} aria-label="Previous product image"><ArrowLeft size={21}/></button><span aria-live="polite">{shot + 1} / {gallery.length}</span><button onClick={() => setShot((value) => (value + 1) % gallery.length)} aria-label="Next product image"><ArrowRight size={21}/></button></div>
      </dialog>
    </div>
  )
}
