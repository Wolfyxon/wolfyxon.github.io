export enum Answer {
    No = -1,
    Idk = 0,
    Yes = 1, 
}

export type Test = {
    statements: string[],
    candidates: Candidate[]
}

export type Candidate = {
    name: string,
    icon?: string,
    answers: Answer[]
}
