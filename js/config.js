// File: js/config.js
export const HUB_CONFIG = {
  APP_NAME: "SnipSonic Studio",
  // Switch provider between "WEB3FORMS" and "FORMSUBMIT"
  PROVIDER: "FORMSUBMIT",
  ENDPOINTS: {
    // Sếp's Google Drive email address for support receiving
    FORMSUBMIT: "https://formsubmit.co/ajax/ndphuongsky@gmail.com",
    WEB3FORMS: "https://api.web3forms.com/submit"
  },
  WEB3FORMS_ACCESS_KEY: "YOUR_WEB3FORMS_PUBLIC_ACCESS_KEY",
  LIMITS: {
    MIN_HUMAN_INTERACTION_MS: 3000,
    COOLDOWN_SECONDS: 60,
    MAX_TICKETS_PER_10_MIN: 3,
    MAX_BINARY_FILE_SIZE_MB: 5,
    MAX_INLINE_LOG_CHARS: 25000
  },
  STORAGE_KEYS: {
    RATE_LIMIT: "snipsonic_support_rate_quota_v1",
    RECENT_TICKETS: "snipsonic_recent_tickets_v1"
  }
};