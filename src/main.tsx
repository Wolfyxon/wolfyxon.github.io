import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './css/colors.css'
import './css/global.css'

import Home from './home/Home.tsx'
import Header from './global/Header.tsx'
import Footer from './global/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    
    <div id="main">
      <Home />
    </div>

    <Footer />
  </StrictMode>,
)
