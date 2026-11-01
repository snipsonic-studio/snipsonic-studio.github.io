// File: js/modules/dropzone_manager.js
import { HUB_CONFIG } from "../config.js";

export class DropzoneManager {
  constructor(dropzoneEl, fileInputEl, fileListEl, inlineLogInputEl) {
    this.dropzoneEl = dropzoneEl;
    this.fileInputEl = fileInputEl;
    this.fileListEl = fileListEl;
    this.inlineLogInputEl = inlineLogInputEl;
    this.binaryFiles = [];
    this.inlineTextLogs = [];
    this.bindEvents();
  }

  bindEvents() {
    ["dragenter", "dragover"].forEach((evt) => {
      this.dropzoneEl.addEventListener(evt, (e) => {
        e.preventDefault();
        this.dropzoneEl.classList.add("border-sky-400", "bg-sky-950/20");
      });
    });

    ["dragleave", "drop"].forEach((evt) => {
      this.dropzoneEl.addEventListener(evt, (e) => {
        e.preventDefault();
        this.dropzoneEl.classList.remove("border-sky-400", "bg-sky-950/20");
      });
    });

    this.dropzoneEl.addEventListener("drop", (e) => {
      e.preventDefault();
      this.dropzoneEl.classList.remove("border-sky-400", "bg-sky-950/20");
      this.handleFiles(e.dataTransfer.files);
    });

    this.fileInputEl.addEventListener("change", (e) => {
      this.handleFiles(e.target.files);
    });

    this.dropzoneEl.addEventListener("click", () => {
      this.fileInputEl.click();
    });
  }

  handleFiles(files) {
    for (const file of files) {
      if (this.isTextLogFile(file)) {
        this.readTextFile(file);
      } else if (this.isBinaryFile(file)) {
        this.addBinaryFile(file);
      } else {
        this.showError(`Định dạng tệp không được hỗ trợ: ${file.name}`);
      }
    }
  }

  isTextLogFile(file) {
    const logExtensions = [".log", ".txt", ".json", ".srt", ".xml"];
    return logExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  }

  isBinaryFile(file) {
    const binaryExtensions = [".png", ".jpg", ".jpeg", ".mp4", ".webm"];
    return binaryExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  }

  readTextFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (content.length > HUB_CONFIG.LIMITS.MAX_INLINE_LOG_CHARS) {
        this.showError(`Tệp log quá lớn: ${file.name} (${Math.round(content.length/1024)}KB)`);
        return;
      }
      this.inlineTextLogs.push({ name: file.name, content });
      this.updateFileList();
    };
    reader.readAsText(file);
  }

  addBinaryFile(file) {
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > HUB_CONFIG.LIMITS.MAX_BINARY_FILE_SIZE_MB) {
      this.showError(`Tệp quá lớn: ${file.name} (${fileSizeMB.toFixed(1)}MB, tối đa 5MB)`);
      return;
    }
    this.binaryFiles.push(file);
    this.updateFileList();
  }

  updateFileList() {
    this.fileListEl.innerHTML = "";
    const allFiles = [...this.inlineTextLogs, ...this.binaryFiles];

    allFiles.forEach((file, index) => {
      const fileItem = document.createElement("div");
      fileItem.className = "flex items-center justify-between p-2 bg-[#0F172A]/50 rounded";

      const fileInfo = document.createElement("div");
      fileInfo.className = "flex items-center space-x-2";

      const fileIcon = document.createElement("div");
      fileIcon.className = "w-6 h-6 flex items-center justify-center bg-[#38BDF8]/20 rounded";
      fileIcon.innerHTML = "<svg class=\"w-4 h-4 text-[#38BDF8]\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z\"></path></svg>";

      const fileName = document.createElement("span");
      fileName.className = "text-sm";
      fileName.textContent = file.name;

      fileInfo.appendChild(fileIcon);
      fileInfo.appendChild(fileName);

      const removeBtn = document.createElement("button");
      removeBtn.className = "text-[#F59E0B] hover:text-[#F59E0B]/80";
      removeBtn.innerHTML = "<svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\"></path></svg>";
      removeBtn.addEventListener("click", () => this.removeFile(index));

      fileItem.appendChild(fileInfo);
      fileItem.appendChild(removeBtn);
      this.fileListEl.appendChild(fileItem);
    });

    // Update the hidden input with inline logs
    this.inlineLogInputEl.value = JSON.stringify(this.inlineTextLogs);
  }

  removeFile(index) {
    if (index < this.inlineTextLogs.length) {
      this.inlineTextLogs.splice(index, 1);
    } else {
      this.binaryFiles.splice(index - this.inlineTextLogs.length, 1);
    }
    this.updateFileList();
  }

  showError(message) {
    const errorEl = document.createElement("div");
    errorEl.className = "text-[#F59E0B] text-sm mb-2";
    errorEl.textContent = message;
    this.fileListEl.appendChild(errorEl);
    setTimeout(() => errorEl.remove(), 5000);
  }

  getFormData() {
    const formData = new FormData();
    this.binaryFiles.forEach(file => formData.append("attachments", file));
    return formData;
  }
}