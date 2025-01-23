import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { pages } from "./siteMap.ts" 

import './css/colors.css'
import './css/global.css'

const Redirect = lazy(() => import('./Redirect.tsx'))

import Page from './Page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          {
            Object.entries(pages).map((entry) => {        
              const path = entry[0];
              const page = entry[1];

              const Element = lazy(() => import(page.module));
              const pageElm = <Page title={page.title} home=''> <Element/> </Page>
              
              return (
                <>
                  <Route path={path} element={pageElm}/>
                  <Route path={path + "/index.html"} element={pageElm}/>
                </>
              );
            })
          }

          <Route path="/terminal" element={<Redirect to="index.html" />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
