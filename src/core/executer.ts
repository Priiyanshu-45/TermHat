//@ts-ignore
import process from "node:process";
//@ts-ignore
import { execSync } from "node:child_process";
import * as p from "@clack/prompts";
import pc from "picocolors";
import clipboard from "clipboardy";
import responseByAI from "../ai/request.js";
import type { CLIOptions } from "../util/types.js";

function quit(msg: string) {
  p.outro(msg);
  process.exit(0);
}

function copyCommand(command: string) {
  try {
    clipboard.writeSync(command);
    console.log(pc.green("Successfully copied to clipboard."));
  } catch {
    console.log(pc.yellow("Couldn't access the clipboard. Copy it manually:"));
    console.log(pc.green(command));
  }
}

function runCommand(command: string) {
  try {
    execSync(command, { stdio: "inherit" });
    console.log(pc.green("\nCommand ran successfully."));
  } catch {
    console.log(pc.red("\nThe command exited with an error."));
    console.log(pc.dim("Earlier steps of a chained command may already have run."));
  }
}


async function askConfirmation(response: any): Promise<boolean> {
  const cmd = response.command as string;
  let result: any;

  switch (response.data_loss_risk) {
    case "POSSIBLE":
      result = await p.confirm({
        message: `${pc.red("This may overwrite existing files.")} Run $${pc.yellow(cmd)}?`,
        initialValue: false,
      });
      break;

    case "EXPECTED":
    case "UNKNOWN": {
      const warning =
        response.data_loss_risk === "EXPECTED"
          ? "Destructive action detected."
          : "Command impact is unknown.";
      result = await p.text({
        message: `${pc.red(warning)} Type ${pc.inverse(" CONFIRM ")} to run $${pc.red(cmd)} (Enter to cancel):`,
        validate: (value) => {
          const v = value?.trim();
          if (v && v !== "CONFIRM") return 'Type "CONFIRM" or press Enter to cancel.';
          return undefined;
        },
      });
      if (!p.isCancel(result)) result = result?.trim() === "CONFIRM";
      break;
    }

    default: 
      result = await p.confirm({
        message: `Run $${pc.green(cmd)} in your terminal?`,
        initialValue: true,
      });
  }

  if (p.isCancel(result)) quit(pc.yellow("Execution cancelled."));
  return result === true;
}

export default async function executer(task: string, option: CLIOptions) {
  const quick = option.run || option.copy;

  
  let spin: ReturnType<typeof p.spinner> | null = null;
  if (!quick) {
    p.intro(pc.green("Understanding your intent..."));
    spin = p.spinner({
      onCancel: () => quit(pc.yellow("User pressed Ctrl+C.")),
    });
    spin.start(pc.cyan("Thinking through the best way"));
  }

  const response = await responseByAI(task);

  if (!response) {
    if (spin) spin.error();
    quit(pc.yellow("Couldn't complete that action."));
    return;
  }
  if (spin) spin.stop();

  
  if (response.status !== "READY" && response.status !== "MANUAL") {
    console.log(pc.yellow(response.message ?? "Couldn't complete that action."));
    process.exit(0);
  }

  
  if (!response.command || !response.command.trim()) {
    console.log(pc.red("The AI returned no command. Nothing was run."));
    process.exit(1);
  }

  const command: string = response.command;

  
  if (option.copy) {
    copyCommand(command);
    process.exit(0);
  }

  
  if (response.status === "MANUAL") {
    p.note(
      [
        pc.yellow(response.message ?? ""),
        "",
        pc.yellow(response.explanation ?? ""),
        "",
        `${pc.magenta("Paste this yourself:")} ${pc.bold(pc.greenBright(`$${command}`))}`,
      ].join("\n"),
      pc.yellow("Manual step needed"),
    );
    const wantCopy = await p.confirm({
      message: "Copy it to your clipboard?",
      initialValue: true,
    });
    if (p.isCancel(wantCopy) || !wantCopy) quit(pc.green("Nothing was copied or run."));
    copyCommand(command);
    quit("Thanks for using termHat.");
    return;
  }

  
  if (response.message) console.log(pc.yellow(response.message));

  
  if (!process.stdin.isTTY) {
    console.log(pc.red("TermHat needs an interactive terminal to confirm. Nothing was run."));
    process.exit(1);
  }

  let choice: any = "execute";


  if (!option.run) {
    choice = await p.select({
      message: "How would you like to proceed: ",
      options: [
        { value: "execute", label: "Execute", hint: "Run it now" },
        { value: "explain", label: "Explain", hint: "Learn, then run" },
        { value: "copy", label: "Copy", hint: "Copy command to clipboard" },
        { value: "cancel", label: "Cancel" },
      ],
    });

    if (p.isCancel(choice) || choice === "cancel") {
      quit(pc.green("No changes made. You're in control."));
    }

    if (choice === "copy") {
      copyCommand(command);
      process.exit(0);
    }

    if (choice === "explain") {
      p.box(
        [
          pc.yellow(response.explanation ?? ""),
          `${pc.cyan("Command:")} ${pc.green(command)}`,
        ].join("\n"),
        pc.magenta("Why this command?"),
        { rounded: true, contentAlign: "left" },
      );
    }

    p.note(
      `${pc.magenta("Command:")} ${pc.bold(pc.greenBright(`$${command}`))}`,
      pc.yellow("Ready to Execute"),
    );
  }

  const confirmed = await askConfirmation(response);
  if (!confirmed) quit(pc.yellow("Nothing was run."));

  runCommand(command);
  if (!option.run) p.outro("Thanks for using termHat.");
}