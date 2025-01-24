import PieBar from "../components/PieBar/PieBar";

export default function Goal(data: {title: string, progress: number}) {
    return (
        <div className="goal">
            <div className="goal-header-container">
                <div className="goal-header">
                    <PieBar progress={data.progress} />
                    <h3>{data.title}</h3>
                </div>
            </div>
        </div>
    );
}