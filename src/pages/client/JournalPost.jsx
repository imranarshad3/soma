import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Newsletter } from '../../components/Shell'
import { ArrowLeft, ArrowRight, Leaf } from '../../components/Icons'
import { POSTS } from './Journal'
import NotFound from './NotFound'
import '../../styles/contact.css'

export default function JournalPost() {
  const { slug } = useParams()
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  const more = POSTS.filter((p) => p.slug !== slug).sort((a,b) => Number(b.category === post.category) - Number(a.category === post.category)).slice(0, 3)

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <Link to="/journal">Journal</Link>
          <span className="sep">›</span>
          <span>{post.category}</span>
        </nav>

        <article className="article journal-article">
          <div>
            <p className="meta">
              <span className="post-pill static">{post.category}</span>
              {post.read} • {post.date}
            </p>
            <h1>{post.title}</h1>
            <div className="article-hero">
              <img src={post.image} alt="" width="960" height="640" fetchpriority="high" />
            </div>

            <div className="article-body">
              <p className="standfirst">{post.excerpt}</p>
              {post.body.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
              <Link className="btn btn-primary" to="/shop">
                Shop the routine <ArrowRight size={16} />
              </Link>
              <Link className="article-back-link" to="/journal"><ArrowLeft size={17}/> Back to the Journal</Link>
            </div>
          </div>

          <aside className="article-aside">
            <div className="card aside-card">
              <h2>Continue reading</h2>
              <ul>
                {more.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/journal/${p.slug}`}>
                      <img src={p.image} alt="" loading="lazy" />
                      <span>
                        <b>{p.title}</b>
                        <small>{p.read}</small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card aside-note">
              <Leaf size={22} />
              <p>Get to know the ingredients behind your everyday routine. Check the product label for the complete formula.</p>
              <Link className="link-more" to="/ingredients">
                Our ingredients <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </article>
      </div>

      <Newsletter />
    </>
  )
}
