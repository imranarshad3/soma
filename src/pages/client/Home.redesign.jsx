// Alternative homepage preserved at user request. Uncomment to reuse.
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { ProductCard } from '../../components/ProductCard'
// import { ArrowRight } from '../../components/Icons'
// import { useStore } from '../../store/StoreContext'
// import '../../styles/home.css'
// 
// const PRODUCT = '/products/radiant-glow-face-serum'
// export default function Home() {
//   const { products } = useStore()
//   const serum = products.find((p) => p.slug === 'radiant-glow-face-serum')
//   const companions = products.filter((p) => ['hydrating-day-cream', 'gentle-foaming-cleanser', 'revive-night-cream'].includes(p.slug))
//   return <>
//     <section className="brand-hero">
//       <div className="container brand-hero-inner">
//         <div className="brand-hero-copy" data-reveal>
//           <p className="eyebrow">SOMA / The daily serum</p>
//           <h1>A little care.<br /><em>A brighter ritual.</em></h1>
//           <p className="lead">Meet Radiant Glow Face Serum. A lightweight botanical formula, made to fit beautifully into your everyday routine.</p>
//           <div className="hero-actions"><Link className="btn btn-primary" to={PRODUCT}>Discover the serum <ArrowRight size={17} /></Link><Link className="brand-text-link" to="/ingredients">Explore the ingredients <ArrowRight size={16} /></Link></div>
//           <p className="hero-footnote">Cleanse. Treat. Moisturise. Keep it simple.</p>
//         </div>
//         <Link to={PRODUCT} className="brand-hero-art" aria-label="Discover Radiant Glow Face Serum"><img src="/images/serum-premium.webp" width="640" height="640" alt="SOMA serum in green glass with a gold dropper, surrounded by botanicals" fetchPriority="high" /><span>Radiant Glow Face Serum <ArrowRight size={18} /></span></Link>
//       </div>
//     </section>
//     <section className="brand-intro container" data-reveal><p className="eyebrow">Less complexity. More intention.</p><h2>Your skincare ritual,<br />beautifully considered.</h2><p>Start with the essentials. Get to know your formula, choose a routine that works for you, and make a little space for daily care.</p></section>
//     <section className="section brand-feature"><div className="container brand-split"><div className="brand-photo"><img src="/images/botanicals/laboratory-wide.webp" width="1536" height="1024" alt="Botanical leaves, aloe vera and clear glass formulation vessels" loading="lazy" /></div><div className="brand-feature-copy" data-reveal><p className="eyebrow">Inside the formula</p><h2>Botanical inspiration.<br />An everyday essential.</h2><p>A closer look at the ingredients behind Radiant Glow. Explore the catalogued botanicals and learn where a serum belongs in your routine.</p><div className="brand-ingredient-row">{['Green Tea', 'Aloe Vera', 'Hyaluronic Acid'].map((name) => <span key={name}>{name}</span>)}</div><Link className="brand-text-link" to={PRODUCT}>Get to know the serum <ArrowRight size={16} /></Link></div></div></section>
//     <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">The everyday collection</p><h2 className="section-title">Complete your ritual.</h2></div><Link className="brand-text-link" to="/shop">Shop the collection <ArrowRight size={16} /></Link></div><div className="product-grid">{companions.map((p) => <ProductCard key={p.id} product={p} />)}</div></div></section>
//     <section className="section brand-ritual"><div className="container"><div className="section-head"><div><p className="eyebrow">A moment for you</p><h2 className="section-title">Three steps. Your daily rhythm.</h2></div></div><div className="ritual-grid">{[['01','Cleanse','Begin with freshly cleansed skin.','cleanser-premium.jpg'],['02','Treat','Apply your serum as directed on the label.','serum-premium.jpg'],['03','Moisturise','Follow with moisturiser to finish your routine.','cream-premium.jpg']].map(([n,t,d,img]) => <article key={n}><img src={'/images/'+img} width="640" height="640" alt={t+' skincare step'} loading="lazy" /><div><span>{n}</span><h3>{t}</h3><p>{d}</p></div></article>)}</div></div></section>
//     <section className="section"><div className="container brand-faq"><div><p className="eyebrow">Before you begin</p><h2 className="section-title">A little clarity.</h2><Link className="brand-text-link" to="/contact">More questions? <ArrowRight size={16} /></Link></div><div>{[['Where does serum fit in my routine?','Use after cleansing and before moisturiser. Follow the directions on your product label.'],['How do I choose a product?','Read the product description and ingredient information, then choose around your own routine and preferences.'],['Where can I find the full ingredient list?','Check the product packaging for the complete ingredient list. The website highlights catalogued ingredients for discovery.']].map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>
//     {serum && <section className="brand-closing"><div className="container"><p className="eyebrow">Your ritual starts here</p><h2>Make room for a little care.</h2><Link className="btn btn-primary" to={PRODUCT}>Explore Radiant Glow <ArrowRight size={16} /></Link></div></section>}
//   </>
// }
