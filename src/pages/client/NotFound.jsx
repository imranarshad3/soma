import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Leaf } from '../../components/Icons'
import '../../styles/contact.css'

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container center">
        <span className="nf-ic">
          <Leaf size={30} />
        </span>
        <p className="eyebrow">404</p>
        <h1>This page has wilted</h1>
        <p>The link you followed doesn’t exist — but the rest of the garden is right here.</p>
        <Link className="btn btn-primary" to="/">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </section>
  )
}
