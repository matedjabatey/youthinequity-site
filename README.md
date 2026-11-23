# Youth in Equity website

The static site for youthinequity.ca: plain HTML and CSS with no build step, hosted on Cloudflare Pages.

```
index.html            Home page (programs, events, team, partners, join)
smonii/index.html     /smonii
coming-soon/index.html /coming-soon
404.html              Not-found page
assets/               styles.css, site.js, logo, favicon
_headers              Cloudflare caching/security headers
```

## Editing
Edit the HTML in any text editor (or ask Claude) and push to `main`. Cloudflare redeploys automatically within about a minute.

## Newsletter
Open `assets/site.js` and paste a free Formspree endpoint into `NEWSLETTER_ENDPOINT`
(formspree.io → New form → copy the `https://formspree.io/f/...` URL). Until you do,
the Subscribe button opens an email to info@youthinequity.ca.

## Deploy on Cloudflare Pages (one-time)
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick this repo.
2. Framework preset: **None**. Build command: *(leave empty)*. Build output directory: `/`. Click **Save and Deploy**.
3. Check the preview at `<project>.pages.dev`.
4. In the Pages project → **Custom domains** → add `youthinequity.ca`, then add `www.youthinequity.ca`.
   - Cloudflare will offer to replace the existing DNS records that point to Framer. Accept.
   - If it says a record already exists, go to **DNS → Records** and delete the old Framer
     `A`/`CNAME` records for `@` and `www` first (they point to Framer IPs or `*.framer.app` hosts), then retry.
5. Optional: to send `www` to the bare domain (or the reverse), add a Bulk Redirect or a Redirect Rule under **Rules**.
6. Once the site loads from Cloudflare, remove the custom domain in Framer and cancel the Framer plan.
