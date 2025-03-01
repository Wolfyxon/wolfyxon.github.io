
import "./LargeBadge.css";

export default function LargeBadge(data: {icon: string, title: string, url?: string}) {
    return (
        <div className="large-badge">
            <img src={data.icon} />

            <div className="large-badge-title">
                {data.title}
            </div>
        </div>
    )
}