/* Precision Tile Co. — Lead capture
 *
 * Sends a lead from any site form to the configured webhook (see site-config.js).
 * If no webhook is configured, or the POST fails, it falls back to a pre-filled
 * email so the lead is never silently lost.
 *
 * Payload sent to SITE_CONFIG.LEAD_WEBHOOK_URL (JSON, POST).
 * Keys match the IC Speed-to-Lead inbound webhook spec:
 * {
 *   "source":      "website-contact-form" | "website-quote-builder", // string, required
 *   "firstName":   "Jane",                // string, required
 *   "lastName":    "Doe",                 // string, may be ""
 *   "email":       "jane@example.com",    // string, required
 *   "phone":       "+13185551234",        // string, E.164 or "" if not given
 *   "smsConsent":  false,                 // boolean, true only if the visitor ticked the SMS box
 *   "service":     "Bathroom Tile",       // string, may be ""
 *   "message":     "Free-text notes",     // string, may be ""
 *   "quoteSummary": "...",                // string, quote builder only, may be ""
 *   "pageUrl":     "https://.../quote.html", // string, page the form was sent from
 *   "submittedAt": "2026-11-12T12:00:00.000Z" // ISO 8601
 * }
 *
 * Error log payload sent to SITE_CONFIG.LEAD_ERROR_LOG_URL (JSON, POST, best effort):
 * { "stage": "lead-webhook-post", "error": "HTTP 500", "source": "...", "pageUrl": "...", "at": "ISO 8601" }
 */
(function () {
  'use strict';

  const cfg = window.SITE_CONFIG || {};

  function toE164(raw) {
    const digits = String(raw || '').replace(/\D/g, '');
    if (digits.length === 10) return '+1' + digits;
    if (digits.length === 11 && digits[0] === '1') return '+' + digits;
    return digits ? '+' + digits : '';
  }

  function logFailure(stage, error, lead) {
    console.error('[lead-capture] failed at', stage, error);
    if (!cfg.LEAD_ERROR_LOG_URL) return;
    const body = JSON.stringify({
      stage,
      error: String(error && error.message || error),
      source: lead && lead.source,
      pageUrl: location.href,
      at: new Date().toISOString()
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(cfg.LEAD_ERROR_LOG_URL, new Blob([body], { type: 'application/json' }));
      } else {
        fetch(cfg.LEAD_ERROR_LOG_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
      }
    } catch (_) { /* logging must never break the form */ }
  }

  function mailtoFallback(lead) {
    const lines = [
      lead.quoteSummary || '',
      `Service: ${lead.service || '-'}`,
      lead.message ? `\nNotes:\n${lead.message}` : '',
      `\nName: ${lead.firstName} ${lead.lastName}`.trim(),
      `Email: ${lead.email}`,
      lead.phone ? `Phone: ${lead.phone}` : ''
    ].filter(Boolean);
    const subject = lead.subject || `Quote request from ${lead.firstName} ${lead.lastName}`.trim();
    window.location.href =
      `mailto:${cfg.LEAD_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  /**
   * Submit a lead. Resolves to { method: 'webhook' | 'email' }.
   * 'email' means the visitor's email app was opened and they still need to press Send.
   */
  async function submitLead(input) {
    const lead = {
      source:       input.source,
      firstName:    (input.firstName || '').trim(),
      lastName:     (input.lastName || '').trim(),
      email:        (input.email || '').trim(),
      phone:        toE164(input.phone),
      smsConsent:   Boolean(input.smsConsent),
      service:      input.service || '',
      message:      (input.message || '').trim(),
      quoteSummary: input.quoteSummary || '',
      pageUrl:      location.href,
      submittedAt:  new Date().toISOString()
    };

    if (!cfg.LEAD_WEBHOOK_URL) {
      mailtoFallback({ ...lead, subject: input.subject });
      return { method: 'email' };
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), cfg.LEAD_TIMEOUT_MS || 10000);
    try {
      const res = await fetch(cfg.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: ctrl.signal
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return { method: 'webhook' };
    } catch (err) {
      logFailure('lead-webhook-post', err, lead);
      mailtoFallback({ ...lead, subject: input.subject });
      return { method: 'email' };
    } finally {
      clearTimeout(timer);
    }
  }

  window.submitLead = submitLead;
})();
