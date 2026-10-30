import { getPayload } from "payload";
import config from "@payload-config";
import { allowContact, validContact } from "../../../../lib/contact";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const expectedOrigin = new URL(process.env.SERVER_URL || "http://localhost:3000").origin;
  if (origin && origin !== expectedOrigin) return Response.json({ error: "Invalid origin." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return Response.json({ error: "Use JSON." }, { status: 415 });
  const address = process.env.TRUST_PROXY === "true" ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "direct" : "direct";
  if (!allowContact(address)) return Response.json({ error: "Please try again later." }, { status: 429, headers: { "Retry-After": "600" } });
  const reader = request.body?.getReader();
  if (!reader) return Response.json({ error: "Missing message." }, { status: 400 });
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16_000) { await reader.cancel(); return Response.json({ error: "Message too large." }, { status: 413 }); }
    chunks.push(value);
  }
  let data: unknown;
  try { data = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { return Response.json({ error: "Invalid JSON." }, { status: 400 }); }
  if (!validContact(data)) return Response.json({ error: "Check the message fields." }, { status: 400 });
  if (data.website) return Response.json({ sent: true });
  if (!process.env.SMTP_HOST) return Response.json({ error: "Email delivery is not configured." }, { status: 503 });
  try {
    const payload = await getPayload({ config });
    await payload.sendEmail({
      to: process.env.CONTACT_EMAIL || "contact@dai-sa.com",
      replyTo: data.email,
      subject: `DAISA inquiry: ${data.subject.trim()}`,
      text: `Name: ${data.name.trim()}\nEmail: ${data.email}\n\n${data.message.trim()}`,
    });
    return Response.json({ sent: true });
  } catch { return Response.json({ error: "Delivery failed. Please email DAISA directly." }, { status: 502 }); }
}