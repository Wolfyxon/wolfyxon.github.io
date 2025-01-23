import "../../css/animations.css"
import "./Goals.css"

export default function Goals() {
    return (
        <>
            <div id="header" className="observing anim-obs-left">
                <h1>My goals</h1>
                <p>
                    Here's a list of things I want to achieve in life.
                </p>
                <p>
                    The progress pie shows how I'm satisfied with the progress a goal.
                </p>
            </div>

            <h2>In progress</h2>
            <div className="goals observing anim-obs-fade" id="goals-in-progress"></div>

            <h2>Complete</h2>
            <div className="goals observing anim-obs-fade" id="complete-goals"></div>
        </>
    );
}
