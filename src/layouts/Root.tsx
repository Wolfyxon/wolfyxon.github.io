
export type HeadComponent = React.ReactElement<React.HTMLAttributes<HTMLHeadElement>, 'head'>
export type BodyComponent = React.ReactElement<React.HTMLAttributes<HTMLBodyElement>, 'body'>


export default function Root(props: {children: [HeadComponent, BodyComponent], lang?: string}) {
    const head = props.children[0];
    const body = props.children[1];
    
    return (
        <html lang={props.lang}>
            <head>
                <meta name="google-site-verification" content="CEp8re5xPxShHGl3Z04NXVKOKE-OgXujmu6jYVBIXqE" />

                <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>

                {/* css @import() broke lol */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"></link>

                {head.props.children}
            </head>
            <body>
                {body.props.children}
            </body>
        </html>
    )
}
