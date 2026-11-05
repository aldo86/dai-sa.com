import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { mkdtemp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { expect, test } from "vitest";

test("production initializes an empty database and preserves content on restart", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "daisa-production-"));
  await mkdir(path.join(directory, "media"));
  const environment = {
    ...process.env,
    NODE_ENV: "production" as const,
    PAYLOAD_SECRET: randomBytes(48).toString("hex"),
    PAYLOAD_DATABASE_URL: `file:${directory}/production.sqlite`,
    DATABASE_URL: "mysql://unused.invalid/database",
    MEDIA_DIR: path.join(directory, "media"),
    SMTP_HOST: "",
  };
  const script = `
    import { getPayload } from "payload";
    import { randomBytes } from "node:crypto";
    import config from "./src/payload.config.ts";
    const payload = await getPayload({ config });
    try {
      const services = await payload.count({ collection: "services", overrideAccess: false });
      const projects = await payload.count({ collection: "projects", overrideAccess: false });
      const users = await payload.count({ collection: "users", overrideAccess: true });
      if (process.env.CREATE_TEST_ACCOUNT === "true") {
        await payload.create({ collection: "users", data: { email: "production-test@example.com", password: randomBytes(32).toString("hex") }, context: { provisionAdministrator: true } });
      }
      console.log("CHECK_RESULT=" + JSON.stringify({ services: services.totalDocs, projects: projects.totalDocs, users: users.totalDocs }));
    } finally { await payload.destroy(); }
    process.exit(0);
  `;
  function start(createAccount: boolean) {
    const output = execFileSync(process.execPath, ["--import", "tsx", "--input-type=module", "--eval", script], {
      cwd: process.cwd(),
      env: { ...environment, CREATE_TEST_ACCOUNT: String(createAccount) },
      encoding: "utf8",
      timeout: 30_000,
    });
    const result = output.split("\n").find((line) => line.startsWith("CHECK_RESULT="));
    if (!result) throw new Error("Production initialization did not complete.");
    return JSON.parse(result.slice("CHECK_RESULT=".length));
  }
  try {
    expect(start(true)).toEqual({ services: 0, projects: 0, users: 0 });
    expect(start(false)).toEqual({ services: 0, projects: 0, users: 1 });
  } finally { await rm(directory, { recursive: true, force: true }); }
});