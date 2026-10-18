import "./style.css";

export type ProjectProps = {
    title: string,
    description: string,
    thumbnail: string,
    links: Record<string, string>,
    children?: any
};

export default function Project(props: ProjectProps) {
    return (
        <div className="project observing anim-obs-fade">
            <div className="project-text">
                <div className="project-title">{props.title}</div>
                <div className="project-description">{props.description}</div>

                <div className="project-sub">
                    {
                        props.links ?
                        Object.entries(props.links).map(([name, url]) => 
                            <a href={url} key={name}>{name}</a>
                        )
                        : null
                    }
                    {props.children}
                </div>
            </div>
            <a 
                className="project-thumbnail-container"
                href={Object.entries(props.links)[0][1]}
                target="_blank"
            >
                <img className="project-thumbnail" src={props.thumbnail} alt="Thumbnail"/>      
            </a>   
        </div>
    )
}

/*
export default function Project(props: {title: string, description: string, thumbnail: string, children: any}) {
    return (
        <div className="project">
            <div className="project-text">
                <h2 translate="no">{props.title}</h2>
                <p>{props.description}</p>

                <div className="project-extra">
                    {props.children}
                </div>
            </div>

            <img 
                src={props.thumbnail} 
                alt="thumbnail" 
                className="project-img observing anim-obs-right anim-0-5s" 
            />
        </div>
    );
}
*/