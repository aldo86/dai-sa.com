export type ContactMessage = { name: string; email: string; subject: string; message: string; website?: string };

export function validContact(value: unknown): value is ContactMessage {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  for (const [field, maximum] of [["name", 120], ["email", 254], ["subject", 200], ["message", 5000]] as const) {
    const text = data[field];
    if (typeof text !== "string" || !text.trim() || text.length > maximum || text.includes("\0")) return false;
  }
  if (typeof data.website !== "undefined" && (typeof data.website !== "string" || data.website.length > 200)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)
    && !/[\r\n]/.test(`${data.name}${data.email}${data.subject}`)
    && (data.message as string).trim().length >= 10;
}

const attempts = new Map<string, { count: number; expires: number }>();

export function allowContact(key: string, now = Date.now()) {
  for (const [address, entry] of attempts) if (entry.expires <= now) attempts.delete(address);
  const entry = attempts.get(key);
  if (entry) { entry.count++; return entry.count <= 5; }
  if (attempts.size >= 1000) return false;
  attempts.set(key, { count: 1, expires: now + 10 * 60_000 });
  return true;
}