// File: js/app.js
import { TelemetryParser } from "./modules/url_telemetry_parser.js";
import { DropzoneManager } from "./modules/dropzone_manager.js";
import { SubmissionDispatcher } from "./modules/submission_dispatcher.js";

// Initialize DOM references
const domRefs = {
  appBanner: document.getElementById("hero-banner"),
  versionInput: document.getElementById("input-app-version"),
  subjectInput: document.getElementById("input-subject"),
  descriptionTextarea: document.getElementById("input-description"),
  badgeContainer: document.getElementById("diag-badges-container"),
  stacktraceWrapper: document.getElementById("stacktrace-wrapper"),
  stacktracePre: document.getElementById("stacktrace-pre"),
  hiddenStacktrace: document.getElementById("hidden-stacktrace"),
  pasteClipboardBtn: document.getElementById("paste-clipboard-btn"),
  manualEnvGroup: document.getElementById("manual-env-group"),
  diagCard: document.getElementById("diag-card"),
  hiddenTelemetryJson: document.getElementById("hidden-telemetry-json"),
  ticketTabs: document.getElementById("ticket-tabs"),
  dropzoneEl: document.getElementById("dropzone"),
  fileInputEl: document.getElementById("file-input"),
  fileListEl: document.getElementById("file-list"),
  inlineLogInputEl: document.getElementById("inline-log-input"),
  supportForm: document.getElementById("support-form")
};

// Initialize modules
const telemetryContext = TelemetryParser.parseCurrentUrl();
const dropzoneManager = new DropzoneManager(
  domRefs.dropzoneEl,
  domRefs.fileInputEl,
  domRefs.fileListEl,
  domRefs.inlineLogInputEl
);
const submissionDispatcher = new SubmissionDispatcher(domRefs.supportForm, dropzoneManager);

// Hydrate DOM with telemetry data
TelemetryParser.hydrateDom(telemetryContext, domRefs);

// Set active tab based on telemetry or default to "bug"
const activeTab = telemetryContext.ticketType || "bug";
const tabButtons = domRefs.ticketTabs.querySelectorAll("button");
tabButtons.forEach(button => {
  if (button.dataset.tab === activeTab) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }
});

// Handle tab switching
domRefs.ticketTabs.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (button) {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  }
});

// Handle paste clipboard button safely
if (domRefs.pasteClipboardBtn) {
  domRefs.pasteClipboardBtn.addEventListener("click", async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      domRefs.stacktracePre.textContent = clipboardText;
      domRefs.hiddenStacktrace.value = clipboardText;
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      alert("Không thể đọc bộ nhớ tạm (clipboard). Vui lòng dán thủ công.");
    }
  });
}

// Initialize Lucide icons
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}