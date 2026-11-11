//@ts-ignore
import process from "node:process"
//@ts-ignore
import { execSync } from "node:child_process";
import pc from "picocolors";
import * as p from "@clack/prompts";
import executer from "./executer.js";

export default async function home() {
    const opt = await p.select({
        message: "What would you like to do?",
        options: [
            {
                value: "request",
                label: "Make a request",
                hint: "Describe a task",
            },
            {
                value: "learn",
                label: "Learn TermHat",
                hint: "Explore commands and examples",
            },
            {
                value: "configure",
                label: "Configure AI provider",
                hint: "Connect or change your AI provider",
            },
            {
                value: "exit",
                label: "Exit",
                hint: "Close TermHat",
            },
        ],
    });

    if (p.isCancel(opt)) {
        console.log(pc.red("User pressed Ctrl+C."));
        //@ts-ignore
        process.exit(0);
    }

    if (opt === "request") {
        const request = await p.text({
            message: "Enter your request: ",
            placeholder: "e.g. Create a folder project.",
            validate: (value) => {
                if (!value || value.length < 2) {
                    return pc.yellow("Enter valid request.");
                }
                return undefined
            }
        });
        if (p.isCancel(request)) {
            pc.dim("Request cancelled.");
            process.exit(0);
        }
        await executer(request as string, "no option")
        process.exit(0);
    }

}

