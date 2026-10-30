"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { copy } from "../content/copy";
import type { Locale } from "../lib/content";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const text = copy[locale];
  const prefix = locale === "es" ? "/es" : "";
  const equivalent = locale === "es" ? pathname.replace(/^\/es(?=\/|$)/, "") || "/" : `/es${pathname === "/" ? "" : pathname}`;
  return <header className="site-header" id="top">
    <div className="header-inner">
      <Link href={prefix || "/"} className="brand" aria-label="DAISA">
        <Image src="/brand/logo.png" alt="DAISA" width={150} height={57} priority />
      </Link>
      <button className="menu-button" type="button" title={open ? text.close : text.menu} aria-label={open ? text.close : text.menu} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="main-nav" className={open ? "navigation is-open" : "navigation"} aria-label={locale === "es" ? "Principal" : "Main"}>
        {(["about", "services", "portfolio", "contact"] as const).map((page) => <Link key={page} href={`${prefix}/${page}`} aria-current={pathname === `${prefix}/${page}` || pathname.startsWith(`${prefix}/${page}/`) ? "page" : undefined} onClick={() => setOpen(false)}>{text[page]}</Link>)}
        <Link className="language-switch" href={equivalent} lang={locale === "es" ? "en" : "es"} hrefLang={locale === "es" ? "en" : "es"} onClick={() => setOpen(false)}>{locale === "es" ? "English" : "Español"}</Link>
      </nav>
    </div>
  </header>;
}