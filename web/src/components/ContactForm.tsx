"use client";

import { useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { copy } from "../content/copy";
import type { Locale } from "../lib/content";

export function ContactForm({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  return <form className="contact-form" onSubmit={async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      if (!response.ok) throw new Error("Delivery failed");
      setStatus("sent");
      form.reset();
    } catch { setStatus("failed"); }
  }}>
    <div className="form-pair">
      <label>{text.name}<input name="name" autoComplete="name" required maxLength={120} /></label>
      <label>{text.email}<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
    </div>
    <label>{text.subject}<input name="subject" required maxLength={200} /></label>
    <label>{text.message}<textarea name="message" required minLength={10} maxLength={5000} rows={6} /></label>
    <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? text.sending : text.send}{status === "sending" ? <LoaderCircle className="spin" size={19} /> : <ArrowUpRight size={19} />}</button>
    <p role="status" className={status === "failed" ? "form-error" : ""}>{status === "sent" ? text.sent : status === "failed" ? text.failed : ""}</p>
  </form>;
}