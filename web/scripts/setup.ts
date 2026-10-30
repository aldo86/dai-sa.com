import { randomBytes } from "node:crypto";
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") throw new Error("Local setup cannot run in production.");
try {
  await access(".env");
} catch {
  await writeFile(".env", [
    `PAYLOAD_SECRET=${randomBytes(48).toString("hex")}`,
    "SERVER_URL=http://localhost:3000",
    "DATABASE_URL=file:../.daisa-data/development.db",
    "MEDIA_DIR=../.daisa-data/media",
    "ALLOW_LOCAL_SETUP=true",
    "",
  ].join("\n"), { mode: 0o600, flag: "wx" });
}
dotenv.config({ quiet: true });
await mkdir(path.resolve(process.env.MEDIA_DIR || "../.daisa-data/media"), { recursive: true });
await mkdir(path.resolve("../.daisa-data"), { recursive: true });
console.log("Local environment and persistent storage ready. No administrator account was created.");