import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import './css/colors.css'
import './css/global.css'

import Home from './pages/home/Home.tsx'

import Header from './global/Header.tsx'
import Footer from './global/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />

    <div id="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </BrowserRouter>
    </div>

    <Footer />
  </StrictMode>,
)
