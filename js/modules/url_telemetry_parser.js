// File: js/modules/url_telemetry_parser.js
export class TelemetryParser {
  /**
   * Parses URL query parameters and Base64URL #ctx fragment safely.
   * Returns a normalized context object without ever throwing unhandled exceptions.
   */
  static parseCurrentUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    const source = (searchParams.get("source") || "web").toLowerCase();
    const rawType = (searchParams.get("type") || "bug").toLowerCase();
    const validTypes = ["bug", "crash", "feature", "general"];
    const ticketType = validTypes.includes(rawType) ? rawType : "bug";

    const result = {
      isAppFlow: source === "app",
      ticketType,
      payload: null,
      parseError: null
    };

    const hash = window.location.hash || "";
    const ctxMatch = hash.match(/[#&]ctx=([A-Za-z0-9_-]+)/);

    if (ctxMatch && ctxMatch[1]) {
      try {
        result.payload = this.decodeBase64UrlJson(ctxMatch[1]);
        result.isAppFlow = true;
      } catch (err) {
        result.parseError = "Telemetry payload could not be decoded; switched to manual fallback.";
      }
    } else if (result.isAppFlow) {
      // Fallback to flat query parameters if #ctx is absent
      result.payload = this.buildPayloadFromQueryParams(searchParams, ticketType);
    }

    return result;
  }

  static decodeBase64UrlJson(b64UrlString) {
    let base64 = b64UrlString.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }
    const binaryStr = window.atob(base64);
    const bytes = Uint8Array.from(binaryStr, (char) => char.charCodeAt(0));
    const jsonStr = new TextDecoder("utf-8").decode(bytes);
    return JSON.parse(jsonStr);
  }

  static buildPayloadFromQueryParams(params, ticketType) {
    return {
      schema_ver: 1,
      source: "snipsonic_desktop_query",
      ticket_type: ticketType,
      app: {
        version: params.get("ver") || "Unknown",
        license_tier: params.get("tier") || "Standard"
      },
      system: {
        os: params.get("os") || "Unknown OS",
        cpu: params.get("cpu") || "Unknown CPU",
        gpu: params.get("gpu") || "Unknown GPU"
      },
      project_ctx: {
        media_fps: params.get("media_fps") || "N/A"
      },
      diagnostics: {
        error_code: params.get("code") || "",
        exception_summary: params.get("summary") || "",
        stacktrace_tail: params.get("trace") || "",
        trace_truncated: params.get("truncated") === "1"
      }
    };
  }

  /**
   * Hydrates DOM elements strictly via .value and .textContent (XSS-proof).
   */
  static hydrateDom(context, domRefs) {
    if (!context.isAppFlow || !context.payload) {
      domRefs.appBanner.classList.add("hidden");
      domRefs.manualEnvGroup.classList.remove("hidden");
      domRefs.diagCard.classList.add("opacity-60");
      return;
    }

    const { app = {}, system = {}, project_ctx = {}, diagnostics = {} } = context.payload;
    domRefs.appBanner.classList.remove("hidden");
    domRefs.manualEnvGroup.classList.add("hidden");

    if (app.version && domRefs.versionInput) {
      domRefs.versionInput.value = String(app.version);
      domRefs.versionInput.readOnly = true;
    }

    if (diagnostics.exception_summary && domRefs.subjectInput && !domRefs.subjectInput.value) {
      domRefs.subjectInput.value = `[${diagnostics.error_code || "DIAG"}] ${diagnostics.exception_summary}`.slice(0, 120);
    }

    // Populate read-only hardware badges
    domRefs.badgeContainer.textContent = "";
    const specs = [
      { label: "OS", val: system.os },
      { label: "CPU", val: system.cpu },
      { label: "GPU", val: system.gpu },
      { label: "RAM", val: system.ram_gb ? `${system.ram_gb} GB` : null },
      { label: "ONNX", val: system.onnx_ep },
      { label: "FPS", val: project_ctx.media_fps },
      { label: "Action", val: project_ctx.last_action }
    ];

    specs.forEach((item) => {
      if (!item.val) return;
      const chip = document.createElement("div");
      chip.className = "px-2.5 py-1 rounded bg-slate-800/90 border border-white/10 text-xs font-mono text-slate-300";
      chip.textContent = `${item.label}: ${item.val}`;
      domRefs.badgeContainer.appendChild(chip);
    });

    if (diagnostics.stacktrace_tail) {
      domRefs.stacktraceWrapper.classList.remove("hidden");
      domRefs.stacktracePre.textContent = String(diagnostics.stacktrace_tail);
      domRefs.hiddenStacktrace.value = String(diagnostics.stacktrace_tail);
    }

    if (diagnostics.trace_truncated && domRefs.pasteClipboardBtn) {
      domRefs.pasteClipboardBtn.classList.remove("hidden");
    }

    // Serialize full diagnostic JSON into hidden form input for email delivery
    domRefs.hiddenTelemetryJson.value = JSON.stringify(context.payload, null, 2);
    domRefs.descriptionTextarea.focus();
  }
}