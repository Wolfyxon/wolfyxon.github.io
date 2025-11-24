import { capitalize } from "@/util/string";
import { MONTHS } from "@/util/time";

export type DrawingData = {
    title: string,
    date: string,
    src: string
};

export default function Drawing(props: {data: DrawingData}) {
    const data = props.data;
    const date = new Date(data.date);

    return (
        <div className="drawing observing anim-obs-fade">
            <img src={data.src} alt={data.title} />
            
            <div className="drawing-text">
                <div className="drawing-title">
                    {data.title}
                </div>

                <div className="drawing-date">
                    {
                        `${capitalize(MONTHS[date.getMonth()])} ${date.getDate()}, ${date.getFullYear()}`
                    }
                </div>
            </div>
        </div>
    );
}
