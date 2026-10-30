# DAISA Website

React/Next.js public website and Payload CMS on one Node.js host. English is at `/`, Spanish at `/es`, and administration at `/admin`. The legacy site outside this directory is unchanged.

## Local Development

Use a supported Node.js runtime (`^22.23.4 || >=24.22.1`). A pinned development Node 24 binary is included in devDependencies so npm scripts work on this machine without changing the system installation. For a first install on an older system runtime, use `npm exec --yes --package=node@24 -- npm ci`.

From this directory:

```sh
npm ci
npm run setup
npm run import:legacy
npm run admin:create
npm run dev -- --hostname 127.0.0.1
```

Open <http://localhost:3000> and <http://localhost:3000/admin>. Use the same hostname as `SERVER_URL`; do not alternate between localhost and 127.0.0.1 for admin writes. If port 3000 is occupied, choose a free port, update `SERVER_URL` in the ignored local environment file, restart, and use that URL consistently.

Setup generates a random secret in the ignored `.env` file and creates local storage at `../.daisa-data`. It never creates a default account. The administrator command prompts for your email and a hidden password of at least 14 characters. Type credentials directly in your terminal, never in chat. Public registration and Payload's first-register endpoint are blocked. Only this local command may provision the initial account; it refuses if one exists.

The legacy import is for **local review only**, requires `ALLOW_LOCAL_SETUP=true`, and refuses production. It imports three services, six projects, their source images, and paired translations. It parses HTML with Cheerio, hashes images for deduplication, and skips existing source records, preserving later edits. Some service summaries are new editorial drafts based on the source. Project categories, contact information, translations, and image permissions still require owner review. Testimonials and placeholder pages are deliberately excluded.

## Editing

- Services and Projects have localized title, summary, plain-text description, SEO fields, primary image, gallery, industry, order, and featured selection.
- Save a draft in each language, then publish. Both languages publish together, not independently. Images need alt text in both languages. Draft content and revision history require authentication; public pages always request published content without locale fallback.
- Preview opens an authenticated, non-indexable draft page. Revisions use Payload's version history.
- Smaller order numbers appear first. Published URLs are locked to avoid breaking links. Unpublish to archive instead of deleting records.
- Media accepts decoded JPEG, PNG, and WebP files up to 10 MB and 40 million pixels. Original uploads and responsive derivatives live outside the release directory. Referenced images, including version references, cannot be deleted. **All uploaded media is public**, even when attached to a draft: never upload confidential material.
- The homepage shows up to six published DAISA projects. Its three hero images are separate, high-resolution service illustrations, not claimed DAISA project photographs. Each source is 3840x2560 and is stored locally under `public/images/hero/`; the third is cropped to 3840x1600 to exclude the branded shirt. The carousel requests responsive output at quality 90, including high-density desktop sizes, and uses only 1-6% zoom. Small legacy project originals remain in the gallery at a more appropriate size; replace them through the CMS when higher-resolution company originals are available.
- The Embla slider uses crossfades, slow image movement, animated captions, previous/next buttons, project dots, and a pause/play control. Automatic playback pauses on hover, focus, and when offscreen; manual selection stays paused until Play is chosen. Reduced-motion preferences disable autoplay and visual animations while preserving manual navigation. Company/About/contact copy and slider labels are maintained in `src/content/copy.ts`; layouts are not an unrestricted page builder.

## Contact Email

Configure the SMTP and mail fields from `.env.example`, then restart the app. Delivery uses the server-side SMTP adapter, a fixed recipient, and a validated Reply-To. Without SMTP the form returns HTTP 503; it never reports success or logs a message as if delivery occurred. Password reset is also unavailable until SMTP works; there is no console-token fallback.

The endpoint validates and bounds JSON, rejects header injection and foreign origins, uses a honeypot, and allows five requests per ten minutes per rate-limit key. `TRUST_PROXY=false` uses one shared key because Next's Request does not expose a trusted remote address. For production, configure the host's reverse proxy to overwrite forwarded headers, then set `TRUST_PROXY=true` for per-address limits. Do not trust arbitrary user-supplied forwarding headers. Rate limits are single-process/in-memory and reset on restart.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm exec -- playwright install chromium
npm run test:e2e
```

Browser tests need a running local app and imported local content. Set `TEST_BASE_URL` when using a nondefault port. They verify English/Spanish at 360, 768, and 1440 pixels; working images; navigation; redirects; unauthorized access; contact failures; and administrator sign-in, UI editing, authenticated preview, bilingual publication, and archival. The authenticated scenario provisions a random temporary account and record and removes them in `finally`; it skips instead of modifying a pre-existing owner's account. Tracing is disabled to avoid recording credentials. Do not run these mutation tests against production or an owner's active editing database. Screenshots are written to ignored `test-results/`.

SQLite integration tests use a temporary database/media directory. Type generation and the admin import map can be refreshed with:

```sh
npm run payload -- generate:types
npm run payload -- generate:importmap
```

## Production Gate

Deployment has **not** been attempted. Confirm the current provider supports the pinned runtime and Next/Payload combination, native sharp/libSQL, sufficient RAM, an always-on single Node process, reverse-proxy/TLS configuration, persistent local file locking, SMTP, and scheduled independent backups. Do not silently substitute external hosting or storage.

Set a unique secret, the canonical HTTPS `SERVER_URL`, an absolute SQLite file URL, and an absolute media directory outside the release tree. Keep database and environment files outside the public web root. The host must preserve the database, its journal/WAL companions, and uploads across restarts and deployments. Local development uses schema push; production disables it and uses reviewed migrations:

```sh
npm ci
npm run build
NODE_ENV=production npm run payload -- migrate
NODE_ENV=production npm run admin:create
npm run start
```

Use `NODE_ENV=production` for runtime/provisioning as configured by the host. The initial administrator must be provisioned locally before public exposure. The production database should begin empty and use the initial migration; do not apply the initial migration to the already schema-pushed development database. A reviewed content migration is still required: the local import intentionally cannot seed production.

Generate future migrations in development with `npm run payload -- migrate:create NAME`. Test every migration and rollback on a staging restore first. Keep prior releases and matching database snapshots: a code-only rollback may be incompatible with changed tables.

Back up SQLite using its consistent backup mechanism, not a naive copy of the active database file. Back up original media and derivatives with matching snapshots. Keep versioned, encrypted backups outside the release directory, ideally in independent storage provided by the existing host, with a starting 30-day retention policy. Rehearse restoring a snapshot and gallery on isolated staging. Same-disk copies alone do not protect against host loss. Horizontal scaling is not supported by this local-storage design.

## Remaining Before Launch

- Owner approval of the design, bilingual copy, contact details, service/project categories, and photography permissions. Existing photos are low resolution and often contain baked-in frames; obtain originals for the final visual polish.
- Complete review of the detailed workflow/deliverable content on the legacy services-overview page; the initial React page currently presents the three engineering levels rather than all thirteen legacy workflow steps.
- Verify real SMTP delivery and password recovery, sender SPF/DKIM, reverse-proxy rate-limit behavior, restart/release persistence, backup restore, and the actual host's operational limits.
- Run a production performance/accessibility audit and review structured business data before adding verified Organization/LocalBusiness JSON-LD. No new analytics/tracking was introduced.
- Recheck dependency advisories. Patched DOMPurify/GraphQL scalars/esbuild are scoped through tested npm overrides. A remaining upstream deepmerge prototype-poisoning advisory affects Payload's dependency tree; there is no published patched deepmerge version at implementation time. Track an upstream fix and assess it before public deployment. Do not use blanket force upgrades or treat the local preview as production approval.

Official references: [Payload installation](https://payloadcms.com/docs/getting-started/installation), [SQLite](https://payloadcms.com/docs/database/sqlite), [uploads](https://payloadcms.com/docs/upload/overview).

## Hero Image Sources

The service-illustration photographs are downloaded from Unsplash and converted to local WebP without upscaling. Source URLs are retained in `scripts/fetch-hero-images.ts`. Run `npm exec -- tsx scripts/fetch-hero-images.ts` from this directory to reproduce the downloads. The script rejects sources below 3200px wide or 1600px tall. Browser coverage verifies both original and delivered image dimensions at 2x pixel density.

- Planning and mechanical drawings: [source photograph](https://images.unsplash.com/photo-1581092160562-40aa08e78837).
- Metalworking: [source photograph](https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122).
- Workshop equipment inspection: [source photograph](https://images.unsplash.com/photo-1581092160607-ee22621dd758).

These are illustrative stock images, not evidence of DAISA's facilities, employees, clients, or completed work. Review the [Unsplash license](https://unsplash.com/license) and any applicable third-party rights before public launch. Automated access to the license page returned HTTP 401 during this update, so the current legal text was not reverified. The asset downloads do not use the Unsplash API or require browser-side access to third-party hosts.
