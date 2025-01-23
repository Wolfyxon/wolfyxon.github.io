import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import './css/colors.css'
import './css/global.css'

const Home = lazy(() => import('./pages/home/Home.tsx'))
const Redirect = lazy(() => import('./Redirect.tsx'))

import Page from './Page.tsx'
import Blog from './pages/blog/Blog.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          {["/", "/index.html"].map((v) => {
            return <Route path={v} element={<Page title="Home" home="/"><Home /></Page>} />
          })}
          
          <Route path="/blog" element={
            <Page title="Blog" home="/blog"><Blog /></Page>
          } />

          <Route path="/terminal" element={<Redirect to="index.html" />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
