export default function Person(data: {name: string, thumbnail: string, description: string, website?: string, children?: any}) {
    return (
        <div className="observing anim-obs-grow">
            <img src={data.thumbnail} alt={data.name + "'s logo"} />
            
            <div>
                <h2 translate="no">{data.name}</h2>
                <p>{data.description}</p>

                {
                    data.children ?
                    <div className="person-links">
                        {data.children}
                    </div>
                    : null
                }

                {
                    data.website ?
                        <a href={data.website} className="person-website">{data.website}</a>
                    : null
                }
            </div>
        </div>
    );
}
