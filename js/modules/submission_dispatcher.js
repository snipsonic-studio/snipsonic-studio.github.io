// File: js/modules/submission_dispatcher.js
import { HUB_CONFIG } from "../config.js";

export class SubmissionDispatcher {
  constructor(formEl, dropzoneManager) {
    this.formEl = formEl;
    this.dropzoneManager = dropzoneManager;
    this.submitButton = formEl.querySelector("#submit-button");
    this.successModal = document.getElementById("success-modal");
    this.ticketIdEl = document.getElementById("ticket-id");
    this.closeModalBtn = document.getElementById("close-modal-btn");
    this.copyTicketBtn = document.getElementById("copy-ticket-btn");
    this.bindEvents();
  }

  bindEvents() {
    this.formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    this.closeModalBtn.addEventListener("click", () => {
      this.successModal.classList.add("hidden");
    });

    this.copyTicketBtn.addEventListener("click", () => {
      this.copyTicketId();
    });
  }

  async handleSubmit() {
    if (!this.validateForm()) return;

    this.showLoadingState();

    try {
      const formData = this.prepareFormData();
      const response = await this.sendFormData(formData);
      this.handleSuccess(response);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.resetSubmitButton();
    }
  }

  validateForm() {
    // Basic validation
    const email = this.formEl.querySelector("#input-email").value;
    const subject = this.formEl.querySelector("#input-subject").value;
    const description = this.formEl.querySelector("#input-description").value;

    if (!email || !subject || !description) {
      alert("Vui lòng điền đầy đủ Email, Tiêu đề và Nội dung chi tiết trước khi gửi.");
      return false;
    }

    // Check rate limiting
    const rateLimitKey = HUB_CONFIG.STORAGE_KEYS.RATE_LIMIT;
    const rateLimitData = JSON.parse(localStorage.getItem(rateLimitKey)) || {
      timestamps: []
    };

    const now = Date.now();
    const tenMinutesAgo = now - 10 * 60 * 1000;
    const recentSubmissions = rateLimitData.timestamps.filter(ts => ts > tenMinutesAgo);

    if (recentSubmissions.length >= HUB_CONFIG.LIMITS.MAX_TICKETS_PER_10_MIN) {
      alert(`Bạn đã gửi phản hồi nhiều lần trong thời gian ngắn (${HUB_CONFIG.LIMITS.MAX_TICKETS_PER_10_MIN} lượt/10 phút). Vui lòng thử lại sau ít phút.`);
      return false;
    }

    return true;
  }

  prepareFormData() {
    const formData = new FormData(this.formEl);

    // Add inline logs to form data
    const inlineLogs = this.dropzoneManager.inlineTextLogs;
    if (inlineLogs.length > 0) {
      formData.append("inline_logs", JSON.stringify(inlineLogs));
    }

    // Add binary files to form data
    const binaryFiles = this.dropzoneManager.binaryFiles;
    binaryFiles.forEach(file => formData.append("attachments", file));

    // Generate ticket ID
    const ticketId = this.generateTicketId();
    this.lastTicketId = ticketId;
    formData.append("_subject", this.generateEmailSubject(ticketId));
    formData.append("ticket_id", ticketId);

    const hiddenTicketInput = this.formEl.querySelector("input[name='ticket_id']");
    if (hiddenTicketInput) {
      hiddenTicketInput.value = ticketId;
    }

    return formData;
  }

  generateTicketId() {
    const now = new Date();
    const year = now.getFullYear();
    const randomPart = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
    return `SNIP-${year}-${randomPart}`;
  }

  generateEmailSubject(ticketId) {
    const activeTabBtn = document.querySelector("#ticket-tabs button.active");
    const category = activeTabBtn ? activeTabBtn.dataset.tab : "bug";
    const versionEl = this.formEl.querySelector("#input-app-version");
    const version = (versionEl && versionEl.value) ? versionEl.value : "Web";
    const subject = this.formEl.querySelector("#input-subject").value || "User Submission";

    return `[SnipSonic Support][${ticketId}][${category.toUpperCase()}][v${version}] ${subject}`;
  }

  async sendFormData(formData) {
    const endpoint = HUB_CONFIG.ENDPOINTS[HUB_CONFIG.PROVIDER];

    if (HUB_CONFIG.PROVIDER === "WEB3FORMS") {
      formData.append("access_key", HUB_CONFIG.WEB3FORMS_ACCESS_KEY);
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData
      });
      return response.json();
    } else {
      // FormSubmit.co doesn't need the access key in the body
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData
      });
      return response.json();
    }
  }

  handleSuccess(response) {
    const isSuccess = response.success === "true" || response.success === true || response.code === 200 || response.ok;
    if (isSuccess) {
      const ticketIdInput = this.formEl.querySelector("input[name='ticket_id']");
      const ticketId = (ticketIdInput && ticketIdInput.value) || this.lastTicketId || "SNIP-CONFIRMED";
      this.ticketIdEl.textContent = ticketId;
      this.successModal.classList.remove("hidden");
      this.formEl.reset();
      this.dropzoneManager.binaryFiles = [];
      this.dropzoneManager.inlineTextLogs = [];
      this.dropzoneManager.updateFileList();

      // Update rate limiting
      const rateLimitKey = HUB_CONFIG.STORAGE_KEYS.RATE_LIMIT;
      const rateLimitData = JSON.parse(localStorage.getItem(rateLimitKey)) || {
        timestamps: []
      };
      rateLimitData.timestamps.push(Date.now());
      localStorage.setItem(rateLimitKey, JSON.stringify(rateLimitData));
    } else {
      throw new Error(response.message || "Failed to submit the form");
    }
  }

  handleError(error) {
    console.error("Submission error:", error);
    alert(`Không thể gửi phản hồi: ${error.message || "Lỗi kết nối mạng"}`);
  }

  showLoadingState() {
    this.submitButton.disabled = true;
    this.submitButton.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-900 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Đang gửi phản hồi...`;
  }

  resetSubmitButton() {
    this.submitButton.disabled = false;
    this.submitButton.innerHTML = "Gửi phản hồi cho chúng tôi";
  }

  copyTicketId() {
    const ticketId = this.ticketIdEl.textContent;
    navigator.clipboard.writeText(ticketId).then(() => {
      this.copyTicketBtn.textContent = "✓ Đã sao chép";
      setTimeout(() => {
        this.copyTicketBtn.textContent = "Sao chép mã hỗ trợ";
      }, 2000);
    }).catch(err => {
      console.error("Failed to copy ticket ID:", err);
    });
  }
}