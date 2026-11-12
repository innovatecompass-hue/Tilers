/* Precision Tile Co. — Site configuration
 *
 * One place for every environment-specific value the front end needs.
 * This is a static site (no build step), so these are plain JS constants,
 * not runtime env vars. Never put secrets here: everything in this file is public.
 *
 * LEAD_WEBHOOK_URL
 *   Webhook that receives form leads. Recommended: an n8n Webhook node with
 *   "Allowed Origins (CORS)" set to the site's domain, which then forwards to the
 *   GoHighLevel Speed-to-Lead inbound webhook. (Browsers send a CORS preflight for
 *   JSON POSTs; point this straight at GHL only after confirming it answers one.)
 *   Leave empty to fall back to opening the visitor's email app pre-filled to LEAD_EMAIL.
 *
 * LEAD_ERROR_LOG_URL
 *   Optional monitoring webhook (n8n / Slack relay). If a lead POST fails, the
 *   failure point is reported here so no lead disappears silently.
 */
window.SITE_CONFIG = Object.freeze({
  BUSINESS_NAME:      'Precision Tile Co.',
  LEAD_EMAIL:         'marcus@precisiontileco.com',
  PHONE_DISPLAY:      '(318) 555-0182',
  PHONE_TEL:          '+13185550182',
  LEAD_WEBHOOK_URL:   '',   // e.g. 'https://<your-n8n-host>/webhook/tilers-site-lead'
  LEAD_ERROR_LOG_URL: '',   // e.g. 'https://<your-n8n-host>/webhook/site-lead-errors'
  LEAD_TIMEOUT_MS:    10000
});
