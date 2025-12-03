
export type HeadComponent = React.ReactElement<React.HTMLAttributes<HTMLHeadElement>, 'head'>
export type BodyComponent = React.ReactElement<React.HTMLAttributes<HTMLBodyElement>, 'body'>

const GLOBAL_HEAD = (<>
    <meta name="google-site-verification" content="CEp8re5xPxShHGl3Z04NXVKOKE-OgXujmu6jYVBIXqE" />
    
    <meta name="CCBot" content="nofollow" />
    <meta name="robots" content="noai, noimageai" />
    <meta name="tdm-reservation" content="1" />

    <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
</>);

export default function Root(props: {children: [HeadComponent, BodyComponent]}) {
    const head = props.children[0];
    const body = props.children[1];
    
    return (
        <html lang="en">
            <head>
                {GLOBAL_HEAD}
                {head.props.children}
            </head>
            <body>
                {body.props.children}
            </body>
        </html>
    )
}
