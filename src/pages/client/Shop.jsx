import { money } from '../../data/products'
import React, { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProductCard } from '../../components/ProductCard'
import { Newsletter, TrustBar } from '../../components/Shell'
import { ArrowRight, CheckCircle, Eco, Flask, Leaf, Rabbit, Search } from '../../components/Icons'
import { CATEGORIES, CONCERNS, INGREDIENT_FACETS } from '../../data/products'
import { useStore } from '../../store/StoreContext'
import '../../styles/shop.css'

const SORTS = [
  ['featured', 'Featured'],
  ['price-asc', 'Price: Low to High'],
  ['price-desc', 'Price: High to Low'],
  ['name', 'Name: A–Z'],
]


export default function Shop() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { products } = useStore()
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'All Products'
  const setCategory = (value) => setParams(value === 'All Products' ? {} : { category: value })
  const [concerns, setConcerns] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [ratings, setRatings] = useState([])
  const [price, setPrice] = useState([10, 100])
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('featured')

  const toggle = (list, setList, value) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const counts = useMemo(() => {
    const byCat = {}
    CATEGORIES.forEach((c) => (byCat[c] = products.filter((p) => p.category === c).length))
    return byCat
  }, [products])

  const visible = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== 'All Products' && p.category !== category) return false
      if (concerns.length && !concerns.some((c) => p.concerns?.includes(c))) return false
      if (ingredients.length && !ingredients.some((i) => p.ingredientTags?.includes(i))) return false
      if (ratings.length && !ratings.some((r) => p.rating >= r)) return false
      if (p.price < price[0] || p.price > price[1]) return false
      if (q.trim() && !(p.name + p.category + p.tagline).toLowerCase().includes(q.trim().toLowerCase())) return false
      return true
    })
    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      name: (a, b) => a.name.localeCompare(b.name),
      featured: (a, b) => b.reviews - a.reviews,
    }
    return [...list].sort(sorters[sort])
  }, [products, category, concerns, ingredients, ratings, price, q, sort])

  const clearAll = () => {
    setCategory('All Products')
    setConcerns([])
    setIngredients([])
    setRatings([])
    setPrice([10, 100])
    setQ('')
    setSort('featured')
    setParams({})
  }

  const [minP, maxP] = price
  const pct = (v) => `${((v - 10) / 90) * 100}%`

  return (
    <>
      {/* ---------------- page hero ---------------- */}
      <section className="page-hero editorial-hero">
        <img className="editorial-hero-image" src="/images/hero-premium.webp" alt="SOMA cleanser, serum and moisturiser collection" fetchpriority="high" />
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="container page-hero-inner">
          <div className="page-hero-copy">
            <p className="eyebrow">Our Collection</p>
            <h1>
              Natural Care
              <br />
              For Real Results
            </h1>
            <p className="lead">
              Explore our complete range of organic skincare made with nature’s most powerful ingredients.
            </p>

          </div>

        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <span>Shop</span>
        </nav>
      </div>

      {/* ---------------- catalog ---------------- */}
      <section className="shop-main">
        <div className="container shop-layout">
          <div className="collection-heading">
            <div><p className="eyebrow">Your daily ritual, thoughtfully made</p><h2>Find your natural glow<span>.</span></h2></div>
            <p>Clean formulas. Considered care.<br />Something beautiful for every skin.</p>
          </div>
          <nav className="collection-categories" aria-label="Shop by category">
            {['All Products', ...CATEGORIES].map((c) => (
              <button key={c} className={category === c ? 'selected' : ''} aria-pressed={category === c} onClick={() => setCategory(c)}>
                {c}<span>{c === 'All Products' ? products.length : counts[c] || 0}</span>
              </button>
            ))}
          </nav>
          <div className="collection-tools">
            <button className={`collection-filter-button${filtersOpen ? ' selected' : ''}`} aria-expanded={filtersOpen} aria-controls="shop-filters" onClick={() => setFiltersOpen((open) => !open)}>
              <span aria-hidden="true">☷</span> Filters
              {(concerns.length + ingredients.length + ratings.length + (minP !== 10 || maxP !== 100 ? 1 : 0)) > 0 && <b>{concerns.length + ingredients.length + ratings.length + (minP !== 10 || maxP !== 100 ? 1 : 0)}</b>}
              <span aria-hidden="true">{filtersOpen ? '−' : '+'}</span>
            </button>
            <p>Thoughtful skincare, made for you</p>
          </div>
          <aside id="shop-filters" hidden={!filtersOpen} className="collection-filter-panel" aria-label="Product filters">
            <div className="filter-block">
              <h4>Skin Concern</h4>
              <ul className="check-list">
                {CONCERNS.map((c) => (
                  <li key={c}>
                    <label className="checkbox-row">
                      <input type="checkbox" checked={concerns.includes(c)} onChange={() => toggle(concerns, setConcerns, c)} />
                      {c}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-block">
              <h4>Price Range</h4>
              <div className="dual-range">
                <span className="track" />
                <span className="fill" style={{ left: pct(minP), right: `calc(100% - ${pct(maxP)})` }} />
                <input
                  type="range" min="10" max="100" value={minP} aria-label="Minimum price"
                  onChange={(e) => setPrice([Math.min(Number(e.target.value), maxP - 5), maxP])}
                />
                <input
                  type="range" min="10" max="100" value={maxP} aria-label="Maximum price"
                  onChange={(e) => setPrice([minP, Math.max(Number(e.target.value), minP + 5)])}
                />
              </div>
              <div className="range-labels">
                <span>{money(minP)}</span>
                <span>{money(maxP)}</span>
              </div>
            </div>

            <div className="filter-block">
              <h4>Ingredients</h4>
              <ul className="check-list">
                {INGREDIENT_FACETS.map((i) => (
                  <li key={i}>
                    <label className="checkbox-row">
                      <input type="checkbox" checked={ingredients.includes(i)} onChange={() => toggle(ingredients, setIngredients, i)} />
                      {i}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-panel-footer"><button className="filter-reset" onClick={clearAll}>Reset all</button><button className="btn btn-primary" onClick={() => setFiltersOpen(false)}>Show {visible.length} products <ArrowRight size={15} /></button></div>
          </aside>

          {(concerns.length > 0 || ingredients.length > 0 || ratings.length > 0 || minP !== 10 || maxP !== 100 || q) && (
            <div className="active-filters" aria-label="Active filters">
              {concerns.map((c) => <button key={c} onClick={() => toggle(concerns, setConcerns, c)} aria-label={`Remove ${c} filter`}>{c} <span aria-hidden="true">×</span></button>)}
              {ingredients.map((i) => <button key={i} onClick={() => toggle(ingredients, setIngredients, i)} aria-label={`Remove ${i} filter`}>{i} <span aria-hidden="true">×</span></button>)}
              {ratings.map((r) => <button key={r} onClick={() => toggle(ratings, setRatings, r)}>{r}★ & up <span aria-hidden="true">×</span></button>)}
              {(minP !== 10 || maxP !== 100) && <button onClick={() => setPrice([10, 100])}>{money(minP)} – {money(maxP)} <span aria-hidden="true">×</span></button>}
              {q && <button onClick={() => setQ('')}>Search: {q} <span aria-hidden="true">×</span></button>}
              <button className="clear-active" onClick={clearAll}>Clear all</button>
            </div>
          )}
          <div className="shop-results">
            <div className="shop-toolbar">
              <label className="shop-search">
                <Search size={17} />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                />
              </label>
              <div className="shop-count">
                {visible.length} products
              </div>
              <label className="sort">
                <span>Sort by:</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
                  {SORTS.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {visible.length === 0 ? (
              <div className="empty-state">
                <h3>No products match those filters</h3>
                <p>Try widening the price range or clearing a filter or two.</p>
                <button className="btn btn-primary" onClick={clearAll}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <TrustBar variant="shop" />
      <Newsletter />
    </>
  )
}
