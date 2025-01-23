import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import './css/colors.css'
import './css/global.css'

const Home = lazy(() => import('./pages/home/Home.tsx'))
const Redirect = lazy(() => import('./Redirect.tsx'))
const Blog = lazy(() => import('./pages/blog/Blog.tsx'))
const About = lazy(() => import('./pages/about/About.tsx'))
const Goals = lazy(() => import('./pages/goals/Goals.tsx'))

import Page from './Page.tsx'
import BlogPost from './pages/blog/BlogPost.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          {["/", "/index.html"].map((v) => {
              return <Route path={v} element={
              <Page title="Home" home="/"><Home /></Page>
            } />
          })}
          
          <Route path="/blog" element={
            <Page title="Blog" home="/blog"><Blog /></Page>
          } />

        <Route path="/blog/*" element={
            <Page title="Blog" home="/blog"><BlogPost /></Page>
          } />


          <Route path="/about" element={
            <Page title="About" home="/about"><About /></Page>
          } />

          <Route path="/goals" element={
            <Page title="Goals" home="/goals">< Goals/></Page>
          } />

          <Route path="/terminal" element={<Redirect to="index.html" />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
