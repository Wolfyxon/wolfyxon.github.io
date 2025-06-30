import { Candidate } from "../Lighter";

import "./CandidateResult.css";

export default function LighterResult(props: {candidate: Candidate, percent: number}) {
    return (
        <div className="candidate-result">
            <div className="candidate-icon-container">
                <img src={props.candidate.icon} className="candidate-icon" />
                <div className="candidate-name">{props.candidate.name}</div>
            </div>
            <div className="candidate-bar">
                <div className="candidate-bar-inner" style={{width: `${props.percent}%`}}></div>
            </div>
            <div className="candidate-percent">
                {Math.round(props.percent)}%
            </div>
        </div>
    )
}
