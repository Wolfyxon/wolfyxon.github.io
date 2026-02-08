// we were doing react in school and I made this out of boredom
// please don't ask
"use client"

import React from "react";
import "./style.css";

type PissingProps = { target: string };

class Pissing extends React.Component<PissingProps> {
  constructor(props: PissingProps) {
    super(props);
  }
  
  render() {
    return <h1>Sikam do {(this.props as PissingProps).target}</h1>
  }
}

export default function SikamDoPralki() {
    return <Pissing target="pralki"  />
}
