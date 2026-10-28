import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { StoreProvider } from './store/StoreContext'
import './styles/global.css'
import './styles/admin.css'
import './styles/refinements.css'
import './styles/brand.css'
import './styles/footer-polish.css'
import './styles/search-polish.css'
import './styles/admin-premium.css'
import './styles/storefront-luxury.css'
import './styles/experience-system.css'
import './styles/luxury-elevation.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
)

