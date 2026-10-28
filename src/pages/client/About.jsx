import React from 'react'
import { Link } from 'react-router-dom'
import { Newsletter } from '../../components/Shell'
import { ArrowRight, Leaf, Eco, Globe } from '../../components/Icons'
import '../../styles/about.css'
import '../../styles/about-polish.css'

const BOTANICALS = [
  ['Aloe Vera','aloe','Botanical simplicity'],
  ['Green Tea','green-tea','A familiar leaf, a closer look'],
  ['Vitamin C','vitamin-c','An ingredient worth knowing'],
  ['Hyaluronic Acid','hyaluronic','Part of the daily ritual'],
]
const PRINCIPLES = [
  { number:'01', icon:Leaf, title:'Know what you use.', text:'Explore ingredient highlights, and refer to the packaging for the complete formula.' },
  { number:'02', icon:Globe, title:'Keep what works.', text:'Build a routine around your own preferences. More steps do not have to be the goal.' },
  { number:'03', icon:Eco, title:'Consider the details.', text:'Follow the label, use what you need, and check local guidance when recycling packaging.' },
]
export default function About() {
 return <div className="about-page">
  <section className="about-hero editorial-hero" aria-labelledby="about-title"><img className="editorial-hero-image" src="/images/skin-hero.webp" alt="SOMA campaign portrait in soft natural light" fetchpriority="high" /><div className="container about-hero-inner"><div className="about-hero-copy"><p className="eyebrow">The SOMA perspective</p><h1 id="about-title">Care, with<br /><em>intention.</em></h1><p className="lead">A simpler approach to skincare. Inspired by botanicals, grounded in the small rituals that make a day your own.</p><a className="brand-text-link" href="#our-perspective">Discover our perspective <ArrowRight size={18}/></a><div className="about-hero-signature"><Leaf size={22}/><span>Botanical inspiration.<br />Everyday intention.</span></div></div></div></section>
  <section className="about-manifesto" id="our-perspective"><div className="container"><div><span className="about-index">01 / Our perspective</span><p className="eyebrow">Room for the essentials</p></div><div><h2>Not another step.<br /><em>A moment that matters.</em></h2><p>Daily care can be a small pause. A familiar texture. A routine you understand. At SOMA, we invite you to start with the essentials and make that moment yours.</p></div></div></section>
  <section className="about-product-story"><div className="container"><div className="about-product-visual"><img src="/images/serum-premium.webp" width="640" height="640" alt="SOMA Radiant Glow serum in a green glass dropper bottle" loading="lazy"/><span>THE DAILY ESSENTIAL / RADIANT GLOW</span></div><div className="about-story-copy"><p className="eyebrow">A little care, every day</p><h2>Begin with<br />something simple.</h2><p>Meet Radiant Glow Face Serum. Get to know its ingredient highlights, find its place in your routine, and explore the essentials that sit alongside it.</p><Link className="btn btn-primary" to="/products/radiant-glow-face-serum">Discover Radiant Glow <ArrowRight size={18}/></Link><div className="about-story-detail"><Leaf size={22}/><p>Cleanse. Treat. Moisturise.<br /><span>A considered rhythm for everyday care.</span></p></div></div></div></section>
  <section className="about-botanicals"><div className="container"><div className="section-head"><div><p className="eyebrow">02 / Closer to the ingredients</p><h2>Nature, in the details.</h2></div><Link className="brand-text-link" to="/ingredients">Explore the library <ArrowRight size={18}/></Link></div><div className="about-botanical-grid">{BOTANICALS.map(([name,image,note])=><Link to="/ingredients" className="about-botanical" key={name}><div><img src={'/images/botanicals/'+image+'.webp'} alt={name} width="320" height="320" loading="lazy"/><span aria-hidden="true"><ArrowRight size={20}/></span></div><h3>{name}</h3><p>{note}</p></Link>)}</div><p className="about-botanical-note">Ingredient discovery starts here. Always check the product label for the complete ingredient list.</p></div></section>
  <section className="about-principles"><div className="container"><div className="about-principles-heading"><p className="eyebrow">03 / A more considered routine</p><h2>Small choices.<br />A little more intention.</h2><p>Thoughtful care goes beyond the bottle. These are simple ways to approach the everyday.</p></div><div className="about-principle-grid">{PRINCIPLES.map(({number,icon:Icon,title,text})=><article key={number}><div><span>{number}</span><Icon size={24}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  <section className="about-invitation"><div className="container"><div><p className="eyebrow">Your ritual. Your pace.</p><h2>Make a little space<br /><em>for yourself.</em></h2></div><Link className="btn btn-primary" to="/shop">Explore the collection <ArrowRight size={18}/></Link></div></section>
  <Newsletter/>
 </div>
}
