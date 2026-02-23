import "./Header.css"

export default function Header(props: {title?: string, home?: string, sub?: string}) {
    return (
        <header>
            <div id="header-title">
                <div>
                    <a href="/" id="header-title-home-link" translate="no">
                        Wolfyxon
                    </a>
                    
                    <span id="header-page-steps">
                        {
                            props.title && props.title != "" ? 
                                <a id="header-page-title" href={props.home ?? "/"}>
                                    <span>{props.title}</span>
                                </a> 
                            : null
                        }
                        {
                            props.sub ?
                                <span id="header-page-sub">
                                    <span>{props.sub}</span>
                                </span>
                            : null
                        }
                    </span>
                </div>
            </div>
            <nav>
            <a href="/" id="header-link-home">
                    <div>Home</div>
                </a>
                <a href="/docs" id="header-link-docs">
                    <div>Docs</div>
                </a>
                <a href="/art" id="header-link-art">
                    <div>Art</div>
                </a>
                <a href="/terminal/index.html" id="header-link-terminal">
                    <div>Terminal</div>
                </a>
            </nav>
        </header>
    );
}
