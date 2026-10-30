import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(request: Request) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) return new Response("Sign in to preview drafts.", { status: 401 });
  const url = new URL(request.url);
  const collection = url.searchParams.get("collection");
  const id = url.searchParams.get("id");
  const locale = url.searchParams.get("locale") === "es" ? "es" : "en";
  if (!id || (collection !== "services" && collection !== "projects")) return new Response("Invalid preview.", { status: 400 });
  try {
    const doc = await payload.findByID({ collection, id, locale, fallbackLocale: false, draft: true, overrideAccess: false, user });
    const section = collection === "services" ? "services" : "portfolio";
    const destination = `${locale === "es" ? "/es" : ""}/${section}/${doc.slug}?preview=${doc.id}`;
    return Response.redirect(new URL(destination, process.env.SERVER_URL || url.origin), 307);
  } catch { return new Response("Preview not found.", { status: 404 }); }
}