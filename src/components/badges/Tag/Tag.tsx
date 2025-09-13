import "./Tag.css";

export default function Tag(data: {children: any, url?: string}) {
    return data.url ? (
        <a className="tag" href={data.url}>{data.children}</a>
    ) : (
        <span className="tag link-tag">{data.children}</span>
    )
}