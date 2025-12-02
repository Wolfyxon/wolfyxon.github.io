
import robots, { AI_USER_AGENTS_PATH, AiUserAgentData, getAiUserAgentData } from "@/app/robots";
import { getISODate } from "@/util/time";
import { writeFileSync } from "fs";

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
    console.log(`Getting ${JSON_URL}`);
    
    const res = await fetch(JSON_URL);
    const json = await res.json();

    return json as AIRobotsJson;
}

async function queryAIBotAgents() {
    const json = await queryAIBots();
    return Object.keys(json);
}

async function updateAiUserAgents(data?: AiUserAgentData) {
    data = data ?? await getAiUserAgentData();

    console.log("Updating AI crawler UserAgents...");

    try {
        const recvAgents = await queryAIBotAgents();
        const newAgents: string[] = [];
        let count = 0;

        for(const agent of recvAgents) {
            if(!data.userAgents.includes(agent)) {
                data.userAgents.push(agent);
                newAgents.push(agent)
                count++;
            }
        }

        console.log(`Total new UserAgents: ${count}`);
        console.log(newAgents);

        data.userAgents.sort();
        data.lastUpdate = getISODate();

        const str = JSON.stringify(data, null, 2);
        await writeFileSync(AI_USER_AGENTS_PATH, str);

        console.log("Update successful");

    } catch(e) {
        console.error(`Unable to update: ${e}`);
    }
}

async function checkedUpdateAiUserAgents() {
    const data = await getAiUserAgentData();

    const now = new Date(getISODate()).getTime();
    const then = new Date(data.lastUpdate).getTime();
    const updateInterval = 7 * 60 * 60 * 60 * 24; // 7 days. TODO: improve readability

    if(isNaN(then)) {
        console.error(`Unable to parse date from '${data.lastUpdate}'. AI user agent update check failed.`);
        return;
    }

    if(now - then <= updateInterval) {
        console.log("Not updating AI UserAgents, an update was recently performed already.");
        return;
    }

    updateAiUserAgents(data);
}

checkedUpdateAiUserAgents();