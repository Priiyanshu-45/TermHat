export interface TermhatResponse {
    status: "READY" | "MANUAL" | "NEEDS_CLARIFICATION" | "UNSUPPORTED" | "OUT_OF_SCOPE",
    command: string | null,
    explanation: string | null,
    data_loss_risk: "NONE" | "POSSIBLE" | "EXPECTED" | "UNKNOWN",
    message: string | null
}

export interface CLIOptions {
  run?: boolean;
  copy?: boolean;
}