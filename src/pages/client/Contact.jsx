import React, { useState } from 'react'
import { Newsletter } from '../../components/Shell'
import { ArrowRight, Headset, Leaf, Mail, MapPin, Phone, CheckCircle } from '../../components/Icons'
import '../../styles/contact.css'

const FAQS = [
  ['Where can I review delivery options?', 'Delivery options appear in checkout. Confirm availability with the store before placing an order.'],
  ['Do you ship internationally?', 'International delivery availability has not been confirmed. Contact the store before ordering.'],
  ['What is your return policy?', 'A published returns policy is not available yet. Confirm the arrangements with the store before ordering.'],
  ['Are your products suitable for sensitive skin?', 'Check the product label and complete ingredient list. Patch test as directed before introducing a new product.'],
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState(0)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
  }

  return (
    <>
      <section className="contact-hero editorial-hero">
        <img className="editorial-hero-image" src="/images/hero-premium.webp" alt="SOMA organic skincare collection" fetchpriority="high" />
        <div className="contact-hero-bg" aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">Get In Touch</p>
          <h1>
            We’d Love To
            <br />
            Hear From You
          </h1>
          <p className="lead">
            Questions about an order, an ingredient or your routine? Explore the answers below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <form className="card contact-form" onSubmit={submit}>
            <h2>Send Us A Message</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" className="input" placeholder="Your name" required />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" className="input" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="c-subject">Subject</label>
              <select id="c-subject" className="select" defaultValue="">
                <option value="" disabled>
                  Choose a topic
                </option>
                <option>Order status</option>
                <option>Product advice</option>
                <option>Returns &amp; refunds</option>
                <option>Wholesale &amp; press</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="c-msg">Message</label>
              <textarea id="c-msg" className="textarea" placeholder="How can we help?" required />
            </div>
            <button className="btn btn-primary" type="submit">
              {sent ? 'Preview Saved' : 'Preview Message'} <ArrowRight size={16} />
            </button>
            {sent && (
              <p className="sent-note" role="status">
                <CheckCircle size={15} /> This form is a preview. Your message has not been sent.
              </p>
            )}
          </form>

          <div className="contact-side">
            <div className="card faq">
              <h3>Frequently Asked</h3>
              <ul>
                {FAQS.map(([q, a], i) => (
                  <li key={q}>
                    <button
                      className="faq-q"
                      onClick={() => setOpen(open === i ? -1 : i)}
                      aria-expanded={open === i}
                    >
                      {q}
                      <span aria-hidden="true">{open === i ? '−' : '+'}</span>
                    </button>
                    {open === i && <p className="faq-a">{a}</p>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card promise">
              <Leaf size={22} />
              <div>
                <b>Clean beauty, honest answers</b>
                <p>Contact delivery is not connected yet. Please do not submit sensitive information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
