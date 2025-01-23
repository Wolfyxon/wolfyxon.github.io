export type PageData = {
    title?: string,
    home?: string,
    module: string
}

export const pages = {
    "/": {
        title: "Home",
        module: './pages/home/Home.tsx'
    },
    "/blog": {
        title: "Blog",
        module: './pages/blog/Blog.tsx'
    },
    "/about": {
        title: "About",
        module: './pages/about/About.tsx'
    },
    "/goals": {
        title: "Goals",
        module: './pages/goals/Goals.tsx'
    }
}