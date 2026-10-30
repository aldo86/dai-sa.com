import Link from "next/link";
import { ArrowRight, ArrowUp, ArrowUpRight, Cable, Compass, DraftingCompass, Factory, Globe2, Layers3, Mail, MapPin, Phone, Wheat } from "lucide-react";
import { copy } from "../content/copy";
import { href, listContent, type Locale } from "../lib/content";
import type { Service, Project } from "../payload-types";
import { MediaImage } from "./MediaImage";
import { ContactForm } from "./ContactForm";
import { HeroCarousel } from "./HeroCarousel";

const serviceIcons = { metal: Factory, food: Wheat, other: Cable };
const processIcons = [Compass, Layers3, DraftingCompass];

export function ContactBand({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return <section className="contact-band"><div className="container band-inner"><div className="contact-band-title"><DraftingCompass size={48} strokeWidth={1.3} aria-hidden="true" /><div><h2>{text.contactTitle}</h2><p>{text.contactIntro}</p></div></div><Link className="button" href={href(locale, "contact")}>{text.discuss}<ArrowUpRight size={20} /></Link></div></section>;
}

export function ServicesList({ services, locale, visual = false }: { services: Service[]; locale: Locale; visual?: boolean }) {
  return <div className={`services-list${visual ? " services-grid" : ""}`}>{services.map((service) => {
    const Icon = serviceIcons[service.industry];
    return <Link className="service-row" href={href(locale, `services/${service.slug}`)} key={service.id}>
      <span className="service-icon"><Icon size={34} strokeWidth={1.4} aria-hidden="true" /></span><h3>{service.title}</h3><p>{service.summary}</p><span className="service-arrow"><ArrowUpRight aria-hidden="true" size={22} /></span>
    </Link>;
  })}</div>;
}

export function ProjectGrid({ projects, locale }: { projects: Project[]; locale: Locale }) {
  return <div className="project-grid">{projects.map((project) => <Link className="project-item" href={href(locale, `portfolio/${project.slug}`)} key={project.id}>
    <div className="project-image"><MediaImage media={project.image} contain /></div>
    <div className="project-label"><h3>{project.title}</h3><ArrowUpRight aria-hidden="true" size={21} /></div>
  </Link>)}</div>;
}

export function Process({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return <section className="process-section section"><div className="container"><div className="section-heading"><h2>{text.process}</h2><p>{text.processIntro}</p></div><ol className="process-grid">{text.levels.map(([title, description], index) => {
    const Icon = processIcons[index];
    return <li key={title}><div className="process-marker"><Icon size={34} strokeWidth={1.4} aria-hidden="true" /><span className="step">{index + 1}</span></div><h3>{title}</h3><p>{description}</p></li>;
  })}</ol></div></section>;
}

export async function Home({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [services, projects] = await Promise.all([listContent("services", locale), listContent("projects", locale)]);
  const slides = [
    { id: "engineering", title: text.process, url: href(locale, "services"), src: "/images/hero/industrial-facility.webp", alt: text.heroPlanningAlt },
    { id: "metal", title: text.industry.metal, url: href(locale, "services/metal-mechanic"), src: "/images/hero/metal-fabrication.webp", alt: text.heroMetalAlt },
    { id: "systems", title: text.industry.other, url: href(locale, "services/other-services"), src: "/images/hero/engineering-equipment-wide.webp", alt: text.heroEquipmentAlt },
  ];
  return <>
    <HeroCarousel slides={slides} locale={locale} />
    <section id="capabilities" className="section capabilities-section"><div className="container"><div className="section-heading"><h2>{text.capabilities}</h2><p>{text.capabilitiesIntro}</p></div><ServicesList services={services.docs} locale={locale} visual /></div></section>
    <Process locale={locale} />
    <section className="section home-projects"><div className="container"><div className="section-heading"><div><h2>{text.selected}</h2><p className="project-intro">{text.projectIntro}</p></div><Link className="text-link" href={href(locale, "portfolio")}>{text.allProjects}<ArrowRight size={19} /></Link></div><ProjectGrid projects={projects.docs.slice(0, 6)} locale={locale} /></div></section>
    <ContactBand locale={locale} />
  </>;
}

export function PageHeading({ title, summary, children }: { title: string; summary?: string; children?: React.ReactNode }) {
  return <div className="page-heading container"><h1>{title}</h1>{summary && <p>{summary}</p>}{children}</div>;
}

export function About({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return <><PageHeading title={text.aboutTitle} summary={text.aboutIntro} /><section className="container about-body"><p className="lead">{text.aboutBody}</p><div className="mission-grid"><div><h2>{text.mission}</h2><p>{text.missionBody}</p></div><div><h2>{text.vision}</h2><p>{text.visionBody}</p></div></div></section><Process locale={locale} /><ContactBand locale={locale} /></>;
}

export function Contact({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return <><PageHeading title={text.contactTitle} summary={text.contactIntro} /><section className="container contact-layout"><div className="contact-details"><h2>DAISA</h2><a href="mailto:contact@dai-sa.com"><Mail size={20} />contact@dai-sa.com</a><a href="tel:+528181342436"><Phone size={20} />+52 (81) 8134 2436</a><p><MapPin size={20} />{text.location}</p></div><ContactForm locale={locale} /></section></>;
}

export function Footer({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return <footer className="site-footer"><div className="container">
    <div className="footer-grid">
      <div className="footer-brand"><Link href={href(locale)} aria-label="DAISA" className="footer-wordmark">DAISA<span /></Link><p>{text.footerIntro}</p><span className="footer-since">{text.since}</span></div>
      <nav className="footer-links" aria-label={text.company}><h2>{text.company}</h2>{(["about", "services", "portfolio", "contact"] as const).map((page) => <Link href={href(locale, page)} key={page}>{text[page]}</Link>)}</nav>
      <nav className="footer-links" aria-label={text.expertise}><h2>{text.expertise}</h2><Link href={href(locale, "services/metal-mechanic")}><Factory size={17} aria-hidden="true" />{text.industry.metal}</Link><Link href={href(locale, "services/food-industries")}><Wheat size={17} aria-hidden="true" />{text.industry.food}</Link><Link href={href(locale, "services/other-services")}><Cable size={17} aria-hidden="true" />{text.industry.other}</Link></nav>
      <div className="footer-contact"><h2>{text.contact}</h2><a href="mailto:contact@dai-sa.com"><Mail size={18} aria-hidden="true" /><span>contact@dai-sa.com</span></a><a href="tel:+528181342436"><Phone size={18} aria-hidden="true" /><span>+52 (81) 8134 2436</span></a><a href="https://www.google.com/maps/search/?api=1&query=Monterrey%2C+Nuevo+Leon%2C+Mexico" target="_blank" rel="noreferrer" title={text.findUs}><MapPin size={18} aria-hidden="true" /><span>{text.location}</span></a></div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} DAISA. {text.rights}</p><div className="footer-languages"><Globe2 size={16} aria-hidden="true" /><Link href="/" lang="en" aria-current={locale === "en" ? "page" : undefined}>English</Link><span>/</span><Link href="/es" lang="es" aria-current={locale === "es" ? "page" : undefined}>Español</Link></div><a className="back-top" href="#top" aria-label={text.backTop} title={text.backTop}><ArrowUp size={19} /></a></div>
  </div></footer>;
}