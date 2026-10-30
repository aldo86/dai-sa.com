import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { getPayload } from "payload";
import config from "../src/payload.config";

if (!stdin.isTTY) throw new Error("Run this command in an interactive terminal.");
const payload = await getPayload({ config });
try {
  const existing = await payload.count({ collection: "users", overrideAccess: true });
  if (existing.totalDocs) throw new Error("An administrator already exists. Use password recovery instead.");
  const prompt = createInterface({ input: stdin, output: stdout });
  const email = await prompt.question("Administrator email: ");
  prompt.close();
  stdout.write("Password (at least 14 characters, hidden): ");
  const password = await new Promise<string>((resolve, reject) => {
    let value = "";
    stdin.setRawMode(true);
    stdin.resume();
    function finish() {
      stdin.off("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
      stdout.write("\n");
    }
    function onData(buffer: Buffer) {
      for (const character of buffer.toString()) {
        if (character === "\u0003") { finish(); reject(new Error("Cancelled.")); return; }
        if (character === "\r" || character === "\n") { finish(); resolve(value); return; }
        if (character === "\u007f") value = value.slice(0, -1);
        else value += character;
      }
    }
    stdin.on("data", onData);
  });
  if (password.length < 14) throw new Error("Use at least 14 characters.");
  await payload.create({ collection: "users", data: { email: email.trim(), password }, overrideAccess: true, context: { provisionAdministrator: true } });
  console.log("Administrator created. Sign in at /admin.");
} finally {
  await payload.destroy();
}
process.exit(0);