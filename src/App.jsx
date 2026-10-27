import React from 'react'
import PageMotion from './components/PageMotion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SiteFooter, SiteHeader } from './components/Shell'
import Home from './pages/client/Home'
import Shop from './pages/client/Shop'
import ProductDetails from './pages/client/ProductDetails'
import About from './pages/client/About'
import Ingredients from './pages/client/Ingredients'
import Journal from './pages/client/Journal'
import JournalPost from './pages/client/JournalPost'
import Cart from './pages/client/Cart'
import Checkout from './pages/client/Checkout'
import TrackOrder from './pages/client/TrackOrder'
import Account from './pages/client/Account'
import Wishlist from './pages/client/Wishlist'
import Contact from './pages/client/Contact'
import NotFound from './pages/client/NotFound'
import AdminShell from './pages/admin/AdminShell'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import ProductEditor from './pages/admin/ProductEditor'
import Categories from './pages/admin/Categories'
import Orders from './pages/admin/Orders'
import OrderDetails from './pages/admin/OrderDetails'
import Customers from './pages/admin/Customers'
import Analytics from './pages/admin/Analytics'
import Settings from './pages/admin/Settings'
import { useStore } from './store/StoreContext'

function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return <div className="toast" role="status">{toast}</div>
}

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  // reset scroll position on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  if (isAdmin) {
    return (
      <>
        <PageMotion />
        <Routes>
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<ProductEditor />} />
            <Route path="products/:id" element={<ProductEditor />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="customers" element={<Customers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
        <Toast />
      </>
    )
  }

  return (
    <>
      <PageMotion />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" data-client-route={pathname.split('/')[1] || 'home'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
      <Toast />
    </>
  )
}
