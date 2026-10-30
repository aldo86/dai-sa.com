import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Services, Projects } from "./collections/content";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const secret = process.env.PAYLOAD_SECRET;
if (!secret || secret.length < 32) throw new Error("Set PAYLOAD_SECRET to at least 32 random characters in .env.");

export default buildConfig({
  secret,
  serverURL: process.env.SERVER_URL || "http://localhost:3000",
  admin: { user: "users", importMap: { baseDir: dirname }, meta: { titleSuffix: "| DAISA Admin" } },
  collections: [Users, Media, Services, Projects],
  localization: { locales: ["en", "es"], defaultLocale: "en", fallback: false },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || "file:./.daisa-data/development.db" },
    migrationDir: path.resolve(dirname, "migrations"),
    push: process.env.NODE_ENV !== "production",
  }),
  email: process.env.SMTP_HOST ? nodemailerAdapter({
    defaultFromAddress: process.env.MAIL_FROM || "contact@dai-sa.com",
    defaultFromName: "DAISA",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    },
  }) : () => ({
    name: "disabled-until-smtp-configured",
    defaultFromAddress: "contact@dai-sa.com",
    defaultFromName: "DAISA",
    sendEmail: async () => { throw new Error("Email delivery is unavailable until SMTP is configured."); },
  }),
  upload: { limits: { fileSize: 10 * 1024 * 1024 }, abortOnLimit: true },
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});