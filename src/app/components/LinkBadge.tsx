export default function LinkBadge(data: {url: string, icon: string, alt: string}) {
    return (
        <a href={data.url}>
            <img className="badge" src={"/assets/media/img/icons/" + data.icon} alt={data.alt} />
        </a>
    );
}
