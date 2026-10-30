import { expect, test } from "vitest";
import { allowContact, validContact } from "../src/lib/contact";

const message = { name: "Test visitor", email: "visitor@example.com", subject: "Engineering project", message: "Please contact me about an industrial engineering project." };

test("contact validation accepts bounded plain text and rejects invalid fields", () => {
  expect(validContact(message)).toBe(true);
  expect(validContact({ ...message, email: "invalid" })).toBe(false);
  expect(validContact({ ...message, subject: "Hello\r\nBcc: other@example.com" })).toBe(false);
  expect(validContact({ ...message, message: "x".repeat(5001) })).toBe(false);
  expect(validContact({ ...message, name: {} })).toBe(false);
  expect(validContact(null)).toBe(false);
});

test("contact rate limits expire without retaining unlimited visitors", () => {
  for (let count = 0; count < 5; count++) expect(allowContact("test-visitor", 1000)).toBe(true);
  expect(allowContact("test-visitor", 1000)).toBe(false);
  expect(allowContact("test-visitor", 601_001)).toBe(true);
});