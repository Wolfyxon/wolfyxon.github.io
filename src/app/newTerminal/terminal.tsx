"use client";

import { Command } from "./Command";

export const COMMANDS: Command[] = [];

export function getConsole(): HTMLPreElement {
    return document.getElementById("console")! as HTMLPreElement;
}

export function getPrompt(): HTMLLabelElement {
    return document.getElementById("prompt")! as HTMLLabelElement;
}

export function getInput(): HTMLInputElement {
    return document.getElementById("input")! as HTMLInputElement;
}