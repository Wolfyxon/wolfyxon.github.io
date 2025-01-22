function Badge(icon: string, alt: string) {
    return (
        <img className="badge" src={"/assets/img/icons/" + icon} alt={alt} />
    )
}

export default Badge;