import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Home from './home/Home.tsx'
import Header from './global/Header.tsx'
import Footer from './global/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Home />
    <Footer />
  </StrictMode>,
)
