// we were doing react in school and I made this out of boredom
// please don't ask
"use client"

import React from "react";
import "./style.css";

class Pissing extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {pissTarget: "pralki"};
  }
  
  render() {
    return <h1>Sikam do {(this.state as any).pissTarget}</h1>
  }
}

export default function SikamDoPralki() {
    return <Pissing />
}