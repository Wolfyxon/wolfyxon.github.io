
export type HeadComponent = React.ReactElement<React.HTMLAttributes<HTMLHeadElement>, 'head'>
export type BodyComponent = React.ReactElement<React.HTMLAttributes<HTMLBodyElement>, 'body'>

const GLOBAL_HEAD = (<>
    <meta name="google-site-verification" content="CEp8re5xPxShHGl3Z04NXVKOKE-OgXujmu6jYVBIXqE" />
    
    <meta name="CCBot" content="nofollow" />
    <meta name="robots" content="noai, noimageai" />
    <meta name="tdm-reservation" content="1" />

    <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

    {/* css @import() broke lol */}
    {/*<link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
/>*/}
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
