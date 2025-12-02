import { updateAiUserAgents } from "./robotsTool";

async function main() {
    console.log("CLI running");
    
    if(process.argv.includes("--update-robots")) {
        updateAiUserAgents();
    }
}

main();