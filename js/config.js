// File: js/config.js
export const HUB_CONFIG = {
  APP_NAME: "SnipSonic Studio",
  // Provider: "GOOGLE_APPS_SCRIPT" (Creates GitHub Issue + Drive Attachments + Gmail)
  // Fallback: "FORMSUBMIT" (Direct email to ndphuongsky@gmail.com)
  PROVIDER: "GOOGLE_APPS_SCRIPT",
  ENDPOINTS: {
    // Live Google Apps Script Web App (Connected to ndphuongsky@gmail.com & GitHub Issues)
    GOOGLE_APPS_SCRIPT: "https://script.google.com/macros/s/AKfycbyzNH8cOUfD0LHdSVkskHd_7e0W2yKG5Rlyve1K2A5inyDUHR7bQ3PDYNVFYVyIUzT2/exec",
    FORMSUBMIT: "https://formsubmit.co/ajax/ndphuongsky@gmail.com",
    WEB3FORMS: "https://api.web3forms.com/submit"
  },
  LIMITS: {
    MIN_HUMAN_INTERACTION_MS: 3000,
    COOLDOWN_SECONDS: 60,
    MAX_TICKETS_PER_10_MIN: 5,
    MAX_BINARY_FILE_SIZE_MB: 5,
    MAX_INLINE_LOG_CHARS: 25000
  },
  STORAGE_KEYS: {
    RATE_LIMIT: "snipsonic_support_rate_quota_v1",
    RECENT_TICKETS: "snipsonic_recent_tickets_v1"
  }
};
