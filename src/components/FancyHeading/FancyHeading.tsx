import "./style.css";

export default function FancyHeading(data: {children: any, centered?: boolean}) {
    let className = "fancy-h";

    if(data.centered) {
        className += " fancy-h-center"
    }
    
    return (
        <h1 className={className}>
            <div>
                {data.children}
            </div>
        </h1>
    );
}