//@ts-ignore
import process from "node:process";
import pc from "picocolors";
import * as p from "@clack/prompts";
import executer from "./executer.js";
import figlet from "figlet";
import { connectToAI } from "./ai/helper.js";

export default async function home() {
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
    await executer(request as string, "no option");
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
        pc.bold("1. Ask for something"),
        `   ${pc.magenta(`th ${pc.green("create a folder named projects")}`)}`,
        "",
        pc.bold("2. Review the command"),
        "   TermHat understands your request and shows",
        "   you the command it plans to run.",
        "",
        pc.bold("3. Choose what to do"),
        "   Execute it, or understand it first.",
        "",
        pc.bold(pc.green("You're in control.")),
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
    await executer(choose as string);
    process.exit(0);
  }

  if (opt === "configure") {
    const chooseAi = await p.select({
      message: `${pc.cyan("Choose your AI provider ")}${pc.yellow("(replaces any previous setup): ")}`,
      options: [
        { value: "gemini", label: "Google Gemini", hint: "Free tier available (Recommended)"},
        { value: "openai", label: "OpenAI", hint: "Paid API credits required" },
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

  if (opt === "exit") {
    p.outro(pc.green("Thanks for using TermHat! See you next time."));
    p.cancel("Exit");
  }

}
