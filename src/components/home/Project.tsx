export default function Project(data: {title: string, description: string, thumbnail: string, children: any}) {
    return (
        <div>
            <div className="project-text">
                <h2 translate="no">{data.title}</h2>
                <p>{data.description}</p>

                {data.children}
            </div>

            <img src={data.thumbnail} alt="thumbnail" className="observing anim-obs-right anim-0-5s" />
        </div>
    )
}
