import "./Tag.css";

export default function Tag(data: {children: any}) {
    return (
        <span className="tag">{data.children}</span>
    )
}