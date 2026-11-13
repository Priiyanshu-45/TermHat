//@ts-ignore
import process from "node:process";
//@ts-ignore
import { execSync } from "node:child_process";
import * as p from "@clack/prompts";
import pc from "picocolors";
import responseByAI from "./request.js";

export default async function executer(task: string, option: any = null) {
  p.intro(pc.green("Understanding your intent..."));
  const spin = p.spinner({
    onCancel: () => {
      p.outro(pc.yellow("User pressed Ctrl+C."));
      process.exit(0);
    },
  });
  spin.start(pc.cyan("Thinking through the best way"));
  const response = await responseByAI(task);
  if (!response) {
    spin.error();
    p.outro(pc.yellow("Couldn't complete that action."));
  } else {
    spin.stop(pc.cyanBright(pc.cyan("Got it.")));

    // if(option)  {

    // }
    console.log(response);
  }
}
