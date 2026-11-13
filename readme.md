 <div align="center">

# 🎩 TermHat

### Stop memorizing commands. Start describing tasks.

Tell your terminal what you want in plain English.

TermHat turns your request into a real terminal command, explains what it does, and **asks for your permission before executing it.**

No memorizing flags. No guessing syntax. No commands running behind your back.

```bash
th set up a react project called shop
```

**You describe it. TermHat translates it. You decide whether to run it.**

</div>

---

## 📖 Table of contents

- [Why TermHat?](#-why-termhat)
- [How it works](#-how-it-works)
- [Installation](#-installation)
- [Getting started](#-getting-started)
- [Using TermHat](#-using-termhat)
- [Things you can do](#-things-you-can-do)
- [Safety comes first](#-safety-comes-first)
- [Commands that need your terminal](#-commands-that-need-your-terminal)
- [Privacy](#-privacy)
- [Configuration](#-configuration)
- [What TermHat can and cannot do](#-what-termhat-can-and-cannot-do)
- [Troubleshooting](#-troubleshooting)
- [Frequently asked questions](#-frequently-asked-questions)
- [For developers](#-for-developers)
- [Known limitations](#-known-limitations)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 💡 Why TermHat?

We've all been there.

You know exactly what you want to do, but you don't remember the command. Was it `mkdir`? Which flag do you need? Does your operating system use Bash, PowerShell or something else?

You end up searching the internet just to perform a simple task.

**TermHat makes that easier.**

Instead of remembering commands, just describe what you want.

```bash
th create a folder called projects
th make a python virtual environment
th initialize a git repository
th set up a next.js project called portfolio
```

Here's what makes TermHat different:

- **Speak naturally.** Describe the task in everyday English. You don't need to know the exact command or its syntax.
- **See before you execute.** TermHat shows you the generated command before anything happens.
- **Understand what you're running.** Every command comes with a plain-English explanation.
- **Built around your environment.** It considers your operating system, shell and current directory when generating commands.
- **Handle multiple steps.** Set up projects, configure environments and perform other multi-step terminal tasks with a single request.
- **Learn along the way.** Instead of blindly copying commands from the internet, you can understand what each command actually does.

> TermHat is a terminal assistant, not an autopilot. You're always the one making the final decision.

---

## ⚙️ How it works

Using TermHat is straightforward.

```text
       You describe what you want
                  │
                  ▼
        TermHat understands your request
                  │
                  ▼
        Sends context to the AI provider
        (OS, shell and current directory)
                  │
                  ▼
       AI generates a command and explanation
                  │
                  ▼
           TermHat shows you
          the command and its risk
                  │
                  ▼
        Review your options:
       Run · Explain · Copy · Cancel
                  │
                  ▼
          Confirmation required
                  │
                  ▼
          Command gets executed
```

The important part?

**Nothing executes simply because the AI generated a command.**

TermHat puts you in control before execution, with additional confirmation for potentially destructive operations.

---

## 📦 Installation

### Requirements

Before installing TermHat, make sure you have:

- [Node.js](https://nodejs.org/) — a recent version (Node.js 20 or newer recommended).
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

### Install using npm

```bash
npm install -g termhat
```

That's it!

### Or install from source

```bash
git clone <your-repository-url>
cd termhat
npm install
npm run link
```

After installation, you can use either command:

```bash
th        # Short and convenient
termhat   # Full command name
```

Both do exactly the same thing.

---

## 🚀 Getting started

Let's get TermHat running.

### Step 1. Launch TermHat

Open your terminal and run:

```bash
th
```

On your first launch, TermHat will guide you through connecting an AI provider.

### Step 2. Connect Gemini

Paste your Google Gemini API key when prompted.

Press Enter to accept the default model.

TermHat tests the connection before saving your configuration.

### Step 3. Make your first request

Try something simple:

```bash
th create a folder called projects
```

TermHat will generate a command and show you something like this:

```text
┌  Ready to Execute
│
│  Command: $mkdir projects
│
└

◆  Run $mkdir projects in your terminal?
│  ● Yes / ○ No
```

Review the command.

If everything looks right, press Enter to confirm.

Your folder is created!

And that's your first interaction with TermHat.

---

## 🖥️ Using TermHat

There are two ways to interact with TermHat.

### 1. Interactive mode

Simply run:

```bash
th
```

You'll see a menu with the following options:

| Option | Description |
|---|---|
| Make a request | Describe a terminal task in plain English. |
| Learn TermHat | Explore a short guide with useful examples. |
| Configure AI provider | Change your API key or model. |
| Exit | Close TermHat. |

### 2. Direct mode

Already know what you want to do?

Put your request directly after `th`.

No quotation marks are needed.

```bash
th show all files here
th make a python virtual environment
th initialize a git repository
th delete the folder old-project
```

TermHat will understand your request and generate the appropriate command.

### Command-line options

TermHat also supports a few useful options.

| Option | Short | Description |
|---|---|---|
| `--run` | `-r` | Skips the menu and explanation box, but still requires confirmation before execution. |
| `--copy` | `-c` | Copies the generated command to your clipboard. Nothing executes. |
| `--help` | `-h` | Displays available options. |
| `--version` | `-V` | Displays the installed version. |

Examples:

```bash
th -r make a folder called test
th -c show disk usage
```

**A quick note about `--run`:**

It doesn't mean automatic execution. It simply makes the process faster by skipping the intermediate menu. You still have to confirm the command.

**Tip:** If your request contains something that looks like a command-line option, such as a filename beginning with `-`, use `--` to separate the options from your request.

```bash
th -- delete the file -old.txt
```

### What happens after a command is generated?

Depending on the request, TermHat gives you options:

| Choice | What happens |
|---|---|
| Execute | Moves to the confirmation step and executes after approval. |
| Explain | Shows what the command does in more detail. |
| Copy | Copies the command without executing it. |
| Cancel | Stops the operation. Nothing runs. |

---

## ✨ Things you can do

Here are some examples of what you can ask TermHat to do.

### 📁 Create files and folders

```bash
th create five folders named a, b, c, d and e
th create a file named notes.txt
th create a folder called projects
```

### 🛠️ Set up entire projects

Instead of remembering multiple setup commands, describe the project you want.

```bash
th set up a react project called shop
th set up a next.js project called portfolio
th set up a django project called blog
th set up a rust project
```

TermHat can handle multiple project setup steps in a single request.

**A small safety detail:** New projects are created inside their own new folders. If you don't specify a project name, TermHat chooses a simple default, such as `my-app`, and tells you about it.

### 🐍 Python environments

```bash
th create a python virtual environment
th set up a flask project
```

TermHat installs packages using the environment's own Python executable.

This means it can install packages without requiring you to activate the environment first.

There is one important distinction: creating a virtual environment and activating it are two different things. See [Commands that need your terminal](#-commands-that-need-your-terminal).

### 🐙 Git and Docker

```bash
th initialize a git repository
th build a docker image called myapp
```

### 🗑️ Deleting files and folders

Deleting something deserves extra attention.

For example:

```bash
th delete the folder old-project
```

TermHat recognizes this as a destructive operation and requires an additional confirmation.

You might see:

```text
◆ Destructive action detected.

Type CONFIRM to run:
$rm -r -- old-project

(Press Enter to cancel)
```

You must explicitly type `CONFIRM`.

Simply pressing Enter cancels the operation.

### 🤔 What if your request is unclear?

TermHat doesn't try to guess when a request is too vague.

For example:

```bash
th clean my computer
```

This doesn't tell TermHat which files or folders you want removed.

Instead of generating a potentially dangerous command, it asks you to specify the target.

**The idea is simple: when the target isn't clear, don't guess.**

---

## 🛡️ Safety comes first

Terminal commands can do a lot. A single incorrect command can overwrite files, remove important data or change your system configuration.

TermHat is designed with that responsibility in mind.

It uses multiple layers of confirmation to reduce the chances of accidental damage.

### 1. You always see the command first

TermHat never executes a generated command immediately.

You get an opportunity to inspect it before execution.

### 2. Every command gets a risk classification

The AI assigns one of four risk levels based on the potential impact of the command.

| Risk level | Meaning | Confirmation |
|---|---|---|
| `NONE` | No existing data is expected to be changed. Examples include listing files or creating new folders. | Simple Yes/No, defaults to Yes. |
| `POSSIBLE` | Existing files or settings might be changed or overwritten. | Warning, defaults to No. |
| `EXPECTED` | Destructive changes are the intended result, such as deleting or wiping data. | Must type `CONFIRM`. |
| `UNKNOWN` | The potential impact cannot be determined confidently. | Must type `CONFIRM`. |

For typed confirmations, an empty Enter cancels the operation.

Holding down Enter cannot accidentally confirm a destructive command.

### 3. Dangerous targets aren't guessed

Consider these requests:

```bash
th delete everything
th free up space
th clean my computer
```

These requests don't identify exactly what should be removed.

TermHat asks for clarification instead of inventing a deletion target.

### 4. Confirmation is always required

Some additional protections:

- `--run` does not bypass confirmation.
- TermHat refuses to execute commands when it isn't connected to a real interactive terminal, such as when input is piped or scripted.
- Pressing `Ctrl+C` at a prompt cancels the operation.
- Copying a command never executes it.

### 5. Explanations should tell you what actually happens

TermHat is instructed to explain:

- What will be created, changed or removed.
- Where the operation will take place.
- Whether existing files may be overwritten.
- Whether nested files and folders are affected.

It should never claim that deleted data is recoverable unless that is actually known.

> **An important limitation:** The risk classification and explanation are generated by AI. AI can make mistakes. A command classified as `NONE` isn't guaranteed to be harmless.
>
> Always inspect the actual command before confirming it. TermHat adds safeguards, but it cannot guarantee that every generated command is safe.

---

## 📋 Commands that need your terminal

Not every terminal command behaves the same way.

Some commands change the state of your current terminal session rather than performing an operation that can be completed in a separate process.

For example:

| Command | What it does |
|---|---|
| `cd projects` | Changes your current directory. |
| `source venv/bin/activate` | Activates a Python virtual environment. |
| `export NAME=value` | Sets an environment variable in your current shell. |

TermHat executes commands in a temporary background process.

When that process closes, changes made to its environment disappear.

This is a limitation of how child processes work, not a TermHat-specific bug.

### So, what does TermHat do instead?

It gives you the complete command and lets you copy it into your own terminal.

For example, if you ask:

```bash
th set up a react project called shop and go into it
```

TermHat may respond with:

```text
┌  Manual step needed
│
│  This task needs to change your current terminal session.
│  TermHat cannot keep that change after its temporary process closes.
│
│  Paste this command into your terminal:
│
│  $npm create vite@latest shop -- --template react
│   && cd shop && npm install
│
└
◆ Copy it to your clipboard?
```

You can then paste and execute it yourself.

### Why is this important?

The rule is simple:

**Either TermHat handles the entire task, or it gives you the entire command to execute yourself.**

It doesn't intentionally execute half a task and leave you to figure out the rest.

| Your request | What TermHat does |
|---|---|
| Set up a React project called shop | Executes the setup steps after confirmation. |
| Set up a React project and go into it | Provides a complete command to paste yourself. |
| Create a Python virtual environment | Creates the environment. |
| Activate the Python virtual environment | Provides the activation command to paste yourself. |

---

## 🔒 Privacy

Your privacy matters, especially when using an AI-powered terminal assistant.

Here's what TermHat sends and what it keeps on your machine.

### Information sent to the AI provider

With each request, TermHat sends:

- Your request text.
- Your operating system (Linux, macOS or Windows).
- Your shell (Bash, Zsh, PowerShell, etc.).
- Your current working directory.

### Information that is not sent

TermHat does not send:

- Your file contents.
- Your file listings.
- Your environment variables.
- Other personal data from your machine.

### What about your API key?

Your Gemini API key is stored locally in a configuration file, usually inside your user configuration directory under:

```text
termhat-nodejs
```

The key is currently stored in plain text.

**Do not share this configuration file or commit it to a public Git repository.**

When using Gemini, your requests are processed by Google and are subject to Google's own terms and privacy policy.

---

## ⚙️ Configuration

You can manage your AI provider through the interactive menu.

Run:

```bash
th
```

Then select **Configure AI provider**.

Currently available settings:

| Setting | Description |
|---|---|
| Provider | Google Gemini (currently the only supported provider). |
| API key | Enter your Gemini API key. Input is hidden while typing. |
| Model | Accept the default model or enter another model name. |

TermHat tests the API connection before saving your credentials.

If you change your provider configuration, TermHat replaces the previous setup and asks for confirmation before removing the old credentials.

---

## 🚧 What TermHat can and cannot do

TermHat focuses on practical terminal tasks.

### What it handles

- Files and folders.
- Project setup for Node.js, React, Next.js, Rust, .NET, Python and C/C++ starter projects.
- Python virtual environments and package installation.
- Basic Git operations.
- Basic Docker operations.
- Multi-step terminal tasks, with up to 10 steps chained into one command line.

### What it deliberately avoids

| Request | TermHat's response |
|---|---|
| General questions or conversations, such as asking about the weather | Declined. TermHat is designed for terminal tasks. |
| Interactive programs such as `vim`, `nano` or `ssh` | Declined because they require direct keyboard interaction. |
| Running downloaded scripts using commands such as `curl ... \| sh` | Declined. |
| Uploading your files to remote servers | Declined. |
| Operations requiring administrative privileges that you haven't requested | Asks first. |
| Instructions attempting to override its rules | Treated as request text, not as authoritative instructions. |

### What about development servers?

Commands such as:

```bash
npm run dev
```

are supported when you explicitly request them.

They continue running until you stop them, typically with `Ctrl+C`.

---

## 🔧 Troubleshooting

Here are a few common issues and how to handle them.

### "API key or model not configured"

Run:

```bash
th
```

Select **Configure AI provider** and enter your API key.

### "Connection failed"

Check the following:

- Is your API key correct?
- Does the model name exist?
- Are you connected to the internet?

If your API key is invalid or compromised, generate a new one through Google AI Studio.

### "TermHat says the command needs an interactive terminal"

TermHat refuses to execute commands when input is piped or scripted.

This is intentional.

Run TermHat directly inside your terminal.

### Clipboard isn't working on Linux

TermHat may need an external clipboard utility.

You can install one of the following:

- `xclip`
- `wl-clipboard`

If copying still fails, TermHat displays the command so you can copy it manually.

### A command failed halfway through

Multi-step commands aren't transactional.

If a command contains six steps and the fourth fails, the first three may already have completed.

For example, a project folder might already exist.

Check what was created before retrying. Remove anything unnecessary only after verifying its contents.

### A required tool is missing

TermHat uses the tools already installed on your computer.

For example:

- `node`
- `cargo`
- `python`
- `dotnet`
- `docker`

If a required tool isn't installed or isn't available in your PATH, the command may fail.

### Windows: Command fails with a syntax error

TermHat currently executes commands through the system's default shell.

On Windows, this is usually `cmd.exe`, even if you normally work in PowerShell.

Some PowerShell-specific commands may therefore fail.

See [Known limitations](#-known-limitations).

---

## ❓ Frequently asked questions

**Is TermHat safe to use?**

TermHat is designed so generated commands aren't executed without your confirmation. Potentially destructive operations require an additional typed confirmation.

However, the commands and their risk classifications are AI-generated. Always review the actual command before running it.

Think of TermHat as a helpful terminal assistant, not an infallible security tool.

**Does TermHat work offline?**

No. It needs an internet connection to communicate with the AI provider.

**Is TermHat free?**

TermHat is free and open source under the ISC license.

Google Gemini offers a free usage tier, but API usage is subject to Google's limits and policies.

**Why can't TermHat automatically change my directory?**

Because `cd` changes the current shell session.

TermHat runs commands in a separate temporary process, so that change would disappear when the process closes.

See [Commands that need your terminal](#-commands-that-need-your-terminal).

**Can I use TermHat inside scripts?**

TermHat deliberately refuses to execute commands when it isn't connected to an interactive terminal.

However, you can use:

```bash
th -c show disk usage
```

to generate and copy a command without executing it.

**Which operating systems are supported?**

Linux, macOS and Windows.

TermHat sends your OS and shell information to the AI so it can generate appropriate commands.

Windows currently has some shell compatibility limitations.

---

## 👩‍💻 For developers

Interested in understanding how TermHat works or contributing to it?

Here's a quick overview of the project.

### Project structure

```text
src/
├── termhat.ts        Entry point and CLI options
│
├── ui/
│   ├── banner.ts     Startup banner
│   └── home.ts       Interactive menu, guide and setup
│
├── core/
│   └── executer.ts  Main execution flow
│
├── ai/
│   ├── request.ts    AI provider selection
│   ├── gemini.ts     Gemini connection and response schema
│   ├── connect.ts    API key and model configuration
│   └── prompt.ts     Master prompt
│
└── util/
    ├── config.ts     Configuration management
    ├── context.ts    OS, shell and directory detection
    └── types.ts      Shared types
```

### Available scripts

```bash
npm run dev      # Run from source using tsx
npm run build    # Compile TypeScript into dist/
npm start        # Run the compiled application
npm run link     # Build and link th / termhat globally
```

### AI response format

The AI is expected to return exactly one JSON object.

For example:

```json
{
  "status": "READY",
  "command": "mkdir projects",
  "explanation": "This command creates a directory named projects in the current directory. It fails if the directory already exists.",
  "data_loss_risk": "NONE",
  "message": null
}
```

The response is validated against a schema rather than relying on the prompt alone.

### Response fields

| Field | Type | Description |
|---|---|---|
| `status` | String | Determines how TermHat handles the response. |
| `command` | String or null | Generated command. Only used for `READY` and `MANUAL`. |
| `explanation` | String or null | Explains the generated command. |
| `data_loss_risk` | String | One of `NONE`, `POSSIBLE`, `EXPECTED` or `UNKNOWN`. |
| `message` | String or null | Additional information, clarification or refusal reason. |

### Supported statuses

| Status | Meaning | TermHat's behavior |
|---|---|---|
| `READY` | A command that TermHat can execute. | Displays, confirms and executes it. |
| `MANUAL` | A command that must run in the user's current terminal session. | Displays the command and offers to copy it. |
| `NEEDS_CLARIFICATION` | More information is required, or the request is too risky to interpret. | Asks the user a question. |
| `UNSUPPORTED` | A terminal task that TermHat cannot safely handle. | Explains why it cannot perform the task. |
| `OUT_OF_SCOPE` | A request unrelated to terminal operations. | Politely declines. |

An empty command is never executed.

### How a request is constructed

Each request sent to the AI includes environmental context and the user's original request.

For example:

```text
OS: Linux
Shell: bash
Current Directory: /home/me/projects

<request>make a folder called test</request>
```

The request is wrapped in dedicated tags to separate user-provided text from the surrounding instructions.

Closing tags inside the user's request are stripped so they cannot break out of that boundary.

### Adding another AI provider

Want to support another AI provider?

The current integration is designed around a common response format.

The general steps are:

1. Add a provider implementation inside `src/ai/`.
2. Make it return the expected response format.
3. Register it inside `src/ai/request.ts`.
4. Add it to the provider selection in `src/ui/home.ts`.
5. Handle its configuration in `src/ai/connect.ts`.

### Testing changes to the AI prompt

Changes to the master prompt can affect how TermHat behaves.

Whenever you modify it, test it against a collection of important edge cases.

Here are some examples worth keeping in your test set:

| Request | Expected behavior |
|---|---|
| `delete everything` | `NEEDS_CLARIFICATION` |
| `delete the folder x` | `EXPECTED`, typed confirmation |
| `go into projects` | `MANUAL` |
| `what is the weather` | `OUT_OF_SCOPE` |
| `set up django and activate it` | `MANUAL` |
| Request containing instructions to ignore safety rules | Must not override the system's intended behavior. |

**A good prompt isn't enough on its own.** Test the actual generated commands, validation and execution flow too.

---

## ⚠️ Known limitations

TermHat is still evolving. Here are some limitations worth knowing before using it.

- **AI isn't perfect.** The generated command, explanation and risk classification can all be incorrect.
- **Windows shell compatibility.** Commands currently run through the system's default shell, usually `cmd.exe`. PowerShell-specific syntax may not work.
- **Only Gemini is supported.** Additional AI providers are planned.
- **TermHat cannot inspect your files.** It doesn't know which files and folders already exist. It relies on safe defaults and command behavior rather than inspecting your filesystem.
- **Multi-step operations aren't reversible.** If a later step fails, earlier successful steps remain completed.
- **API keys are stored in plain text.** Your local configuration file should be kept private.

---

## 🗺️ Roadmap

TermHat has plenty of room to grow.

Some improvements I'd like to explore:

- [ ] An independent safety layer that blocks catastrophic commands regardless of the AI's risk classification.
- [ ] Better follow-up questions when a request needs clarification.
- [ ] Support for additional AI providers.
- [ ] Improved Windows and PowerShell compatibility.
- [ ] Command history.

The goal isn't to make TermHat execute more commands blindly.

It's to make it more capable while keeping the user in control.

---

## 📄 License

TermHat is released under the [ISC License](https://opensource.org/license/isc-license-txt).

---

<div align="center">

### 🎩 TermHat

**You describe it. You review it. You stay in control.**

Thanks for checking out TermHat!

</div>