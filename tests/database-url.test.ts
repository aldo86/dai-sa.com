import { expect, test } from "vitest";
import { resolvePayloadDatabaseURL } from "../src/lib/database-url";

test("uses the private local SQLite file during development", () => {
  expect(resolvePayloadDatabaseURL({ NODE_ENV: "development" })).toBe("file:./.daisa-data/development.db");
});

test("ignores GoDaddy's generated MySQL URL and uses the selected persistent SQLite file", () => {
  expect(resolvePayloadDatabaseURL({ NODE_ENV: "production", DATABASE_URL: "mysql://user:password@localhost/daisa" })).toBe("file:./public/assets/daisa.sqlite");
});

test("recognizes GoDaddy's MySQL URL even when NODE_ENV is unset", () => {
  expect(resolvePayloadDatabaseURL({ DATABASE_URL: "mysql://user:password@localhost/daisa" })).toBe("file:./public/assets/daisa.sqlite");
});

test("accepts an explicit Payload database URL", () => {
  expect(resolvePayloadDatabaseURL({ NODE_ENV: "production", PAYLOAD_DATABASE_URL: "file:./public/assets/custom.sqlite", DATABASE_URL: "mysql://ignored" })).toBe("file:./public/assets/custom.sqlite");
});

test("uses a non-MySQL DATABASE_URL when supplied", () => {
  expect(resolvePayloadDatabaseURL({ NODE_ENV: "production", DATABASE_URL: "libsql://db.example.com" })).toBe("libsql://db.example.com");
});