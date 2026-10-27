import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Motion is decorative and scoped to the current route with complete cleanup.
export default function PageMotion() {
  const { pathname } = useLocation()
  useEffect(() => {
    let cancelled = false
    let context
    let media
    const refreshers = []
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      context = gsap.context(() => {
        media = gsap.matchMedia()
        media.add('(prefers-reduced-motion: no-preference)', () => {
          const heroCopy = document.querySelector('.hero-copy, .about-hero-copy, .editorial-hero .container')
          if (heroCopy) gsap.fromTo(Array.from(heroCopy.children), { opacity: .65, y: 16 }, {
            opacity: 1, y: 0, duration: .75, stagger: .1, ease: 'power3.out', clearProps: 'opacity,transform',
          })
          if (document.querySelector('.hero-line')) gsap.fromTo('.hero-line > span', { yPercent: 105 }, { yPercent: 0, duration: .9, stagger: .12, ease: 'power3.out', clearProps: 'transform' })
          const heroImage = document.querySelector('.hero-background, .about-hero-photo img, .editorial-hero-image')
          if (heroImage) gsap.fromTo(heroImage, { scale: 1.025 }, { scale: 1, duration: 1.5, ease: 'power2.out', clearProps: 'transform' })
          gsap.utils.toArray('main [data-reveal], main .section-head, main .cat-tile, main .product-card, main .power-inner > *, main .results-inner > *, main .pdp-gallery, main .pdp-info, main .details-heading, main .product-details-shell, .premium-footer .footer-intro, .premium-footer .footer-navigation').forEach((element) => {
            gsap.fromTo(element, { y: 22, opacity: 0 }, {
              y: 0, opacity: 1, duration: .7, ease: 'power2.out', clearProps: 'opacity,transform',
              scrollTrigger: { trigger: element, start: 'top 94%', once: true },
            })
          })
          // Keep the existing catalog-card choreography unchanged. Additional
          // motion is confined to editorial content and operational UI.
          gsap.utils.toArray('.contact-form, .contact-side .faq, .science-copy, .science-steps, .commit-copy, .about-story-copy, .about-principles-heading, .article-hero, .article-body, .cart-main .summary, .checkout-main .co-card, .co-summary, .track-main .panel').forEach((element) => {
            gsap.fromTo(element, { y: 16, opacity: .45 }, {
              y: 0, opacity: 1, duration: .6, ease: 'power2.out', clearProps: 'opacity,transform',
              scrollTrigger: { trigger: element, start: 'top 95%', once: true },
            })
          })
          if (pathname.startsWith('/admin')) {
            gsap.fromTo('.admin-head, .admin-hero, .admin-main > .kpi-row, .admin-main > .three-col', { y: 10, opacity: .65 }, {
              y: 0, opacity: 1, stagger: .04, duration: .4, ease: 'power2.out', clearProps: 'opacity,transform',
            })
          }
          document.querySelectorAll('main img').forEach((img) => {
            if (img.complete) return
            const onLoad = () => ScrollTrigger.refresh()
            img.addEventListener('load', onLoad, { once: true })
            refreshers.push(() => img.removeEventListener('load', onLoad))
          })
          ScrollTrigger.refresh()
        })
        media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
          const stage = document.querySelector('.product-detail-page .pdp-gallery .stage')
          if (!stage) return
          gsap.set(stage, { transformPerspective: 1200 })
          const rotateX = gsap.quickTo(stage, 'rotationX', { duration: .6, ease: 'power2.out' })
          const rotateY = gsap.quickTo(stage, 'rotationY', { duration: .6, ease: 'power2.out' })
          const move = (event) => {
            const bounds = stage.getBoundingClientRect()
            rotateX((.5 - (event.clientY - bounds.top) / bounds.height) * 2.4)
            rotateY(((event.clientX - bounds.left) / bounds.width - .5) * 2.4)
          }
          const leave = () => { rotateX(0); rotateY(0) }
          stage.addEventListener('pointermove', move)
          stage.addEventListener('pointerleave', leave)
          return () => { stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerleave', leave) }
        })
      })
    }).catch(() => { /* A failed animation import must not prevent page access. */ })
    return () => { cancelled = true; refreshers.forEach((remove) => remove()); media?.revert(); context?.revert() }
  }, [pathname])
  return null
}
