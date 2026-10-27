import React, { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { ArrowLeft, ArrowRight, Duplicate, Eye, Leaf, Plus, Share, Star, Trash, Heart } from '../../components/Icons'
import { CATEGORIES, INGREDIENT_FACETS, money } from '../../data/products'
import '../../styles/admin.css'

const TABS = ['Basic Information', 'Media', 'Pricing & Inventory', 'Ingredients', 'SEO & Metadata']

const IMAGE_POOL = [
  '/images/serum-radiant.webp',
  '/images/serum-vitamin-c.webp',
  '/images/serum-acne.webp',
  '/images/cream-day.webp',
  '/images/cream-night.webp',
  '/images/cream-eye.webp',
  '/images/cleanser-foaming.webp',
  '/images/toner-purifying.webp',
  '/images/lotion-body.webp',
  '/images/mask-detox.webp',
  '/images/balm-lip.webp',
  '/images/set-complete.webp',
  '/images/lifestyle-botanical.webp',
]

const blank = {
  id: '',
  slug: '',
  name: '',
  category: CATEGORIES[0],
  price: 0,
  compareAt: 0,
  discountLabel: '',
  rating: 0,
  reviews: 0,
  image: IMAGE_POOL[0],
  gallery: [IMAGE_POOL[0]],
  tagline: '',
  sizes: ['30 ml'],
  stock: 0,
  concerns: [],
  ingredientTags: [],
  description: '',
  bullets: [],
  howToUse: '',
}

export default function ProductEditor() {
  const { id } = useParams()
  const { products, upsertProduct, removeProduct, notify } = useStore()
  const navigate = useNavigate()

  const existing = useMemo(() => products.find((p) => p.id === id), [products, id])
  const [tab, setTab] = useState(0)
  const [draft, setDraft] = useState(() => (existing ? { ...existing } : { ...blank, id: `p${Date.now()}` }))
  const [tagInput, setTagInput] = useState('')
  const [benefit, setBenefit] = useState('')

  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }))
  const isNew = !existing

  const save = () => {
    if (!draft.name.trim()) return notify('Give the product a name first')
    const slug = draft.slug || draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    upsertProduct({
      ...draft,
      slug,
      price: Number(draft.price) || 0,
      compareAt: Number(draft.compareAt) || undefined,
      stock: Number(draft.stock) || 0,
      rating: Number(draft.rating) || 0,
      reviews: Number(draft.reviews) || 0,
      cardSale: !!draft.compareAt,
      gallery: draft.gallery?.length ? draft.gallery : [draft.image],
      concerns: draft.concerns?.length ? draft.concerns : ['Dullness'],
      howToUse: draft.howToUse || 'Apply as the last step of your routine, morning and evening.',
      bullets: draft.bullets?.length ? draft.bullets : ['Loved by the SOMA community'],
    })
    notify(isNew ? 'Product created' : 'Changes saved')
    navigate('/admin/products')
  }

  const preview = {
    ...draft,
    price: Number(draft.price) || 0,
    compareAt: Number(draft.compareAt) || undefined,
    name: draft.name || 'Untitled product',
    image: draft.image || IMAGE_POOL[0],
    rating: Number(draft.rating) || 4.6,
    reviews: Number(draft.reviews) || 0,
    discountLabel: draft.discountLabel || '20% OFF',
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <Link className="back-mini" to="/admin/products">
            <ArrowLeft size={14} /> Back to Products
          </Link>
          <h1>{isNew ? 'Add Product' : 'Edit Product'}</h1>
          <p>Keep your product details up to date to provide the best experience for your customers.</p>
        </div>
        <div className="admin-tools">
          <button className="btn btn-outline btn-sm" onClick={() => navigate(`/products/${draft.slug || 'radiant-glow-face-serum'}`)}>
            <Share size={15} /> Preview in Store
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              setDraft({ ...draft, id: `p${Date.now()}`, name: `${draft.name} (Copy)`.trim() })
              notify('Duplicated — save to keep the copy')
            }}
          >
            <Duplicate size={15} /> Duplicate
          </button>
          <button className="btn btn-primary btn-sm" onClick={save}>
            Save Changes
          </button>
        </div>
      </div>

      <div className="tabs-row editor-tabs" role="tablist" aria-label="Product sections">
        {TABS.map((t, i) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === i}
            className={tab === i ? 'on' : ''}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="two-col editor-grid">
        <div className="editor-main">
          {tab === 0 && (
            <>
              <section className="card admin-panel">
                <h2>Basic Information</h2>
                <p className="sub">Add the essential details about your product.</p>
                <div className="form-rows">
                  <div className="field">
                    <label htmlFor="p-name">Product Name *</label>
                    <input
                      id="p-name"
                      className="input"
                      value={draft.name}
                      maxLength={100}
                      onChange={(e) => set('name', e.target.value)}
                      placeholder="Radiant Glow Face Serum"
                    />
                    <small className="counter">{draft.name.length}/100</small>
                  </div>
                  <div className="field">
                    <label htmlFor="p-short">Short Description *</label>
                    <textarea
                      id="p-short"
                      className="textarea"
                      maxLength={160}
                      rows={2}
                      value={draft.tagline}
                      onChange={(e) => set('tagline', e.target.value)}
                      placeholder="Brightens • Hydrates • Evens Skin Tone"
                    />
                    <small className="counter">{draft.tagline.length}/160</small>
                  </div>
                  <div className="field">
                    <label htmlFor="p-long">Full Description</label>
                    <div className="editor-toolbar" aria-hidden="true">
                      <span>Paragraph ▾</span>
                      <b>B</b>
                      <i>I</i>
                      <u>U</u>
                      <span>≡</span>
                      <span>⋮≡</span>
                      <span>🔗</span>
                    </div>
                    <textarea
                      id="p-long"
                      className="textarea tall"
                      maxLength={2000}
                      value={draft.description}
                      onChange={(e) => set('description', e.target.value)}
                      placeholder="A lightweight, fast-absorbing serum powered by natural botanical extracts…"
                    />
                    <small className="counter">{draft.description.length}/2000</small>
                  </div>
                </div>
              </section>

              <section className="card admin-panel">
                <h2>Product Category</h2>
                <p className="sub">Choose the category that best fits this product.</p>
                <div className="form-2">
                  <div className="field">
                    <label htmlFor="p-cat">Category *</label>
                    <select id="p-cat" className="select" value={draft.category} onChange={(e) => set('category', e.target.value)}>
                      {CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="p-tags">Tags</label>
                    <div className="tag-box">
                      {(draft.concerns || []).map((t) => (
                        <span className="tag" key={t}>
                          {t}
                          <button
                            onClick={() => set('concerns', draft.concerns.filter((x) => x !== t))}
                            aria-label={`Remove ${t}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        id="p-tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && tagInput.trim()) {
                            e.preventDefault()
                            set('concerns', [...(draft.concerns || []), tagInput.trim()])
                            setTagInput('')
                          }
                        }}
                        placeholder="Add a tag and press enter..."
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="card admin-panel">
                <h2>Highlights / Key Benefits</h2>
                <p className="sub">Add key benefits to display on the product page.</p>
                <ul className="benefit-list">
                  {(draft.bullets || []).map((b, i) => (
                    <li key={b + i}>
                      <Leaf size={15} />
                      <span>{b}</span>
                      <button
                        onClick={() => set('bullets', draft.bullets.filter((_, x) => x !== i))}
                        aria-label={`Remove benefit ${b}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="benefit-add">
                  <input
                    value={benefit}
                    onChange={(e) => setBenefit(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && benefit.trim()) {
                        e.preventDefault()
                        set('bullets', [...(draft.bullets || []), benefit.trim()])
                        setBenefit('')
                      }
                    }}
                    placeholder="e.g. Brightens and evens skin tone"
                    aria-label="New benefit"
                  />
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      if (!benefit.trim()) return
                      set('bullets', [...(draft.bullets || []), benefit.trim()])
                      setBenefit('')
                    }}
                  >
                    <Plus size={14} /> Add Benefit
                  </button>
                </div>
              </section>
            </>
          )}

          {tab === 1 && (
            <section className="card admin-panel">
              <h2>Media</h2>
              <p className="sub">Upload high-quality images of your product.</p>
              <div className="media-main">
                <img src={draft.image || IMAGE_POOL[0]} alt={draft.name || 'Product'} />
              </div>
              <div className="media-thumbs">
                {(draft.gallery || [draft.image]).filter(Boolean).map((src, i) => (
                  <button
                    key={src + i}
                    className="mt"
                    onClick={() => set('image', src)}
                    aria-label={`Use image ${i + 1} as primary`}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
                <label className="mt add">
                  <Plus size={16} />
                  <span>Add Image</span>
                  <select
                    aria-label="Add image from asset library"
                    onChange={(e) => {
                      if (!e.target.value) return
                      set('gallery', [...(draft.gallery || []), e.target.value])
                      if (!draft.image) set('image', e.target.value)
                      e.target.value = ''
                    }}
                  >
                    <option value=""> </option>
                    {IMAGE_POOL.filter((i) => !(draft.gallery || []).includes(i)).map((i) => (
                      <option key={i} value={i}>
                        {i.split('/').pop()}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>
          )}

          {tab === 2 && (
            <section className="card admin-panel">
              <h2>Pricing &amp; Inventory</h2>
              <p className="sub">Set pricing, compare-at values and stock levels.</p>
              <div className="form-3">
                <div className="field">
                  <label htmlFor="pr">Price *</label>
                  <input id="pr" className="input" type="number" min="0" step="1" value={draft.price} onChange={(e) => set('price', e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="cmp">Compare-at price</label>
                  <input id="cmp" className="input" type="number" min="0" step="1" value={draft.compareAt || ''} onChange={(e) => set('compareAt', e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="off">Discount label</label>
                  <input id="off" className="input" value={draft.discountLabel || ''} onChange={(e) => set('discountLabel', e.target.value)} placeholder="20% OFF" />
                </div>
                <div className="field">
                  <label htmlFor="stk">Stock *</label>
                  <input id="stk" className="input" type="number" min="0" value={draft.stock} onChange={(e) => set('stock', e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="rate">Rating</label>
                  <input id="rate" className="input" type="number" min="0" max="5" step="0.1" value={draft.rating} onChange={(e) => set('rating', e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="rev">Review count</label>
                  <input id="rev" className="input" type="number" min="0" value={draft.reviews} onChange={(e) => set('reviews', e.target.value)} />
                </div>
              </div>
              <div className="field" style={{ marginTop: 18 }}>
                <label htmlFor="sizes">Sizes (comma separated)</label>
                <input
                  id="sizes"
                  className="input"
                  value={(draft.sizes || []).join(', ')}
                  onChange={(e) => set('sizes', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                />
              </div>
            </section>
          )}

          {tab === 3 && (
            <section className="card admin-panel">
              <h2>Ingredients</h2>
              <p className="sub">Tag the hero ingredients shoppers filter by.</p>
              <div className="tag-box wide">
                {(draft.ingredientTags || []).map((t) => (
                  <span className="tag" key={t}>
                    {t}
                    <button
                      onClick={() => set('ingredientTags', draft.ingredientTags.filter((x) => x !== t))}
                      aria-label={`Remove ${t}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <select
                  aria-label="Add ingredient"
                  onChange={(e) => {
                    if (!e.target.value) return
                    set('ingredientTags', [...(draft.ingredientTags || []), e.target.value])
                    e.target.value = ''
                  }}
                >
                  <option value="">Add ingredient…</option>
                  {INGREDIENT_FACETS.filter((i) => !(draft.ingredientTags || []).includes(i)).map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div className="field" style={{ marginTop: 18 }}>
                <label htmlFor="how">How to use</label>
                <textarea id="how" className="textarea" value={draft.howToUse || ''} onChange={(e) => set('howToUse', e.target.value)} />
              </div>
            </section>
          )}

          {tab === 4 && (
            <section className="card admin-panel">
              <h2>SEO &amp; Metadata</h2>
              <p className="sub">Control how this product appears in search results.</p>
              <div className="form-rows">
                <div className="field">
                  <label htmlFor="slug">URL slug</label>
                  <input
                    id="slug"
                    className="input"
                    value={draft.slug}
                    onChange={(e) => set('slug', e.target.value)}
                    placeholder={draft.name ? draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'product-slug'}
                  />
                </div>
                <div className="field">
                  <label htmlFor="meta">Meta title</label>
                  <input id="meta" className="input" defaultValue={`${draft.name || 'Product'} — SOMA Organic`} />
                </div>
                <div className="field">
                  <label htmlFor="metad">Meta description</label>
                  <textarea id="metad" className="textarea" defaultValue={(draft.description || 'Botanical skincare from SOMA Organic.').slice(0, 150)} />
                </div>
              </div>
            </section>
          )}
        </div>

        <aside className="editor-side">
          <section className="card admin-panel status-card">
            <h3>Product Status</h3>
            <select className="select" aria-label="Product status" value={draft.status || 'Active'} onChange={(event) => set('status', event.target.value)}>
              {['Active', 'Draft', 'Coming Soon'].map((status) => <option key={status}>{status}</option>)}
            </select>
            <p>Save changes to update the catalog status.</p>
          </section>

          <section className="card admin-panel">
            <div className="panel-title-row">
              <h3>Live Preview</h3>
              <Link className="link-more" to="/shop">
                View in Store <ArrowRight size={13} />
              </Link>
            </div>
            <div className="preview-card">
              <div className="preview-media">
                <img src={preview.image} alt="" />
                <button className="wish-btn" aria-label="Wishlist">
                  <Heart size={15} />
                </button>
              </div>
              <b>{preview.name}</b>
              <span className="stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} filled={s <= Math.round(preview.rating)} />
                ))}
                <small>({preview.reviews})</small>
              </span>
              <span className="price-row">
                <span className="price">{money(preview.price)}</span>
                {preview.compareAt ? <span className="price-old">{money(preview.compareAt)}</span> : null}
                {preview.compareAt ? <span className="price-off">{preview.discountLabel}</span> : null}
              </span>
              <small className="muted">{preview.tagline}</small>
              <button className="btn btn-primary btn-sm btn-block">Add to Cart</button>
            </div>
          </section>

          <section className="card admin-panel">
            <h3>Product Details</h3>
            <dl className="detail-list">
              <div>
                <dt>Product ID</dt>
                <dd>#{(draft.id || 'new').toUpperCase()}</dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>Apr 10, 2026, 09:23 AM</dd>
              </div>
              <div>
                <dt>Last Updated</dt>
                <dd>Apr 30, 2026, 10:42 AM</dd>
              </div>
              <div>
                <dt>Total Sales</dt>
                <dd>{draft.reviews ? draft.reviews * 3 : 0}</dd>
              </div>
              <div>
                <dt>Total Revenue</dt>
                <dd>{money((draft.reviews || 0) * 3 * (Number(draft.price) || 0))}</dd>
              </div>
            </dl>
            <button
              className="btn btn-outline danger btn-block"
              onClick={() => {
                if (!existing) return navigate('/admin/products')
                removeProduct(existing.id)
                notify('Product deleted')
                navigate('/admin/products')
              }}
            >
              <Trash size={15} /> {isNew ? 'Discard Product' : 'Delete Product'}
            </button>
          </section>
        </aside>
      </div>
    </>
  )
}
