//@ts-ignore
import process from "node:process";
import pc from "picocolors";
import * as p from "@clack/prompts";
import executer from "../core/executer.js";
import figlet from "figlet";
import { connectToAI } from "../ai/connect.js";
import { getConfig } from "../util/config.js";


async function configure() {
  const chooseAi = await p.select({
      message: `${pc.cyan("Choose your AI provider ")}${pc.yellow("(replaces any previous setup): ")}`,
      options: [
        { value: "gemini", label: "Google Gemini", hint: "Free tier available (Recommended)"},
        // { value: "openai", label: "OpenAI", hint: "Paid API credits required" },
      ],
    });
    if(p.isCancel(chooseAi)){
      console.log(pc.yellow("Cancelled"))
      process.exit(0);
    }
    if(chooseAi === "gemini"){
      await connectToAI(chooseAi);
    }
}

export default async function home() {
  if(!getConfig().apiKey) {
    await configure();
    if(!getConfig().apiKey) process.exit(0);
  }

  const opt = await p.select({
    message: "What would you like to do?",
    options: [
      {
        value: "request",
        label: "Make a request",
        hint: "Describe what you want to do in plain English.",
      },
      {
        value: "learn",
        label: "Learn TermHat",
        hint: "See how to create, manage and work with files using natural language.",
      },
      {
        value: "configure",
        label: "Configure AI provider",
        hint: "Connect your API key and choose your AI model.",
      },
      {
        value: "exit",
        label: "Exit",
      },
    ],
  });

  if (p.isCancel(opt)) {
    console.log(pc.red("User pressed Ctrl+C."));
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
        return undefined;
      },
    });
    if (p.isCancel(request)) {
      p.outro(pc.dim("Request cancelled."));
      process.exit(0);
    }
    await executer(request as string, {});
  }

  if (opt === "learn") {
    console.clear();
    const heading = figlet.textSync("A quick guide to TermHat.", {
      font: "Mini",
      horizontalLayout: "fitted",
    });
    console.log(heading);
    p.intro(pc.inverse("Using TermHat is simple."));
    p.box(
      [
        pc.bold("1. Describe what you want"),
        `   ${pc.magenta(`th ${pc.green("create a folder named projects")}`)}`,
        "",
        pc.bold("2. Review the command"),
        "   TermHat turns your request into a real terminal",
        "   command and shows it to you before anything runs.",
        "",
        pc.bold("3. Choose what to do"),
        "   Run it, copy it, or read an explanation first.",
        "   Risky commands ask for extra confirmation.",
        "",
        pc.bold("4. Some commands are manual"),
        "   Things like moving into a folder or activating an",
        "   environment can't be run by TermHat. You get the",
        "   command to paste into your terminal yourself.",
        "",
        pc.bold("5. Quick options"),
        `   ${pc.magenta(`th ${pc.green("-r")} <task>`)}  skip the menu, then confirm and run`,
        `   ${pc.magenta(`th ${pc.green("-c")} <task>`)}  copy the command instead of running it`,
        "",
        pc.bold(pc.green("You're always in control.")),
      ].join("\n"),
      "How TermHat works",
      {
        contentAlign: "left",
        titleAlign: "center",
        width: "auto",
        rounded: true,
      },
    );
    const choose = await p.select({
      message: "A few things to try: ",
      options: [
        {
          value: "show all files here",
          label: `${pc.magenta(`th ${pc.green("show all files here")}`)}`,
        },
        {
          value: "create a file named notes.txt",
          label: `${pc.magenta(`th ${pc.green("create a file named notes.txt")}`)}`,
        },
        {
          value: "make a folder called workspace",
          label: `${pc.magenta(`th ${pc.green("make a folder called workspace")}`)}`,
        },
      ],
    });
    if (p.isCancel(choose)) {
      console.log(pc.red("User pressed Ctrl+C."));
      process.exit(0);
    }
    await executer(choose as string, {});
    process.exit(0);
  }

  if (opt === "configure") {
    await configure();
  }

  if (opt === "exit") {
    p.outro(pc.green("Thanks for using TermHat! See you next time."));
  }

}