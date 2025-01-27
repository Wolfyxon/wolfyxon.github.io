import { PostData } from "../blog";
import "./PostCard.css";

export default function PostCard(data: {post: PostData, key?: any}) {
    return (
        <a className="post-card" href={data.post.slug} key={data.key}>
            <h1 className="post-card-title">
                {data.post.title}
            </h1>
            <p className="post-card-description">
                {data.post.description}
            </p>
            <p className="post-card-date">
                {data.post.date.toDateString()}
            </p>

            <div className="post-card-topics">
                {
                    data.post.topics.map((topic, i) => {
                        return <div key={i}>{topic}</div>
                    })
                }
            </div>
        </a>
    )
}