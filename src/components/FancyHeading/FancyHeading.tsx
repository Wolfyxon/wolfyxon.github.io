import "./FancyHeading.css";

export default function FancyHeading(data: {children: any}) {
    return (
        <h1 className="fancy-h">
            <div>
                {data.children}
            </div>
        </h1>
    );
}