export default function FancyHeader(data: {children: any}) {
    return (
        <h1 className="fancy-h">
            <div>
                {data.children}
            </div>
        </h1>
    );
}