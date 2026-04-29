# Local Business SEO / GEO Playbook
## For: Tile Contractors & Similar Local Home Services

> Reusable strategy for getting a local service business to rank in both Google search and AI-generated answers (ChatGPT, Perplexity, Claude, etc.).

---

## How AI Search Engines Actually Work

When someone asks an AI assistant "who is the best tile installer in Shreveport?", the AI pulls from:

- **Google organic results** — the primary signal
- **Directory sites** it trusts: Houzz, Angi, Thumbtack, Yelp, Yellow Pages, HomeAdvisor
- **Industry roundup articles** — sites like Home Builder Digest that rank for "[trade] in [city]" queries
- **The business's own website** — especially if it contains clear, factual, structured content

Ranking well in AI answers = ranking well across all of the above simultaneously.

---

## The Non-Negotiables (Do These First)

### 1. Google Business Profile
- Fully complete: name, address, phone, hours, website
- Add photos (exterior, work in progress, finished projects, team)
- Select precise primary category (e.g. "Tile Contractor")
- Enable messaging
- Respond to every review
- Post updates at least once a month

### 2. Directory Listings
Get listed — free tiers exist on all of these:
| Directory | URL | Priority |
|-----------|-----|----------|
| Houzz | houzz.com/pro | High |
| Angi | angi.com | High |
| Thumbtack | thumbtack.com | High |
| Yelp | biz.yelp.com | High |
| Yellow Pages | yellowpages.com | Medium |
| HomeAdvisor | homeadvisor.com | Medium |
| BBB | bbb.org | Medium |

**NAP Consistency**: Name, Address, and Phone must be identical across every listing and the website.

### 3. Reviews
- Ask every satisfied customer for a Google review (send a direct link)
- Aim for 10+ reviews with recency within the past 3 months
- Respond professionally to all reviews, positive and negative
- Reviews on Houzz and Yelp also matter — they feed AI results directly

### 4. Roundup Citations
Get cited in articles like:
- "Best tile installers in Shreveport LA"
- "Top tile contractors in the ArkLaTex"

Target: Home Builder Digest, Expertise.com, Thumbtack editorial, local news home sections. These rank well and AI models pull from them directly.

---

## Website SEO Requirements

### Title Tag Formula
```
[Primary Service] [City State] | [Business Name] | [Hook]
```
Example: `Tile Installation Shreveport LA | Precision Tile Co. | Free Quotes`

### Meta Description Formula
```
[Business Name] — [City]'s [superlative] [service]. [Services list]. [Trust signal]. [CTA + phone].
```
Keep under 160 characters.

### Keywords to Target (Tile Example — adapt for other trades)
**Primary:**
- `tile installation Shreveport LA`
- `bathroom tiler Shreveport`
- `tile contractor [city]`

**Secondary:**
- `kitchen backsplash [city]`
- `floor tile [city]`
- `ceramic tile installer Louisiana`
- `[service] [nearby city]` (repeat for each service area)

### H1 / Heading Strategy
- H1 should contain primary keyword naturally
- H2s for each service should include city when natural
- Use location in at least 2–3 body headings

### Must-Have Page Sections
1. **Hero** with city + service in headline
2. **Services** (individual sections for each service type)
3. **About** with license number, credentials, years in business
4. **Testimonials** with reviewer names and cities
5. **FAQ** — minimum 6–8 questions (see FAQ strategy below)
6. **Contact** with full NAP (Name, Address, Phone)

---

## Structured Data (Schema Markup)

Always implement for local service businesses:

### 1. LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "name": "Business Name",
  "telephone": "+1XXXXXXXXXX",
  "address": { "@type": "PostalAddress", "addressLocality": "City", "addressRegion": "ST" },
  "areaServed": [{ "@type": "City", "name": "City Name" }],
  "priceRange": "$$",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "N" },
  "openingHoursSpecification": [...]
}
```

### 2. FAQPage Schema
Add alongside FAQ content. Each question/answer pair gets indexed separately by Google and fed directly into AI knowledge bases.

### 3. Service Schemas
Wrap each service in an Offer within `hasOfferCatalog`.

---

## FAQ Strategy (Critical for GEO)

FAQ content is the highest-ROI GEO tactic. AI models use FAQ answers as direct sources for generated responses.

**Formula for each question:**
- State the question as a user would naturally ask it
- Answer directly in the first sentence
- Include a specific fact, number, or credential
- Include the city name where natural
- Link internally where helpful

**Required FAQ topics for any local service business:**
1. How much does [service] cost in [city]?
2. Are you licensed and insured in [state]?
3. What areas do you serve?
4. How long does [primary service] take?
5. Do you offer free estimates?
6. [Technical question relevant to trade]
7. [Another technical/differentiator question]
8. What warranty do you offer?

---

## GEO-Specific Tactics

GEO = Generative Engine Optimization. Optimizing to appear in AI-generated answers, not just blue links.

### What AI Models Trust
- Clear, factual, specific content (numbers, dates, credentials)
- Content that directly answers questions (FAQ format)
- Authoritative third-party citations (directories, roundups)
- Structured data that explicitly labels what the business does and where
- Consistent NAP across the entire web

### GEO Content Principles
| Do | Don't |
|----|-------|
| State facts with specifics ("15+ years", "$8–$20/sqft") | Use vague claims ("great service", "best prices") |
| Answer questions directly in first sentence | Bury the answer in paragraph 3 |
| Include license numbers, certifications | Leave credentials unstated |
| Name every city you serve explicitly | Say "surrounding areas" without listing them |
| Use schema markup for every key entity | Leave content unstructured |

### AI Citation Signals (in priority order)
1. Google Business Profile (primary signal for local queries)
2. High-authority directory listings (Houzz, Angi, Yelp)
3. Roundup article citations
4. Own website FAQ content
5. Schema markup on website
6. Review volume and recency

---

## Technical SEO Checklist

- [ ] `<title>` contains primary keyword + city
- [ ] Meta description under 160 chars with CTA
- [ ] `<link rel="canonical">` set
- [ ] Open Graph tags (og:title, og:description, og:url, og:type)
- [ ] Geo meta tags (geo.region, geo.placename, geo.position)
- [ ] JSON-LD LocalBusiness schema
- [ ] JSON-LD FAQPage schema
- [ ] JSON-LD Service/Offer schemas
- [ ] sitemap.xml submitted to Google Search Console
- [ ] robots.txt references sitemap
- [ ] Page loads in under 3 seconds
- [ ] Mobile-responsive
- [ ] HTTPS (Vercel provides this automatically)

---

## Monthly Maintenance Tasks

| Task | Frequency |
|------|-----------|
| Ask happy customers for Google reviews | After every job |
| Post a photo to Google Business Profile | Weekly |
| Respond to all new reviews | Within 48 hours |
| Check NAP consistency on directories | Monthly |
| Update sitemap `lastmod` date | When content changes |
| Monitor Google Search Console for errors | Monthly |

---

## Deployment Notes

- **Hosting**: Vercel (free tier) — connected to GitHub repo, auto-deploys on push
- **Domain**: Custom domain can be added in Vercel dashboard → Settings → Domains
- **SSL**: Automatic via Vercel
- **Analytics**: Add Vercel Analytics or Google Analytics 4 tag to `<head>`

---

## Adapting This Playbook for Other Trades

Swap out:
- Service names (plumber, electrician, HVAC, roofer, etc.)
- Trade-specific FAQ questions
- Schema `@type` — use `Plumber`, `Electrician`, `RoofingContractor`, `HVACBusiness` etc.
- Keywords follow the same `[service] [city] [state]` pattern

Everything else (directory strategy, review strategy, GEO principles, schema structure) applies universally.
