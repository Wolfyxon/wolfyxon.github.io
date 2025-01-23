import Header from './global/Header/Header.tsx'
import Footer from './global/Footer/Footer.tsx'
import { useEffect } from 'react';

export default function Page(data: {children: any, title: string, home: string}) {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            for(const entry of entries) {
                entry.target.classList.toggle("visible", entry.isIntersecting);
            }
        })

        for(const elm of document.getElementsByClassName("observing")) {
            observer.observe(elm);
        }
    });

    return (
        <>
            <Header title={data.title} home={data.home} />

            <div id="main">
                {data.children}
            </div>

            <Footer />
        </>
    );
}
