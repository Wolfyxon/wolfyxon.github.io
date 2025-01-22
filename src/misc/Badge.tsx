function Badge(data: {icon: string, alt: string}) {
    return (
        <img className="badge" src={"/assets/media/img/icons/" + data.icon} alt={data.alt} />
    )
}

export default Badge;