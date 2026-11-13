#!/usr/bin/env node
//@ts-ignore
import process from "node:process";
import showBanner from "./ui/banner.js";
import { program } from "commander";
import executer from "./core/executer.js";

program
  .name("termhat")
  .version("1.0.0")
  .description("Turn natural-language requests into safe terminal commands.")
  .argument("[task...]", "Describe the task you want to run")
  .option("-r, --run", "Skip menus and run the command directly")
  .option("-c, --copy", "Copy the generated command to clipboard")
  .action(async (taskArr, option) => {
    if(taskArr.length != 0) {
      const taskSentence = taskArr.join(" ");
      await executer(taskSentence, option)
    process.exit(0);
    }
  });

if(process.argv.length <= 2){
  await showBanner();
}


program.parse(process.argv);
