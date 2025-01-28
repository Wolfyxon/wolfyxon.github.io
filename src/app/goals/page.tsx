import type { Metadata } from "next";

import Goal from "./Goal";
import GoalList from "./GoalList";

import "../css/animations.css";
import "./Goals.css";
import Page from "@/templates/Page";

export const metadata: Metadata = {
    title: "My goals - Wolfyxon",
    description: "Goals I want to achieve",
};

export default function Goals() {
    return (
        <Page category="Goals">
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
            <GoalList id="goals-in-progress">
                <Goal title="Learn music" progress={80}></Goal>
                <Goal title="Learn art" progress={43}></Goal>
                <Goal title="Learn cybersecurity" progress={10}></Goal>
                <Goal title="Make a programming language" progress={2}></Goal>
                <Goal title="Heal form social anxiety" progress={40}></Goal>
                <Goal title="Save someone's life" progress={0}></Goal>
            </GoalList>

            <h2>Complete</h2>
            <GoalList id="complete-goals">
                <Goal title="Learn programming" progress={100}></Goal>
                <Goal title="Learn Linux" progress={100}></Goal>
                <Goal title="Make a game" progress={100}></Goal>
                <Goal title="Make a nice website" progress={100}></Goal>
            </GoalList>
        </Page>
    );
}
