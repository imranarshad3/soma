import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../../components/ProductCard'
import { Newsletter, TrustBar } from '../../components/Shell'
import { ArrowRight, Play } from '../../components/Icons'
import { useStore } from '../../store/StoreContext'
import '../../styles/home.css'
import '../../styles/home-restored.css'

const CATEGORIES = [ ['Serums','serum-premium.webp','Serums'], ['Moisturizers','cream-premium.webp','Moisturizers'], ['Cleansers','cleanser-premium.webp','Cleansers'], ['Skincare Sets','hero-premium.webp','Skincare Sets'] ]
const FILTERS = ['All','Serums','Moisturizers','Cleansers','Sets']
export default function Home() {
 const { products } = useStore()
 const [filter,setFilter] = useState('All')
 const featured = useMemo(() => {
  const slugs = { All:['radiant-glow-face-serum','hydrating-day-cream','gentle-foaming-cleanser'], Serums:['radiant-glow-face-serum','vitamin-c-brightening-serum','acne-control-serum'], Moisturizers:['hydrating-day-cream','revive-night-cream','anti-aging-eye-cream'], Cleansers:['gentle-foaming-cleanser','purifying-face-toner','detox-face-mask'], Sets:['complete-skincare-set','detox-face-mask','radiant-glow-face-serum'] }[filter]
  return slugs.map(slug=>products.find(p=>p.slug===slug)).filter(Boolean)
 },[products,filter])
 return <div className="home-restored">
  <section className="hero"><img className="hero-background" src="/images/hero-premium.webp" alt="SOMA serum, moisturiser and cleanser with botanicals" fetchpriority="high" /><div className="container hero-inner"><div className="hero-copy"><p className="eyebrow">Natural skincare for a brighter you</p><h1><span className="hero-line"><span>Pure Care</span></span><span className="hero-line"><span>Real Results</span></span></h1><p className="lead">Botanically powered skincare for a simple, considered daily routine.</p><div className="hero-actions"><Link className="btn btn-primary" to="/shop">Shop Now <ArrowRight size={18} /></Link><Link className="btn-play" to="/about"><span className="circle"><Play size={18} /></span>Our Story</Link></div><Link className="hero-product-note" to="/products/radiant-glow-face-serum"><span><small>The daily essential</small>Radiant Glow Face Serum</span><ArrowRight size={20}/></Link></div></div></section>
  <TrustBar variant="home" />
  <section className="section"><div className="container"><div className="section-head"><h2 className="section-title">Shop by Category</h2><Link className="brand-text-link" to="/shop">Explore All Products <ArrowRight size={18} /></Link></div><div className="cat-grid">{CATEGORIES.map(([name,img,category])=><Link className="cat-tile" to={'/shop?category='+encodeURIComponent(category)} key={name}><img src={'/images/'+img} alt={name} loading="lazy" width="640" height="640" /><span className="cat-fade" /><span className="cat-name">{name}</span><span className="cat-go"><ArrowRight size={20} /></span></Link>)}</div></div></section>
  <section className="section best"><div className="container"><div className="section-head"><h2 className="section-title">The Collection</h2><div className="chips" aria-label="Filter collection">{FILTERS.map(f=><button className={'chip'+(filter===f?' on':'')} key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div></div><div className="product-grid">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div></div></section>
  <section className="power"><div className="container power-inner"><div className="power-copy"><p className="eyebrow">The ingredient edit</p><h2>The <em>Power</em><br />of Nature</h2><p>Nature is our starting point. Get to know the ingredients behind your everyday ritual.</p><Link className="btn btn-primary" to="/ingredients">Discover Ingredients <ArrowRight size={18}/></Link></div><ul className="power-list">{[['Aloe Vera','Botanical extract'],['Green Tea','Plant-based inspiration'],['Vitamin E','Ingredient spotlight'],['Hyaluronic Acid','Formula essential']].map(([name,note],index)=><li key={name}><span className="botanical-index">0{index+1}</span><span><b>{name}</b><small>{note}</small></span></li>)}</ul><figure className="power-art"><img src="/images/botanicals/laboratory-wide.webp" alt="Botanical leaves and laboratory glassware" loading="lazy" width="1536" height="1024" /><figcaption><span>Botanical inspiration</span><span>SOMA / Ingredient library</span></figcaption></figure></div></section>
  <section className="results"><div className="container results-inner"><div className="results-portrait"><img src="/images/skin-premium.webp" alt="SOMA skincare campaign portrait" loading="lazy" /></div><div className="results-copy"><p className="eyebrow">A moment for you</p><h2>Your <em>Daily</em><br />Skincare Ritual</h2><p>A little care, every day. Start with cleansing, follow with serum, and finish with moisturiser.</p><Link className="btn btn-primary" to="/journal">Explore the Journal <ArrowRight size={18}/></Link></div><div className="results-stages">{[['01 / Cleanse','cleanser-premium.webp','gentle-foaming-cleanser'],['02 / Treat','serum-premium.webp','radiant-glow-face-serum'],['03 / Hydrate','cream-premium.webp','hydrating-day-cream']].map(([name,img,slug])=><figure key={name}><Link to={'/products/'+slug} aria-label={name+' — explore product'}><img src={'/images/'+img} alt="" loading="lazy" width="640" height="640"/><figcaption><span>{name}</span><ArrowRight size={16}/></figcaption></Link></figure>)}</div></div></section>
  <Newsletter />
 </div>
}
