import "./LargeBadge.css";

export default function LargeBadge(data: {icon: string, title: string, url?: string}) {
    const content = (
        <>
            <img src={data.icon} />

            <div className="large-badge-title">
                {data.title}
            </div>
        </>
    );
    
    return data.url ? (
        <a className="large-badge" href={data.url}>
            {content}
        </a>
    ) : (
        <div className="large-badge">
            {content}
        </div>
    )
}