import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star } from './Icons'

export default function ProductReviews({ products }) {
  const [reviews, setReviews] = useState(() => { try { return JSON.parse(localStorage.getItem('soma.productReviews')) || [] } catch { return [] } })
  const [editing, setEditing] = useState(false)
  const [productId, setProductId] = useState(products[0]?.id || '')
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState('')
  const [saved, setSaved] = useState(false)
  useEffect(() => { try { localStorage.setItem('soma.productReviews', JSON.stringify(reviews)) } catch {} }, [reviews])
  const edit = (id) => {
    const previous = reviews.find((review) => review.productId === id)
    setProductId(id); setRating(previous?.rating || 5); setBody(previous?.body || ''); setEditing(true); setSaved(false)
  }
  const submit = (event) => {
    event.preventDefault()
    if (!products.some((product) => product.id === productId) || !body.trim()) return
    setReviews((previous) => [...previous.filter((review) => review.productId !== productId), { productId, rating: Number(rating), body: body.trim() }])
    setEditing(false); setSaved(true)
  }
  const visible = reviews.map((review) => ({ ...review, product: products.find((product) => product.id === review.productId) })).filter((review) => review.product)
  return <section className="panel card account-reviews">
    <div className="account-review-heading"><div><p className="eyebrow">Your product experiences</p><h2>Your Reviews</h2></div><button className="btn btn-primary" onClick={() => edit(products[0]?.id || '')}>Write a Review <ArrowRight size={17}/></button></div>
    <p className="account-panel-description">One review per product. Your reviews are saved privately in this browser and are not published to the store.</p>
    {saved && <p role="status" className="review-saved">Your product review has been saved in this browser.</p>}
    {editing && <form className="product-review-form" onSubmit={submit}>
      <div className="form-grid"><div className="field"><label htmlFor="review-product">Product</label><select id="review-product" className="select" value={productId} onChange={(event) => edit(event.target.value)} required>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></div><div className="field"><label htmlFor="review-rating">Your rating</label><select id="review-rating" className="select" value={rating} onChange={(event) => setRating(Number(event.target.value))}>{[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} {value === 1 ? 'star' : 'stars'}</option>)}</select></div></div>
      <div className="field"><label htmlFor="review-body">Your experience</label><textarea id="review-body" className="textarea" value={body} onChange={(event) => setBody(event.target.value)} maxLength={1000} required placeholder="What would you like to share about this product?" /></div>
      <div className="review-form-actions"><button className="btn btn-primary" type="submit">Save review</button><button className="btn btn-outline" type="button" onClick={() => setEditing(false)}>Cancel</button></div>
    </form>}
    {!editing && !visible.length && <div className="account-review-empty"><Star size={28}/><h3>A review for every ritual.</h3><p>Choose a product and share your own experience. Each review stays linked to that product.</p></div>}
    <ul className="product-review-list">{visible.map(({ product, rating: score, body: text }) => <li key={product.id}><Link to={'/products/'+product.slug} className="review-product-image"><img src={product.image} alt={product.name} width="96" height="96" loading="lazy"/></Link><div><p className="eyebrow">{product.category}</p><Link to={'/products/'+product.slug} className="review-product-name">{product.name}</Link><div className="review-stars" aria-label={`${score} out of 5 stars`}>{[1,2,3,4,5].map((value) => <Star key={value} size={17} filled={value <= score}/>)}</div><p className="review-product-body">{text}</p></div><div className="review-row-actions"><button className="review-edit" onClick={() => edit(product.id)}>Edit review</button><button className="review-edit" aria-label={`Delete review for ${product.name}`} onClick={() => setReviews((previous) => previous.filter((review) => review.productId !== product.id))}>Delete</button></div></li>)}</ul>
  </section>
}
