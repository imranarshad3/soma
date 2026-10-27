// Storefront state: catalog (admin-editable), cart, wishlist, orders — localStorage backed.
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { PRODUCTS } from '../data/products'

const StoreContext = createContext(null)

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — keep session state only */
  }
}

export const SEED_ORDERS = [
  { id: 'SO-1028', customer: 'Emma Roberts', items: 2, total: 68, status: 'Delivered', date: 'Apr 30, 2026, 10:42 AM', email: 'emma@example.com', address: '24 Willow Lane, Portland, OR', payment: 'Visa •••• 4218' },
  { id: 'SO-1037', customer: 'James Wilson', items: 1, total: 36, status: 'Processing', date: 'Apr 30, 2026, 09:15 AM', email: 'james@example.com', address: '118 Cedar Ave, Austin, TX', payment: 'Mastercard •••• 9902' },
  { id: 'SO-1026', customer: 'Sophia Lee', items: 3, total: 89, status: 'Shipped', date: 'Apr 29, 2026, 06:28 PM', email: 'sophia@example.com', address: '7 Birchwood Rd, Seattle, WA', payment: 'PayPal' },
  { id: 'SO-1025', customer: 'Daniel Kim', items: 2, total: 52, status: 'Delivered', date: 'Apr 29, 2026, 02:14 PM', email: 'daniel@example.com', address: '52 Magnolia St, Denver, CO', payment: 'Visa •••• 1177' },
  { id: 'SO-1024', customer: 'Olivia Martinez', items: 1, total: 27, status: 'Cancelled', date: 'Apr 28, 2026, 11:03 AM', email: 'olivia@example.com', address: '9 Juniper Way, Miami, FL', payment: 'Amex •••• 3005' },
  { id: 'SO-1023', customer: 'Noah Bennett', items: 4, total: 142, status: 'Delivered', date: 'Apr 27, 2026, 04:51 PM', email: 'noah@example.com', address: '88 Poplar Ct, Chicago, IL', payment: 'Visa •••• 6621' },
  { id: 'SO-1022', customer: 'Ava Thompson', items: 2, total: 61, status: 'Shipped', date: 'Apr 27, 2026, 08:20 AM', email: 'ava@example.com', address: '3 Maple Grove, Nashville, TN', payment: 'Mastercard •••• 4410' },
]

export const SEED_CUSTOMERS = [
  { id: 'C-1042', name: 'Emma Roberts', email: 'emma@example.com', orders: 8, spent: 486, since: 'Jan 2026', city: 'Portland, OR', status: 'Active' },
  { id: 'C-1039', name: 'James Wilson', email: 'james@example.com', orders: 3, spent: 142, since: 'Feb 2026', city: 'Austin, TX', status: 'Active' },
  { id: 'C-1035', name: 'Sophia Lee', email: 'sophia@example.com', orders: 12, spent: 908, since: 'Nov 2025', city: 'Seattle, WA', status: 'VIP' },
  { id: 'C-1030', name: 'Daniel Kim', email: 'daniel@example.com', orders: 5, spent: 271, since: 'Dec 2025', city: 'Denver, CO', status: 'Active' },
  { id: 'C-1027', name: 'Olivia Martinez', email: 'olivia@example.com', orders: 1, spent: 27, since: 'Apr 2026', city: 'Miami, FL', status: 'Inactive' },
  { id: 'C-1021', name: 'Noah Bennett', email: 'noah@example.com', orders: 9, spent: 664, since: 'Oct 2025', city: 'Chicago, IL', status: 'VIP' },
  { id: 'C-1016', name: 'Ava Thompson', email: 'ava@example.com', orders: 4, spent: 218, since: 'Jan 2026', city: 'Nashville, TN', status: 'Active' },
]

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => read('soma.products', PRODUCTS).map((product) => {
    const photos = {"/images/lotion-body.jpg": "/images/lotion-body.webp", "/images/lifestyle-botanical.jpg": "/images/lifestyle-botanical.webp", "/images/mask-detox.jpg": "/images/mask-detox.webp", "/images/serum-acne.jpg": "/images/serum-acne.webp", "/images/night-premium.jpg": "/images/night-premium.webp", "/images/serum-vitamin-c.jpg": "/images/serum-vitamin-c.webp", "/images/serum-radiant.jpg": "/images/serum-premium.webp", "/images/cream-day.jpg": "/images/cream-premium.webp", "/images/balm-lip.jpg": "/images/balm-lip.webp", "/images/cream-premium.jpg": "/images/cream-premium.webp", "/images/cream-night.jpg": "/images/night-premium.webp", "/images/serum-premium.jpg": "/images/serum-premium.webp", "/images/cleanser-premium.jpg": "/images/cleanser-premium.webp", "/images/toner-purifying.jpg": "/images/toner-purifying.webp", "/images/cream-eye.jpg": "/images/cream-eye.webp", "/images/cleanser-foaming.jpg": "/images/cleanser-premium.webp", "/images/set-complete.jpg": "/images/hero-premium.webp", "/images/serum-radiant.webp": "/images/serum-premium.webp", "/images/serum-radiant.png": "/images/serum-premium.webp", "/images/cream-day.webp": "/images/cream-premium.webp", "/images/cream-day.png": "/images/cream-premium.webp", "/images/cleanser-foaming.webp": "/images/cleanser-premium.webp", "/images/cleanser-foaming.png": "/images/cleanser-premium.webp", "/images/cream-night.webp": "/images/night-premium.webp", "/images/cream-night.png": "/images/night-premium.webp", "/images/set-complete.webp": "/images/hero-premium.webp", "/images/set-complete.png": "/images/hero-premium.webp"}
    return { ...product, image: photos[product.image] || product.image, gallery: product.gallery?.map((image) => photos[image] || image) }
  }))
  const [cart, setCart] = useState(() => read('soma.cart', []))
  const [wishlist, setWishlist] = useState(() => read('soma.wishlist', ['p1', 'p2', 'p3', 'p11', 'p9']))
  const [orders, setOrders] = useState(() => read('soma.orders', SEED_ORDERS))
  const [customers] = useState(() => read('soma.customers', SEED_CUSTOMERS))
  const [productViews, setProductViews] = useState(() => read('soma.productViews', {}))
  const recordProductView = useCallback((id) => setProductViews((prev) => ({ ...prev, [id]: (Number(prev[id]) || 0) + 1 })), [])
  const [toast, setToast] = useState('')

  useEffect(() => write('soma.productViews', productViews), [productViews])
  useEffect(() => write('soma.products', products), [products])
  useEffect(() => write('soma.cart', cart), [cart])
  useEffect(() => write('soma.wishlist', wishlist), [wishlist])
  useEffect(() => write('soma.orders', orders), [orders])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const notify = useCallback((msg) => setToast(msg), [])

  const addToCart = useCallback(
    (product, qty = 1, size = product.sizes?.[0]) => {
      setCart((prev) => {
        const key = `${product.id}::${size}`
        const found = prev.find((l) => l.key === key)
        if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
        return [...prev, { key, id: product.id, size, qty }]
      })
      notify(`${product.name} added to cart`)
    },
    [notify]
  )

  const setQty = useCallback((key, qty) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))
    )
  }, [])

  const removeFromCart = useCallback((key) => setCart((prev) => prev.filter((l) => l.key !== key)), [])
  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback(
    (id) => {
      setWishlist((prev) => {
        const on = prev.includes(id)
        notify(on ? 'Removed from wishlist' : 'Saved to wishlist')
        return on ? prev.filter((x) => x !== id) : [...prev, id]
      })
    },
    [notify]
  )

  const clearWishlist = useCallback(() => setWishlist([]), [])

  const placeOrder = useCallback(
    (order) => {
      const next = `SO-${1040 + orders.length}`
      const record = { id: next, status: 'Processing', ...order }
      setOrders((prev) => [record, ...prev])
      setCart([])
      return record
    },
    [orders.length]
  )

  const upsertProduct = useCallback((product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      return exists ? prev.map((p) => (p.id === product.id ? { ...p, ...product } : p)) : [...prev, product]
    })
  }, [])

  const removeProduct = useCallback((id) => setProducts((prev) => prev.filter((p) => p.id !== id)), [])

  const cartCount = cart.reduce((n, l) => n + l.qty, 0)
  const cartSubtotal = cart.reduce((sum, l) => {
    const p = products.find((x) => x.id === l.id)
    return sum + (p ? p.price * l.qty : 0)
  }, 0)
  const cartLines = cart
    .map((l) => ({ ...l, product: products.find((p) => p.id === l.id) }))
    .filter((l) => l.product)
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id))

  const value = useMemo(
    () => ({
      products,
      productViews,
      recordProductView,
      cart,
      cartLines,
      cartCount,
      cartSubtotal,
      wishlist,
      wishlistProducts,
      orders,
      customers,
      toast,
      notify,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      clearWishlist,
      inWishlist: (id) => wishlist.includes(id),
      placeOrder,
      upsertProduct,
      removeProduct,
      setOrders,
    }),
    [
      products,
      productViews,
      recordProductView,
      cart,
      cartLines,
      cartCount,
      cartSubtotal,
      wishlist,
      wishlistProducts,
      orders,
      customers,
      toast,
      notify,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      clearWishlist,
      placeOrder,
      upsertProduct,
      removeProduct,
    ]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
