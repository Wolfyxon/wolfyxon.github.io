import "./Header.css"

export default function Header(data: {title?: string, home?: string}) {
    return (    
        <header>
            <div id="header-title">
                <div>
                    <a href="/" id="header-title-home-link" translate="no">
                        Wolfyxon
                    </a>
                    
                    {
                        data.title && data.title != "" ? 
                            <a id="header-page-title" href={data.home ?? "/"}>
                                <span>{data.title}</span>
                            </a> 
                        : null
                    }
                </div>
            </div>
            <nav>
                <a href="/about" id="header-link-about">
                    <div>About</div>
                </a>
                <a href="/goals" id="header-link-goals">
                    <div>Goals</div>
                </a>
                <a href="/terminal/index.html" id="header-link-terminal">
                    <div>Terminal</div>
                </a>
            </nav>
        </header>
    );
}
