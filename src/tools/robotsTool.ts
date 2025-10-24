
import robots from "@/app/robots";

type RobotsRule = {
    userAgent: string | string[];
    allow?: string | string[] | undefined;
    disallow?: string | string[] | undefined;
    crawlDelay?: number | undefined;
};

type AIRobotsJsonEntry = {
    operator: string,
    respect: string,
    function: string,
    frequency: string,
    description: string
};

type AIRobotsJson = Record<string, AIRobotsJsonEntry>; // key is the user agent

const JSON_URL = "https://github.com/ai-robots-txt/ai.robots.txt/raw/refs/heads/main/robots.json";

async function queryAIBots(): Promise<AIRobotsJson> {
    const res = await fetch(JSON_URL);
    const json = await res.json();

    return json as AIRobotsJson;
}

async function queryAIBotAgents() {
    const json = await queryAIBots();
    return Object.keys(json);
}

function userAgentsToString(array: string[]): string {
    let res = "";
    array.sort();

    for(let i = 0; i < array.length; i++) {
        res += `"${array[i]}"`;

        if(i != array.length - 1) {
            res += ",\n";
        }
    }

    return res;
}

function getLocalAIAgents(): string[] {
    for(const rule of robots().rules as RobotsRule[]) {
        if(rule.disallow == "/" && rule.userAgent.includes("GPTBot")) {
            return rule.userAgent as string[];
        }
    }

    throw "AI user agents rule not found";
}

async function updateAi() {
    console.log(`Downloading registry...`);

    const agents = await queryAIBotAgents();
    const localAgents = getLocalAIAgents();

    let newCount = 0;

    for(const ag of agents) {
        if(!localAgents.includes(ag)) {
            localAgents.push(ag);
            newCount++;        
        }
    }

    console.log("New array:\n");
    console.log(userAgentsToString(localAgents));
    console.log(`Total new: ${newCount}`);
}

updateAi();