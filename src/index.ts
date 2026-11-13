#!/usr/bin/env node
//@ts-ignore
import process from "node:process";
import showBanner from "./banner.js";
import { program } from "commander";
import executer from "./executer.js";

program
  .name("termHat")
  .version("1.0.0")
  .description("Give natural language prompt stating what you want to do.")
  .argument("[task...]", "specify task to work")
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
