"use client"

import { ReactNode, useEffect, useState } from "react";
import { Answer, Test } from "../Lighter";

import LighterResult from "../result/LighterResult";

import "./LighterTest.css";

export default function LighterTest(props: {test: Test}) {

    const [dispStatementIdx, setDispStatementIdx] = useState("");
    const [dispStatementText, setStatementText] = useState("");
    const [dispResults, setResults] = useState<ReactNode[]>([]);

    useEffect(() => {
        const stmContainer = document.getElementById("statement-container");
        const resultsContainer = document.getElementById("results");
        const selector = document.getElementById("statement-selector");

        const btnAgree = document.getElementById("btn-agree")!;
        const btnDisagree = document.getElementById("btn-disagree")!;
        const btnIdk = document.getElementById("btn-idk")!;

        let currentTest: Test;
        let answerBlock = false;
        let answers: Answer[] = [];
        let currentStatementIdx = 0;
        
        function loadTest(test: Test) {
            currentTest = test;
    
            for(let i = 0; i < test.statements.length; i++) {
                const btn = document.createElement("button");
                
                btn.onclick = () => loadStatementIdx(i);
                btn.innerText = `${i + 1}`;

                selector!.append(btn);
            }

            loadStatementIdx(0);
        }
    
        function loadStatementIdx(idx: number) {
            if(idx > answers.length) return;
            if(answerBlock) return;

            answerBlock = true;
            stmContainer!.style.opacity = "0";

            currentStatementIdx = idx;

            for(let i = 0; i < selector!.children.length; i++) {
                const elm = selector!.children[i];
                elm.className = currentStatementIdx == i ? "current" : "";
            }

            setTimeout(() => {
                setDispStatementIdx(`${idx + 1}/${currentTest.statements.length}`);
                loadStatement(currentTest.statements[idx], answers[idx]);

                answerBlock = false;
                stmContainer!.style.opacity = "1";
            }, 500);
        }

        function setCurrentAnswer(answer?: Answer) {
            btnAgree.className = answer == Answer.Yes ? "current" : "";
            btnDisagree.className = answer == Answer.No ? "current" : "";
            btnIdk.className = answer == Answer.Idk ? "current" : "";
        }
    
        function loadStatement(text: string, answer?: Answer) {
            setCurrentAnswer(answer);
            setStatementText(text);
        }
    
        function submitAnswer(answer: Answer) {
            answers[currentStatementIdx] = answer;
            setCurrentAnswer(answer);
        
            if(currentStatementIdx < currentTest.statements.length - 1) {
                loadStatementIdx(currentStatementIdx + 1);
            } else {
                loadResults();
            }
        }

        function loadResults() {
            const matchResults: {id: number, matches: number}[] = [];

            stmContainer!.style.display = "none";
            selector!.style.display = "none";
            resultsContainer!.style.visibility = "visible";

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
        
        btnAgree.onclick = () => submitAnswer(Answer.Yes);
        btnDisagree.onclick = () => submitAnswer(Answer.No);
        btnIdk.onclick = () => submitAnswer(Answer.Idk);

        loadTest(props.test);
    }, []);

    return (
        <>
            <div id="test">
                <div id="statement-container">
                    <p id="statement-index-container">
                        Statement: <span id="statement-index">{dispStatementIdx}</span>
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

                <div id="statement-selector"></div>
            </div>
            
            <div id="results" style={{visibility: "hidden"}}>
                <h1 id="results-header">Results:</h1>
                {dispResults}

                <a href="" id="retake">Take the test again</a>
            </div>
        </>
    );
}