import { checkedUpdateAiUserAgents, updateAiUserAgents } from "./robotsTool";
import { runUnitTests } from "./tests";

async function main() {
    console.log("CLI running");
    
    if(process.argv.includes("--update-robots")) {
        updateAiUserAgents();
    } else if(process.argv.includes("--check-update-robots")) {
        checkedUpdateAiUserAgents();
    } else if(process.argv.includes("--test")) {
        runUnitTests();
    }
}

main();
