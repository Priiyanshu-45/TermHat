import { askGemini } from "./ai/gemini.js";
import { getConfig } from "./util/config.js";
import { buildUserPrompt } from "./util/context.js";
import pc from "picocolors";

export default async function responseByAI(task : string) {
    const userRequest = buildUserPrompt(task);
    const ai = getConfig().provider;

    switch (ai) {
        case "gemini":
            return await askGemini(userRequest)
        
        default:
            console.log(pc.red(`Unsupported AI Provider: ${ai}`))
    }

}