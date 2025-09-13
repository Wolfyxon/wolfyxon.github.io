import "./Badge.css";

export default function Badge(data: {icon: string, alt: string, translate?: "no" | "yes"}) {
    return (
        <div className="badge">
            <img className="badge-img" src={"/assets/media/img/icons/" + data.icon} alt={data.alt} />
            <div className="badge-label" translate={data.translate ?? "no"}>{data.alt}</div>
        </div>
    )
}
