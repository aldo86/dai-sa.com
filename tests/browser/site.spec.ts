import { expect, test, type APIRequestContext } from "@playwright/test";

for (const locale of ["en", "es"] as const) {
  for (const width of [360, 768, 1440]) {
    test(`${locale} homepage renders without overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(locale === "es" ? "/es" : "/");
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("DAISA");
      await expect(page.getByRole("heading", { name: locale === "es" ? "Ingeniería para la industria" : "Engineering for industry", exact: true })).toBeVisible();
      await expect(page.locator(".service-row")).toHaveCount(3);
      await expect(page.locator(".project-item")).toHaveCount(6);
      await expect(page.locator(".hero-slide")).toHaveCount(3);
      await page.locator(".slide-dot").first().click();
      await page.locator(".project-item").last().scrollIntoViewIfNeeded();
      await expect(page.getByRole("contentinfo").getByRole("navigation")).toHaveCount(2);
      await page.locator(".site-footer").scrollIntoViewIfNeeded();
      await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
      expect(await page.locator("img").evaluateAll((images) => images.every((image) => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.locator(".site-header").scrollIntoViewIfNeeded();
      await page.locator(".hero-content").evaluate(async (element) => { await Promise.all(element.getAnimations({ subtree: true }).map((animation) => animation.finished)); });
      await page.screenshot({ path: `test-results/home-${locale}-${width}.png`, fullPage: true });
      if (width === 360) {
        await page.getByRole("button", { name: locale === "es" ? "Abrir menú" : "Open menu" }).click();
        await expect(page.locator("#main-nav")).toBeVisible();
      }
      await page.locator("#main-nav .language-switch").click();
      await expect(page.locator("html")).toHaveAttribute("lang", locale === "es" ? "en" : "es");
    });
  }
}

test("homepage slider rotates and supports manual controls", async ({ page }) => {
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "DAISA engineering projects" });
  await expect(carousel).toHaveAttribute("data-playing", "true");
  await expect(page.locator(".slide-counter")).toContainText("02", { timeout: 10_000 });
  await page.getByRole("button", { name: "Previous image", exact: true }).click();
  await expect(page.locator(".slide-dot").first()).toHaveAttribute("aria-current", "true");
  await expect(carousel).toHaveAttribute("data-playing", "false");
  await page.getByRole("button", { name: "Next image", exact: true }).click();
  await expect(page.locator(".slide-dot").nth(1)).toHaveAttribute("aria-current", "true");
  await page.locator(".slide-dot").last().click();
  await expect(page.locator(".slide-counter")).toContainText("03");
  await expect(page.locator(".hero-slide[data-active=true] img")).toBeVisible();
  await page.getByRole("button", { name: "Play slideshow", exact: true }).click();
  await expect(carousel).toHaveAttribute("data-playing", "true");
  await page.getByRole("button", { name: "Pause slideshow", exact: true }).click();
  await expect(carousel).toHaveAttribute("data-playing", "false");
});

test("hero sources and delivered images support large high-density displays", async ({ browser, request }) => {
  const { default: sharp } = await import("sharp");
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForFunction(() => Array.from(document.querySelectorAll<HTMLImageElement>(".hero-slide img")).every((image) => image.complete && image.naturalWidth > 0));
    const images = await page.locator(".hero-slide img").evaluateAll((elements) => elements.map((element) => {
      const image = element as HTMLImageElement;
      return { delivered: image.currentSrc, renderedWidth: image.getBoundingClientRect().width, renderedHeight: image.getBoundingClientRect().height };
    }));
    expect(images).toHaveLength(3);
    for (const image of images) {
      const deliveredURL = new URL(image.delivered);
      const source = deliveredURL.searchParams.get("url");
      expect(source).toMatch(/^\/images\/hero\/.+\.webp$/);
      const originalResponse = await request.get(source!);
      expect(originalResponse.ok()).toBe(true);
      const original = await sharp(await originalResponse.body()).metadata();
      expect(original.width).toBeGreaterThanOrEqual(3200);
      expect(original.height).toBeGreaterThanOrEqual(1600);
      const deliveredResponse = await request.get(image.delivered);
      expect(deliveredResponse.ok()).toBe(true);
      const delivered = await sharp(await deliveredResponse.body()).metadata();
      const coverage = Math.min(delivered.width! / image.renderedWidth, delivered.height! / image.renderedHeight);
      expect(coverage).toBeGreaterThanOrEqual(2);
      expect(deliveredURL.searchParams.get("q")).toBe("90");
    }
    await page.screenshot({ path: "test-results/hero-retina-1440.png" });
  } finally { await context.close(); }
});

test("reduced motion disables autoplay but keeps keyboard controls usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/es");
  await expect(page.locator(".hero-carousel")).toHaveAttribute("data-playing", "false");
  await expect(page.getByRole("button", { name: "Pausar presentación", exact: true })).toBeDisabled();
  const next = page.getByRole("button", { name: "Imagen siguiente", exact: true });
  await expect(next).toBeEnabled();
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".slide-dot").nth(1)).toHaveAttribute("aria-current", "true");
  expect(await page.locator(".hero-slide[data-active=true] img").evaluate((image) => getComputedStyle(image).animationName)).toBe("none");
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Volver arriba" })).toHaveAttribute("href", "#top");
});

test("public routes, filters, and old URLs work", async ({ page, request }) => {
  for (const pathname of ["/about", "/services", "/services/metal-mechanic", "/portfolio", "/portfolio/industrial-buildings", "/contact", "/es/services/food-industries", "/es/contact"]) {
    const response = await page.goto(pathname);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
  }
  await page.goto("/portfolio?industry=food");
  await expect(page.locator(".project-item")).toHaveCount(0);
  const redirect = await request.get("/services-metal.html", { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toBe("/services/metal-mechanic");
  expect((await request.get("/this-page-does-not-exist")).status()).toBe(404);
});

test("admin writes and previews require authentication", async ({ page, request }) => {
  expect((await request.get("/preview?collection=services&id=1")).status()).toBe(401);
  expect((await request.get("/api/users")).status()).toBe(403);
  const create = await request.post("/api/services", { data: { title: "Intruder", _status: "draft" } });
  expect(create.status()).toBe(403);
  const bootstrap = await request.post("/api/users/first-register", { data: { email: "intruder@example.com", password: "not-a-real-password" } });
  expect(bootstrap.status()).toBeGreaterThanOrEqual(400);
  await page.goto("/admin");
  await expect(page.locator("body")).not.toContainText("Internal Server Error");
  await expect(page.getByRole("heading", { name: /welcome|login|log in|create.*user/i })).toBeVisible();
});

test("contact rejects invalid requests and does not fake delivery without SMTP", async ({ request }) => {
  expect((await request.post("/api/contact", { data: { email: "invalid" } })).status()).toBe(400);
  const valid = await request.post("/api/contact", { data: { name: "Test visitor", email: "visitor@example.com", subject: "Project", message: "Please contact me about engineering." } });
  expect(valid.status()).toBe(503);
});

test.describe("Administrator workflow", () => {
  test("administrator can sign in, edit, preview, and publish bilingual content", async ({ page, request, playwright }) => {
    const { randomBytes } = await import("node:crypto");
    const { getPayload } = await import("payload");
    const { default: config } = await import("../../src/payload.config");
    const payload = await getPayload({ config });
    const existing = await payload.count({ collection: "users", overrideAccess: true });
    test.skip(existing.totalDocs > 0, "An owner account already exists; do not modify it for tests.");
    const password = randomBytes(32).toString("hex");
    const email = `browser-${randomBytes(6).toString("hex")}@example.com`;
    let account: number | undefined;
    let service: number | undefined;
    let authenticated: APIRequestContext | undefined;
    try {
      const user = await payload.create({ collection: "users", data: { email, password }, context: { provisionAdministrator: true } });
      account = user.id;
      await page.goto("/admin/login");
      await page.getByRole("textbox", { name: "Email *", exact: true }).fill(email);
      await page.getByLabel("Password", { exact: true }).fill(password);
      await page.getByRole("button", { name: /login|log in/i }).click();
      await expect(page).toHaveURL(/\/admin$/);
      authenticated = await playwright.request.newContext({
        baseURL: new URL(page.url()).origin,
        storageState: await page.context().storageState(),
        extraHTTPHeaders: { Origin: new URL(page.url()).origin },
      });
      const media = await payload.find({ collection: "media", limit: 1 });
      const created = await authenticated.post("/api/services?locale=en&draft=true", { data: {
        title: "Browser workflow service", slug: "browser-workflow-service", summary: "English draft summary",
        industry: "metal", image: media.docs[0].id, _status: "draft",
      } });
      expect(created.status()).toBe(201);
      service = (await created.json()).doc.id as number;
      expect((await request.get("/services/browser-workflow-service")).status()).toBe(404);
      await page.goto(`/admin/collections/services/${service}`);
      await page.locator("#field-summary").fill("Edited through the administrator interface.");
      await page.getByRole("button", { name: "Save Draft", exact: true }).click();
      await expect(page.getByText(/successfully/i).first()).toBeVisible();
      const spanish = await authenticated.patch(`/api/services/${service}?locale=es&draft=true`, { data: {
        title: "Servicio de prueba del navegador", summary: "Resumen en espanol", _status: "draft",
      } });
      expect(spanish.ok()).toBe(true);
      const preview = await authenticated.get(`/preview?collection=services&id=${service}&locale=en`, { maxRedirects: 0 });
      expect(preview.status()).toBe(307);
      await page.goto(preview.headers().location);
      await expect(page.getByRole("complementary")).toContainText("Private draft preview");
      await expect(page.getByText("Edited through the administrator interface.", { exact: true })).toBeVisible();
      const published = await authenticated.patch(`/api/services/${service}?locale=en`, { data: { _status: "published" } });
      expect(published.ok()).toBe(true);
      const english = await request.get("/services/browser-workflow-service");
      expect(english.status()).toBe(200);
      expect(await english.text()).toContain("Edited through the administrator interface.");
      const spanishPage = await request.get("/es/services/browser-workflow-service");
      expect(spanishPage.status()).toBe(200);
      expect(await spanishPage.text()).toContain("Servicio de prueba del navegador");
      await authenticated.patch(`/api/services/${service}?locale=en`, { data: { _status: "draft" } });
      expect((await request.get("/services/browser-workflow-service")).status()).toBe(404);
    } finally {
      await authenticated?.dispose();
      if (service) await payload.delete({ collection: "services", id: service, overrideAccess: true });
      if (account) await payload.delete({ collection: "users", id: account, overrideAccess: true });
      await payload.destroy();
    }
  });
});