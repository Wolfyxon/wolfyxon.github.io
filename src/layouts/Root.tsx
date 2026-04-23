export type HeadComponent = React.ReactElement<React.HTMLAttributes<HTMLHeadElement>, 'head'>
export type BodyComponent = React.ReactElement<React.HTMLAttributes<HTMLBodyElement>, 'body'>

function GlobalHead() {
    return (<>
        <meta name="google-site-verification" content="CEp8re5xPxShHGl3Z04NXVKOKE-OgXujmu6jYVBIXqE" />
    
        <meta name="CCBot" content="nofollow" />
        <meta name="robots" content="noai, noimageai" />
        <meta name="tdm-reservation" content="1" />
    </>)
}

export default function Root(props: {children: [HeadComponent, BodyComponent]}) {
    const head = props.children[0];
    const body = props.children[1];
    
    return (
        <html lang="en">
            <head>
                <GlobalHead/>
                {head.props.children}
            </head>
            <body>
                {body.props.children}
            </body>
        </html>
    )
}
