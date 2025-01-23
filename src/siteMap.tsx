import { lazy } from "react"

const Home = lazy(() => import('./pages/home/Home.tsx'))
const Blog = lazy(() => import('./pages/blog/Blog.tsx'))
const About = lazy(() => import('./pages/about/About.tsx'))
const Goals = lazy(() => import('./pages/goals/Goals.tsx'))

export type PageData = {
    title?: string,
    home?: string,
    element: JSX.Element
}

export const pages = {
    "/": {
        title: "Home",
        element: <Home />
    },
    "/blog": {
        title: "Blog",
        element: <Blog />
    },
    "/about": {
        title: "About",
        element: <About />
    },
    "/goals": {
        title: "Goals",
        element: <Goals />
    }
}