export default function GoalList(data: {children: any, id?: string}) {
    return (
        <div className="goals observing anim-obs-fade" id={data.id}>
            {data.children}
        </div>
    );
}