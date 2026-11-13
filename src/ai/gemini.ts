import pc from "picocolors";
import { GoogleGenAI, Type } from "@google/genai";
import { getConfig } from "../util/config.js";
import { MASTER_PROMPT } from "./prompt.js";
import type { TermhatResponse } from "../util/types.js";

export async function testConnection(apiKey: string, model: string) {
  try {
    const testAI = new GoogleGenAI({ apiKey: apiKey });
    const response = await testAI.models.get({ model: `${model}` });
    if (response.name) return true;
    return false;
  } catch (error: any) {
    let msg = error?.message || "Unknown error";
    try {
      msg = JSON.parse(error.message).error.message;
    } catch {}
    console.error(pc.red("Connection failed:"), msg);
  }
  return false;
}

export async function askGemini(userRequest: string): Promise<TermhatResponse | null> {
  try {
  const config = getConfig();
  const apiKey = config["apiKey"];
  const model = config["model"] as string;
  
  if(!apiKey || !model) {
    console.log(pc.red("API key or model not configured. Please connect your AI first."))
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: apiKey as string });

  const response = await ai.models.generateContent({
    model: model as string,
    contents: userRequest,
    config: {
      systemInstruction: MASTER_PROMPT,
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: {
            type: Type.STRING,
            enum: [
              "READY", "NEEDS_CLARIFICATION", "UNSUPPORTED", "OUT_OF_SCOPE",
            ],
          },
          command: { type: Type.STRING, nullable: true },
          explanation: { type: Type.STRING, nullable: true },
          data_loss_risk: {
            type: Type.STRING,
            enum: ["NONE", "POSSIBLE", "EXPECTED", "UNKNOWN"],
          },
          message: { type: Type.STRING, nullable: true },
        },  
        required: ["status", "command", "explanation", "data_loss_risk", "message"]
      },   
    },
  });

  if (!response.text) {
    console.log(pc.red("No response received from Gemini."));
    return null;
  }

  return JSON.parse(response.text) as TermhatResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error Occurred: " + pc.red(error.message));
    } else {
      console.log(pc.red("Unknown Error Occurred."));
    }
    return null;
  }
}
