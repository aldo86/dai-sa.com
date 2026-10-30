import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { About, Contact, ContactBand, Home, PageHeading, Process, ProjectGrid, ServicesList } from "../../../components/PublicSite";
import { MediaImage } from "../../../components/MediaImage";
import { copy } from "../../../content/copy";
import { getRecord, href, listContent, resolveRoute } from "../../../lib/content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<{ industry?: string; preview?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, parts } = resolveRoute((await params).path);
  const text = copy[locale];
  const { preview } = await searchParams;
  let title: string = parts.length ? text[parts[0] as "about" | "services" | "portfolio" | "contact"] || "DAISA" : text.engineering;
  let description: string = text.intro;
  if (parts.length === 2 && (parts[0] === "services" || parts[0] === "portfolio")) {
    const { record } = await getRecord(parts[0] === "services" ? "services" : "projects", parts[1], locale, preview);
    if (record) { title = record.seoTitle || record.title; description = record.seoDescription || record.summary; }
  }
  const base = process.env.SERVER_URL || "http://localhost:3000";
  const pathname = parts.join("/");
  return {
    title: `${title} | DAISA`, description, metadataBase: new URL(base),
    alternates: { canonical: href(locale, pathname), languages: { en: href("en", pathname), es: href("es", pathname) } },
    ...(preview ? { robots: { index: false, follow: false } } : {}),
    openGraph: { title: `${title} | DAISA`, description, locale: locale === "es" ? "es_MX" : "en_US", type: "website" },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { locale, parts } = resolveRoute((await params).path);
  const text = copy[locale];
  const search = await searchParams;
  if (!parts.length) return <Home locale={locale} />;
  if (parts.length === 1 && parts[0] === "about") return <About locale={locale} />;
  if (parts.length === 1 && parts[0] === "contact") return <Contact locale={locale} />;
  if (parts.length === 1 && parts[0] === "services") {
    const services = await listContent("services", locale);
    return <><PageHeading title={text.capabilities} summary={text.capabilitiesIntro} /><section className="container list-section"><ServicesList services={services.docs} locale={locale} /></section><Process locale={locale} /><ContactBand locale={locale} /></>;
  }
  if (parts.length === 1 && parts[0] === "portfolio") {
    const industry = ["metal", "food", "other"].includes(search.industry || "") ? search.industry : undefined;
    const projects = await listContent("projects", locale, industry);
    return <><PageHeading title={text.portfolio}><nav className="filters" aria-label={locale === "es" ? "Filtrar proyectos" : "Filter projects"}>{([undefined, "metal", "food", "other"] as const).map((category) => <Link key={category || "all"} href={`${href(locale, "portfolio")}${category ? `?industry=${category}` : ""}`} aria-current={industry === category ? "page" : undefined}>{category ? text.industry[category] : text.allProjects}</Link>)}</nav></PageHeading><section className="container list-section">{projects.docs.length ? <ProjectGrid projects={projects.docs} locale={locale} /> : <p>{text.empty}</p>}</section><ContactBand locale={locale} /></>;
  }
  if (parts.length === 2 && (parts[0] === "services" || parts[0] === "portfolio")) {
    const collection = parts[0] === "services" ? "services" : "projects";
    const { record, previewing } = await getRecord(collection, parts[1], locale, search.preview);
    if (!record?.title || !record.summary) notFound();
    return <>
      {previewing && <aside className="preview-banner">{text.preview}<Link href={href(locale, parts.join("/"))}>{text.exitPreview}</Link></aside>}
      <PageHeading title={record.title} summary={record.summary}><Link className="text-link" href={href(locale, parts[0])}><ArrowLeft size={17} />{parts[0] === "services" ? text.allServices : text.allProjects}</Link></PageHeading>
      <article className="container detail-body"><div className="detail-image"><MediaImage media={record.image} priority contain={collection === "projects"} /></div>{record.description && <div className="detail-copy">{record.description.split("\n").filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}{Boolean(record.gallery?.length) && <section><h2>{text.gallery}</h2><div className="gallery-grid">{record.gallery!.map((item, index) => <div className="gallery-image" key={item.id || index}><MediaImage media={item.image} contain /></div>)}</div></section>}</article>
      <ContactBand locale={locale} />
    </>;
  }
  notFound();
}