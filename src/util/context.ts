import path from "node:path";
import process from "node:process";

export interface EnvironmentContext {
  osName: string;
  shell: string;
  cwd: string;
}

export function getEnvironmentContext(): EnvironmentContext {
  // 1. Translate Node's internal platform names into clear OS names
  const osMap: Record<string, string> = {
    win32: "Windows",
    darwin: "macOS",
    linux: "Linux",
  };
  const osName = osMap[process.platform] ?? process.platform;

  // 2. Get the current folder the user is standing in
  const cwd = process.cwd();

  // 3. Detect the active shell across macOS, Linux, and Windows
  let shell = "unknown";

  if (process.env.SHELL) {
    // Handles macOS, Linux, Warp (Mac/Linux), VS Code terminal, and Git Bash / MSYS2 / Cygwin on Windows
    shell = path.basename(process.env.SHELL, ".exe");
  } else if (process.platform === "win32") {
    // Check if PowerShell was launched inside CMD or standalone
    if (
      process.env.POWERSHELL_DISTRIBUTION_CHANNEL ||
      process.env.PSExecutionPolicyPreference
    ) {
      shell = "powershell";
    } else if (process.env.PROMPT) {
      shell = "cmd";
    } else if (process.env.PSModulePath) {
      shell = "powershell";
    }
  }

  return { osName, shell, cwd };
}

export function buildUserPrompt(userRequest: string): string {
  const { osName, shell, cwd } = getEnvironmentContext();

  // Strip closing tags so a user cannot break out of <request>...</request>
  const sanitizedRequest = userRequest.replace(/<\/request>/gi, "").trim();

return `OS: ${osName}
Shell: ${shell}
Current Directory: ${cwd}
<request>${sanitizedRequest}</request>`;
}
