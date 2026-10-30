import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans-condensed/500.css";
import "@fontsource/ibm-plex-sans-condensed/600.css";
import "../site.css";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/PublicSite";
import { copy } from "../../../content/copy";
import { resolveRoute } from "../../../lib/content";

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ path?: string[] }> }) {
  const { locale } = resolveRoute((await params).path);
  return <html lang={locale}><body><a className="skip-link" href="#main">{copy[locale].skip}</a><Header locale={locale} /><main id="main">{children}</main><Footer locale={locale} /></body></html>;
}