import "./style.css";

export default function TextIcon(data: {src: string, alt: string}) {
    return (
        <img src={data.src} alt={data.alt} className="text-icon" />
    );
}