export default function Collaborator(data: {name: string, thumbnail: string, description: string, website?: string, children: any}) {
    return (
        <div className="observing">
            <img src={data.thumbnail} alt={data.name + "'s logo"} />
            
            <div>
                <h2>{data.name}</h2>
                <p>{data.description}</p>

                <div className="collaborator-links">
                    {data.children}
                </div>

                {
                    data.website ?
                        <a href={data.website}>{data.website}</a>
                    : null
                }
            </div>
        </div>
    )
}