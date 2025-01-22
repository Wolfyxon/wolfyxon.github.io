import Header from './global/Header.tsx'
import Footer from './global/Footer.tsx'

function Page(data: {children: any}) {
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