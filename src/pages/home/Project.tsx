function Project(data: {title: string, description: string, thumbnail: string, children: any}) {
    return (
        <div className="observing anim-obs-fade">
            <div className="project-text">
                <h2>{data.title}</h2>
                <p>{data.description}</p>

                {data.children}
            </div>

            <img src={data.thumbnail} alt="thumbnail" />
        </div>
    )
}

export default Project