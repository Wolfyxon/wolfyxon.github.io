"use client"

import { useEffect, useState } from "react";
import { Answer, Test } from "../Lighter";
import { Content } from "@/utils";

import LighterResult from "./LighterResult";

import "../lighter.css";
import "./style.css";

const testTest: Test = {
    candidates: [
        {
            name: "A",
            icon: "/assets/media/img/ose/amogus.webp",
            answers: [-1, 1]
        },
        {
            name: "B",
            icon: "/assets/media/img/ose/john_xina.jpg",
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
    const [dispResults, setResults] = useState<Content[]>([]);

    useEffect(() => {
        const stmContainer = document.getElementById("statement-container");

        let currentTest: Test;
        let answerBlock = false;
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
            if(answerBlock) return;

            answerBlock = true;

            stmContainer!.style.opacity = "0";

            setTimeout(() => {            
                answers[currentStatementIdx] = answer;
            
                if(currentStatementIdx < currentTest.statements.length - 1) {
                    loadStatementIdx(currentStatementIdx + 1);
                } else {
                    loadResults();
                }

                answerBlock = false;
                stmContainer!.style.opacity = "1";
            }, 500);
        }

        function loadResults() {
            const matchResults: {id: number, matches: number}[] = [];

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

            setResults(matchResults.map((res, i) => {
                const percent = (res.matches / currentTest.statements.length) * 100;
                const candidate = currentTest.candidates[res.id];

                return <LighterResult candidate={candidate} percent={percent} key={i} />
            }))
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
                    <p id="statement-index-container">
                        Statement: <span id="statement-index">0/1</span>
                    </p>

                    <p id="statement">
                        {dispStatementText}
                    </p>
                    
                    <div id="answer-buttons">
                        <button id="btn-agree">AGREE</button>
                        <button id="btn-disagree">DISAGREE</button>
                        <button id="btn-idk">NO OPINION</button>
                    </div>
                </div>

                <div id="statement-selector">
                    
                </div>
            </div>
            
            <div id="results">{dispResults}</div>

        </>
    );
}