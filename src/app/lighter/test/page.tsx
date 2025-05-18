"use client"

import { useEffect, useState } from "react";
import { Answer, Test } from "../Lighter";

import "../lighter.css";

const testTest: Test = {
    candidates: [
        {
            name: "A",
            answers: [-1, 1]
        },
        {
            name: "B",
            answers: [1, 1]
        }
    ],
    statements: [
        "Idk",
        "Hi"
    ]
}

export default function LighterTestPage() {

    const [dispStatementIdx, setDispStatementIdx] = useState(0);
    const [dispStatementText, setStatementText] = useState("");

    useEffect(() => {
        let currentTest: Test;
        let answers: Answer[] = [];
        let currentStatementIdx = 0;
    
        function loadTest(test: Test) {
            currentTest = test;
    
            loadStatementIdx(0);
        }
    
        function loadStatementIdx(idx: number) {
            currentStatementIdx = idx;

            loadStatement(currentTest.statements[idx], answers[idx]);
        }
    
        function loadStatement(text: string, answer?: Answer) {
            setStatementText(text);
        }
    
        function submitAnswer(answer: Answer) {
            answers[currentStatementIdx] = answer;
            console.log(currentStatementIdx)
            if(currentStatementIdx < currentTest.statements.length - 1) {
                loadStatementIdx(currentStatementIdx + 1);
            } else {
                console.log("finish")
                loadResults();
            }
        }

        function loadResults() {
            let matchResults: {id: number, matches: number}[] = [];

            currentTest.candidates.forEach((can, canI) => {
                const matchRes = {
                    id: canI,
                    matches: 0
                }

                answers.forEach((ans, ansI) => {
                    if(can.answers[ansI] == ans) {
                        matchRes.matches++;
                    }
                });

                matchResults.push(matchRes);
            });

            matchResults.sort((a, b) => {
                return b.matches - a.matches;
            });

            console.log(matchResults);
        }

        document.getElementById("btn-agree")!.onclick = () => submitAnswer(Answer.Yes);
        document.getElementById("btn-disagree")!.onclick = () => submitAnswer(Answer.No);
        document.getElementById("btn-idk")!.onclick = () => submitAnswer(Answer.Idk);

        loadTest(testTest);
    }, []);

    return (
        <>
            <div id="test">
                <div id="statement-container">
                    <p>
                        Statement: <span id="statement-index">0/1</span>
                    </p>

                    <p id="statement">
                        {dispStatementText}
                    </p>
                    
                    <div id="answer-buttons">
                        <button id="btn-agree">Agree</button>
                        <button id="btn-disagree">Disagree</button>
                        <button id="btn-idk">No opinion</button>
                    </div>
                </div>

                <div id="statement-selector">
                    
                </div>
            </div>
            
            <div id="results">
        
            </div>

        </>
    );
}