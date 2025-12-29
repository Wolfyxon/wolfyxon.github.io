import "./style.css";

export default function Project(data: {title: string, description: string, thumbnail: string, children: any}) {
    return (
        <div className="project">
            <div className="project-text">
                <h2 translate="no">{data.title}</h2>
                <p>{data.description}</p>

                <div className="project-extra">
                    {data.children}
                </div>
            </div>

            <img 
                src={data.thumbnail} 
                alt="thumbnail" 
                className="project-img observing anim-obs-right anim-0-5s" 
            />
        </div>
    );
}
