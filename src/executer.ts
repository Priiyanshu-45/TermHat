//@ts-ignore
import process from "node:process"
//@ts-ignore
import { execSync } from "node:child_process";
import * as p from "@clack/prompts";
import pc from "picocolors";
import responseByAI from "./request.js";


export default async function executer(task : string, option : string) {
    const response = await responseByAI(task);

    p.intro(pc.green("Understanding your intent..."));
    const spin = p.spinner({
      onCancel: () => {
        p.outro(pc.yellow("User pressed Ctrl+C."));
        process.exit(0);
      },
    });
    spin.start(pc.cyan("Thinking through the best way..."));
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (!response) {
      spin.error();
      p.outro(pc.yellow("Couldn't complete that action."));
    } else {
      spin.stop(pc.cyanBright(pc.cyan("Got it.")));

    if(option == "--a")  {

    }

    const choice = await p.select({
        message: "How would you like to proceed: ",
        options: [
          {
            value: "execute",
            label: "Execute",
            hint: "Run it now",
          },
          {
            value: "explain",
            label: "Explain",
            hint: "Learn, then run",
          },
        ],
      });

      if (p.isCancel(choice)) {
        p.outro(pc.green("No changes made. You're in control."));
        process.exit(0);
      }

      if (choice === "explain") {
        console.log(pc.green("Why this command? ") + pc.gray(response.explain));
        console.log(
          `\n${pc.yellow("Command: ")}$${pc.green(response.command)}`,
        );
      }

      const shouldExecute = await p.confirm({
        message: `${pc.red("Ready to execute:")} ${pc.greenBright(response.command)}?`,
      });

      if (p.isCancel(shouldExecute)) {
        p.outro(pc.yellow("Execution cancelled."));
        process.exit(0);
      }

      if (shouldExecute) {
        try {
          execSync(response.command, { stdio: "inherit" });
          console.log(pc.green("\nCommand ran successfully."));
        } catch (error) {
          console.log(pc.red("\nThe command exited with an error."));
        }
      }
    }
    p.outro("Thanks for using termHat.");
}