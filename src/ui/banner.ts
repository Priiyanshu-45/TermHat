import pc from "picocolors";
import figlet from "figlet";

function showBanner() {
const banner = figlet.textSync("TERMHAT", {
  font: "BIG",
});

console.log(pc.italic(pc.bold(pc.greenBright(banner))));
console.log(pc.inverse("Stop memorizing commands. Start describing tasks.\n"));
}

export default showBanner;