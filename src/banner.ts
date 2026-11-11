//@ts-ignore
import process from 'node:process'
import pc from "picocolors";
import figlet from "figlet";
import home from './home.js';

function showBanner() {
const terminalWidth = process.stdout.columns || process.env.COLUMNS || 85;
const banner = figlet.textSync("TERMHAT", {
  font: "Standard",
  horizontalLayout: "fitted",
  width: terminalWidth,
});

console.log((pc.bold(pc.blueBright(banner))));
console.log(pc.italic(pc.inverse("Stop memorizing commands. Start describing tasks.\n")));
home()
}

export default showBanner;