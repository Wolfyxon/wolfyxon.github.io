import { checkedUpdateAiUserAgents, updateAiUserAgents } from "./robotsTool";

async function main() {
    console.log("CLI running");
    
    if(process.argv.includes("--update-robots")) {
        updateAiUserAgents();
    } else if(process.argv.includes("--check-update-robots")) {
        checkedUpdateAiUserAgents();
    }
}

main();