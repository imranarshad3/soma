import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Newsletter } from '../../components/Shell'
import { ArrowRight, CheckCircle, Flask, Leaf, Search, Sparkle, Eco, Rabbit } from '../../components/Icons'
import '../../styles/ingredients.css'

const TABS = [
  'All Ingredients',
  'Botanicals',
  'Vitamins',
  'Antioxidants',
  'Oils & Butters',
  'Plant Extracts',
  'Active Compounds',
]

const INGREDIENT_IMAGES = ['aloe', 'green-tea', 'vitamin-c', 'hyaluronic', 'niacinamide', 'tea-tree', 'retinol', 'rosehip', 'chamomile', 'shea', 'squalane', 'coffee']

const INGREDIENTS = [
  { name: 'Aloe Vera', note: 'Soothes & hydrates', tab: 'Botanicals', tone: 'g1', body: 'Calms irritation, deeply hydrates, and helps restore your skin’s natural balance.' },
  { name: 'Green Tea', note: 'Rich in antioxidants', tab: 'Antioxidants', tone: 'g2', body: 'Helps protect against environmental stressors and keeps skin looking youthful.' },
  { name: 'Vitamin C', note: 'Brightens & repairs', tab: 'Vitamins', tone: 'g3', body: 'Evens skin tone, reduces the look of dark spots, and boosts natural radiance.' },
  { name: 'Hyaluronic Acid', note: 'Locks in moisture', tab: 'Active Compounds', tone: 'g4', body: 'Deeply hydrates, plumps the skin, and helps maintain a healthy moisture barrier.' },
  { name: 'Niacinamide', note: 'Strengthens & smooths', tab: 'Vitamins', tone: 'g5', body: 'Improves skin texture, minimises the appearance of pores and supports the skin barrier.' },
  { name: 'Tea Tree', note: 'Purifies & clarifies', tab: 'Botanicals', tone: 'g6', body: 'Helps control excess oil, reduces blemishes and keeps skin looking clear.' },
  { name: 'Retinol', note: 'Renews & smooths', tab: 'Active Compounds', tone: 'g7', body: 'Encourages surface renewal and softens the look of fine lines over time.' },
  { name: 'Rosehip Oil', note: 'Nourishes & repairs', tab: 'Oils & Butters', tone: 'g8', body: 'Rich in essential fatty acids to replenish dry, tired-looking skin.' },
  { name: 'Chamomile', note: 'Calms & comforts', tab: 'Plant Extracts', tone: 'g9', body: 'A gentle botanical extract that comforts sensitive, reactive skin.' },
  { name: 'Shea Butter', note: 'Softens & protects', tab: 'Oils & Butters', tone: 'g10', body: 'Buttery moisture that seals in softness and shields skin against dryness.' },
  { name: 'Squalane', note: 'Balances & seals', tab: 'Active Compounds', tone: 'g11', body: 'Weightless hydration that mimics skin’s own oils for a supple finish.' },
  { name: 'Green Coffee', note: 'Energises & smooths', tab: 'Plant Extracts', tone: 'g12', body: 'Awakens dull-looking skin and helps refine the look of texture.' },
]

const ingredientImage = (ingredient) => `/images/botanicals/${INGREDIENT_IMAGES[INGREDIENTS.findIndex((item) => item.name === ingredient.name)]}.webp`


const PROCESS = [
  ['01', 'Source', 'We carefully select the highest quality natural ingredients.'],
  ['02', 'Research', 'Each ingredient is studied for safety, purity and effectiveness.'],
  ['03', 'Formulate', 'We combine nature and science to create gentle, effective skincare.'],
  ['04', 'Results', 'Real, visible results for healthier, more radiant skin.'],
]

const COMMITMENTS = [
  { title: 'Ethically Sourced', body: 'From partner-trusted farmers and communities.', tone: 'c1' },
  { title: 'Sustainable Farming', body: 'Supports organic and regenerative practices.', tone: 'c2' },
  { title: 'Eco Friendly Packaging', body: 'Reduced plastic, cleaner and greener tomorrow.', tone: 'c3' },
]

export default function Ingredients() {
  const [tab, setTab] = useState('All Ingredients')
  const [q, setQ] = useState('')

  const visible = useMemo(
    () =>
      INGREDIENTS.filter((i) => {
        const okTab = tab === 'All Ingredients' || i.tab === tab
        const okQ = !q.trim() || (i.name + i.note + i.body).toLowerCase().includes(q.trim().toLowerCase())
        return okTab && okQ
      }),
    [tab, q]
  )

  return (
    <>
      {/* hero */}
      <section className="ing-hero editorial-hero">
        <img className="editorial-hero-image" src="/images/botanicals/laboratory-wide.webp" alt="Fresh botanical extracts and green tea leaves" fetchpriority="high" />
        <div className="ing-hero-bg" aria-hidden="true" />
        <div className="container ing-hero-inner">
          <div className="ing-hero-copy">
            <p className="eyebrow">Our Ingredients</p>
            <h1>
              Pure Ingredients
              <br />
              Real Results
            </h1>
            <p className="lead">
              At Soma Organic, every ingredient is chosen with care, purpose and science. We believe in the power of
              nature to create healthier, more radiant skin.
            </p>
            <a className="btn btn-primary" href="#library">
              Explore Our Ingredients <ArrowRight size={16} />
            </a>

          </div>
          <div className="ing-hero-side" aria-hidden="true">
            <span className="leaf-badge">
              <Leaf size={26} />
            </span>
            <p>
              NATURE
              <br />
              SCIENCE
              <br />
              BEAUTY
              <br />
              TOGETHER
            </p>
          </div>
        </div>
      </section>

      {/* library */}
      <section className="section" id="library">
        <div className="container">
          <div className="ing-tabs">
            <div className="tabs-row" role="tablist" aria-label="Ingredient categories">
              {TABS.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  className={tab === t ? 'on' : ''}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <label className="ing-search">
              <Search size={16} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search ingredients..."
                aria-label="Search ingredients"
              />
            </label>
          </div>

          {visible.length === 0 ? (
            <div className="empty-state">
              <h3>No ingredients found</h3>
              <p>Try a different category or clear your search.</p>
              <button className="btn btn-primary" onClick={() => { setQ(''); setTab('All Ingredients') }}>
                Show all ingredients
              </button>
            </div>
          ) : (
            <div className="ing-grid">
              {visible.map((i) => (
                <article className="ing-card" key={i.name}>
                  <img className="ing-img" src={ingredientImage(i)} alt={i.name + " botanical skincare ingredient"} loading="lazy" width="640" height="640" />
                  <h3>{i.name}</h3>
                  <span className="ing-note">{i.note}</span>
                  <p>{i.body}</p>
                  <Link className="learn" to="/shop">
                    Learn More <ArrowRight size={13} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* science */}
      <section className="science">
        <div className="science-bg" aria-hidden="true" />
        <div className="container science-inner">
          <div className="science-photo">
            <img src="/images/botanicals/laboratory-wide.webp" alt="Botanical formulation with laboratory glassware and fresh green leaves" loading="lazy" />
          </div>
          <div className="science-copy">
            <p className="eyebrow">The Science Behind Nature</p>
            <h2>
              Powerful
              <br />
              Ingredients
              <br />
              Visible Results
            </h2>
            <p>
              We combine nature’s finest ingredients with modern scientific expertise to create formulas that truly
              work.
            </p>
            <Link className="btn btn-primary" to="/about">
              Our Process <ArrowRight size={16} />
            </Link>
          </div>
          <ol className="science-steps">
            {PROCESS.map(([n, t, b]) => (
              <li key={n}>
                <span className="num">{n}</span>
                <span>
                  <b>{t}</b>
                  <small>{b}</small>
                </span>
              </li>
            ))}
          </ol>
          <div className="science-note" aria-hidden="true">
            <Leaf size={24} />
            <p>
              CLEAN
              <br />
              CONSCIOUS
              <br />
              EFFECTIVE
              <br />
              BEAUTY
            </p>
          </div>
        </div>
      </section>

      {/* commitment */}
      <section className="section">
        <div className="container commit">
          <div className="commit-copy">
            <p className="eyebrow">Our Commitment</p>
            <h2>
              Sustainable Sourcing
              <br />
              For A Healthier Planet
            </h2>
            <p>
              We work with trusted partners around the world to source ingredients ethically and sustainably, ensuring
              a positive impact on both your skin and the environment.
            </p>
            <Link className="btn btn-primary" to="/about">
              Our Sustainability <ArrowRight size={16} />
            </Link>
          </div>
          <div className="commit-grid">
            {COMMITMENTS.map((c) => (
              <article key={c.title} className={`commit-card ${c.tone}`}>
                <img className="commit-image" src={`/images/botanicals/${c.tone === "c1" ? "harvest" : c.tone === "c2" ? "farm" : "packaging"}.webp`} alt={c.title} loading="lazy" />
                <div>
                  <h4>{c.title}</h4>
                  <p>{c.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
