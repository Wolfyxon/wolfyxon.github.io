export default function Badge(data: {icon: string, alt: string}) {
    return (
        <img className="badge-img" src={"/assets/media/img/icons/" + data.icon} alt={data.alt} />
    )
}
