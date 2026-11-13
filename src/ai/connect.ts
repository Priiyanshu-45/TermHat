import pc from "picocolors";
import * as p from "@clack/prompts";
import { testConnection } from "./gemini.js";
import { configure, getConfig, clearConfig } from "../util/config.js";


type AI = "gemini";

interface AIModelMap {
  gemini: string;
}

const default_model: AIModelMap = {
  gemini: "gemini-3.5-flash-lite",
};


export async function connectToAI(ai: AI): Promise<void> {
  const config = getConfig();
  if (config.apiKey != "") {
    console.log(pc.red("   This will remove your old credentials."));
    const shouldProceed: boolean | symbol = await p.confirm({
      message: "Do you want to continue?",
    });
    if (p.isCancel(shouldProceed) || !shouldProceed) {
      p.outro(pc.green(`Nothing change. You're in control.`));
      return;
    }
    clearConfig();
  }
  const apikey: string | symbol = await p.password({
    message: `${pc.magenta("Paste your API key:\n")}`,
    mask: "*",
    clearOnError: true,
    validate: (value) => {
      const aiKeyPattern = /^[a-zA-Z0-9_.-]{20,300}$/;
      if (!value || !aiKeyPattern.test((value as string).trim())) {
        return "Please enter a valid API key.";
      }
      return undefined;
    },
  });

  if (p.isCancel(apikey)) {
    p.outro("Cancelled.");
    //@ts-ignore
    process.exit(0);
  }
  const AI_MODEL: string = default_model[ai];
  const model: string | symbol = await p.text({
    message: `${pc.magenta("AI Model ")} ${pc.cyan(`(Not sure? Press Enter for best default: ${AI_MODEL}):`)}`,
    initialValue: AI_MODEL,
    validate: (value) => {
      if (!value || !(value as string).trim())
        return "Model cannot be empty. Press Ctrl+C to cancel.";
      return undefined;
    },
  });

  if (p.isCancel(model)) {
    p.outro("Cancelled.");
    //@ts-ignore
    process.exit(0);
  }

  const result: boolean = await testConnection(apikey as string, model as string);
  if (result) {
    configure((apikey as string).trim(), ai, (model as string).trim());
    p.outro(pc.cyan(`All Done! Saved ${model as string} for ${ai}.`));
  } else {
    p.log.error("Connection failed. Try Agian.");
  }
}

