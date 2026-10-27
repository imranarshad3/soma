import React, { useMemo, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Newsletter } from '../../components/Shell'
import { ArrowRight, Search, Close } from '../../components/Icons'
import '../../styles/journal.css'

export const POSTS = [
  {
    slug: 'benefits-of-aloe-vera',
    title: 'The Benefits of Aloe Vera for Healthy, Glowing Skin',
    category: 'Ingredients',
    excerpt: 'Discover how aloe vera soothes, hydrates and helps restore your skin’s natural balance.',
    read: '5 min read',
    date: 'Apr 12, 2026',
    image: '/images/lifestyle-botanical.webp',
    body: [
      'Aloe vera has been used for centuries as a skin soother, and modern formulation science confirms why it earns its place in so many routines. Its gel is rich in polysaccharides, vitamins and minerals that help the skin hold on to moisture.',
      'Used daily, aloe helps calm the look of irritation after sun exposure, shaving or active weather, and it absorbs quickly enough to sit comfortably under a moisturiser or SPF.',
      'Look for aloe high on the ingredient list — and skip formulas that pair it with heavy fragrance, which can undo much of its calming work.',
    ],
  },
  {
    slug: 'natural-skincare-routine',
    title: 'How to Build a Natural Skincare Routine',
    category: 'Skincare Tips',
    excerpt: 'A simple step-by-step guide to healthier, brighter skin using clean, organic products.',
    read: '7 min read',
    date: 'Apr 8, 2026',
    image: '/images/serum-premium.webp',
    body: [
      'A good routine does not need ten steps. Cleanse, treat, hydrate and protect — four deliberate steps will take you further than a shelf full of half-used bottles.',
      'Start with a gentle cleanser that leaves skin comfortable rather than squeaky, then add one active serum chosen for the concern you care about most.',
      'Finish with a moisturiser and, every morning, sunscreen. Consistency beats intensity: the best routine is the one you will still be doing in three months.',
    ],
  },
  {
    slug: 'wellness-and-healthy-skin',
    title: 'The Connection Between Wellness & Healthy Skin',
    category: 'Wellness',
    excerpt: 'Learn how better sleep, hydration and mindfulness can naturally improve your skin.',
    read: '6 min read',
    date: 'Apr 5, 2026',
    image: '/images/cream-premium.webp',
    body: [
      'Skin reflects how we live. Sleep, hydration and stress levels all show up in the way your complexion looks within days.',
      'Aim for a consistent sleep window, keep water within reach through the day, and give yourself a few screen-free minutes before bed — your skin barrier repairs most actively overnight.',
      'Topical care still matters, but it works best on top of those foundations rather than instead of them.',
    ],
  },
  {
    slug: 'green-tea-super-ingredient',
    title: 'Why Green Tea is a Skincare Super Ingredient',
    category: 'Ingredients',
    excerpt: 'Rich in antioxidants, green tea helps defend skin against everyday environmental stress.',
    read: '4 min read',
    date: 'Mar 28, 2026',
    image: '/images/botanicals/green-tea.webp',
    body: [
      'Green tea is loaded with polyphenols — particularly EGCG — which help the skin cope with everyday environmental stress.',
      'In leave-on formulas it pairs beautifully with vitamin C and niacinamide, layering antioxidant support without overwhelming sensitive skin.',
    ],
  },
  {
    slug: 'hyaluronic-acid-hydrator',
    title: 'Hyaluronic Acid: The Ultimate Hydrator',
    category: 'Skincare Tips',
    excerpt: 'How this moisture-binding ingredient keeps skin plump, soft and comfortably hydrated.',
    read: '5 min read',
    date: 'Mar 22, 2026',
    image: '/images/botanicals/hyaluronic.webp',
    body: [
      'Hyaluronic acid can hold many times its weight in water, which is why skin feels instantly bouncier after using it.',
      'Apply it to slightly damp skin, then seal with a cream or oil so the moisture you have just added stays where you want it.',
    ],
  },
  {
    slug: 'clean-beauty-at-home',
    title: 'Clean Beauty at Home: Simple Sustainable Habits',
    category: 'Natural Living',
    excerpt: 'Small swaps — from refill pouches to cold-water rinses — that shrink your beauty footprint.',
    read: '6 min read',
    date: 'Mar 18, 2026',
    image: '/images/hero-premium.webp',
    body: [
      'Sustainable beauty is a series of small decisions: choosing refills over replacements, products with fewer synthetics, and packaging designed to be recycled.',
      'Start with one swap a month. Habit change that lasts is rarely dramatic — it is simply repeated.',
    ],
  },
  {
    slug: 'greener-tomorrow',
    title: 'Our Commitment to a Greener Tomorrow',
    category: 'Sustainability',
    excerpt: 'The sourcing, formulation and packaging choices behind every SOMA product.',
    read: '4 min read',
    date: 'Mar 10, 2026',
    image: '/images/lotion-body.webp',
    body: [
      'We work with growers who farm regeneratively, and we choose ingredients that can be traced back to the people who harvested them.',
      'Our bottles are made from recyclable materials and our shipping boxes are plastic-free — progress we will keep publishing, year after year.',
    ],
  },
]

const TABS = ['All', ...new Set(POSTS.map(post => post.category))]

function StoryCard({ post }) {
  return <article className="post-card"><Link to={`/journal/${post.slug}`} className="post-media" aria-label={`Read ${post.title}`}><img src={post.image} alt="" loading="lazy" width="640" height="426"/><span className="post-pill">{post.category}</span></Link><h3><Link to={`/journal/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><div className="post-foot"><span className="meta">{post.read} • {post.date}</span><Link className="round-link" to={`/journal/${post.slug}`} aria-label={`Open ${post.title}`}><ArrowRight size={18}/></Link></div></article>
}

export default function Journal() {
  const [params, setParams] = useSearchParams()
  const searchInput = useRef(null)
  const tab = TABS.includes(params.get('category')) ? params.get('category') : 'All'
  const q = params.get('q') || ''
  const updateFilter = (key, value) => {
    setParams(current => { const next = new URLSearchParams(current); if (value && value !== 'All') next.set(key,value); else next.delete(key); return next }, { replace:true, preventScrollReset:true })
  }
  const clearFilters = () => { setParams({}, { replace:true, preventScrollReset:true }); searchInput.current?.focus() }
  const visible = useMemo(
    () =>
      POSTS.filter((p) => {
        const okTab = tab === 'All' || p.category === tab
        const okQ = !q.trim() || (p.title + p.excerpt + p.category).toLowerCase().includes(q.trim().toLowerCase())
        return okTab && okQ
      }),
    [tab, q]
  )

  const featured = tab === 'All' && !q.trim() ? visible[0] : null
  const stories = featured ? visible.slice(1) : visible

  return (
    <>
      <section className="journal-hero editorial-hero">
        <img className="editorial-hero-image" src="/images/skin-premium.webp" alt="Natural skincare and everyday wellbeing" fetchpriority="high" />
        <div className="journal-hero-bg" aria-hidden="true" />
        <span className="script" aria-hidden="true">
          Natural
          <br />
          Beauty
          <br />
          Everyday
        </span>
        <div className="container journal-hero-inner">
          <p className="eyebrow">The Soma Journal</p>
          <h1>
            Skincare
            <br />
            Rooted in Nature
          </h1>
          <p className="lead">
            Ingredient notes, simple routines, and a more considered approach to everyday care.
          </p>
          <a className="btn btn-primary" href="#articles">
            Explore Articles <ArrowRight size={16} />
          </a>

        </div>
      </section>

      <section className="section journal-stories" id="articles" aria-labelledby="journal-stories-title">
        <div className="container">
          <div className="journal-section-heading"><p className="eyebrow">Notes for your everyday ritual</p><h2 id="journal-stories-title">The latest from SOMA.</h2></div>
          <div className="journal-toolbar">
            <div className="tabs-row" role="group" aria-label="Article categories">
              {TABS.map((t) => (
                <button
                  key={t}
                  aria-pressed={tab === t}
                  className={tab === t ? 'on' : ''}
                  onClick={() => updateFilter('category', t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <label className="ing-search">
              <Search size={16} />
              <input
                ref={searchInput}
                value={q}
                onChange={(e) => updateFilter('q', e.target.value)}
                placeholder="Search articles..."
                aria-label="Search articles"
              />
              {q && <button type="button" onClick={() => { updateFilter('q', ''); searchInput.current?.focus() }} aria-label="Clear article search"><Close size={18}/></button>}
            </label>
          </div>
          <div className="journal-results-meta"><p role="status" aria-live="polite">{visible.length} {visible.length === 1 ? 'story' : 'stories'}{tab !== 'All' ? ` in ${tab}` : ' to explore'}{q.trim() ? ` matching “${q.trim()}”` : ''}</p>{(q || tab !== 'All') && <button type="button" onClick={clearFilters}>Clear filters</button>}</div>

          {visible.length === 0 ? (
            <div className="empty-state">
              <h3>No stories found</h3>
              <p>Try another category or a different search term.</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Show all articles
              </button>
            </div>
          ) : (
            <>
              {featured && <article className="journal-feature"><Link className="journal-feature-image" to={`/journal/${featured.slug}`} aria-label={`Read ${featured.title}`}><img src={featured.image} alt="" loading="lazy" width="960" height="640"/></Link><div className="journal-feature-copy"><p className="eyebrow">The featured story / {featured.category}</p><h2><Link to={`/journal/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><span className="meta">{featured.read} • {featured.date}</span><Link className="brand-text-link" to={`/journal/${featured.slug}`}>Read the story <ArrowRight size={18}/></Link></div></article>}
              <div className="journal-grid">{stories.map(post => <StoryCard post={post} key={post.slug}/>)}</div>
            </>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  )
}
