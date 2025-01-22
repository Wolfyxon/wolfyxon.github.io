import Header from './global/Header.tsx'
import Footer from './global/Footer.tsx'
import { useEffect } from 'react';

function Page(data: {children: any}) {
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
            <Header />

            <div id="main">
                {data.children}
            </div>

            <Footer />
        </>
    );
}

export default Page