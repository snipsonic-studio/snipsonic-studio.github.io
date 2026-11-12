/**
 * SnipSonic Studio - Support Hub Bridge (Google Apps Script)
 * End-to-end automation:
 * 1. Saves user attachments to Google Drive folder ('SnipSonic Support Attachments')
 * 2. Creates a GitHub Issue in the repository with system telemetry & Drive links
 * 3. Logs ticket to Google Sheet (optional auto-created)
 * 4. Sends instant email notification to ndphuongsky@gmail.com with Reply-To set to user
 *
 * Strict modular rule: < 300 lines.
 */

// CONFIGURATION (Can also be set in Project Settings > Script Properties)
const CONFIG = {
  GITHUB_OWNER: "snipsonic-studio",
  GITHUB_REPO: "snipsonic-studio.github.io", // or target SnipSonic repository
  GITHUB_TOKEN: "", // Paste your GitHub Personal Access Token (PAT) here or in Script Properties
  ADMIN_EMAIL: "ndphuongsky@gmail.com",
  DRIVE_FOLDER_NAME: "SnipSonic Support Attachments",
  ENABLE_SHEET_LOGGING: true
};

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: "Missing POST payload" });
    }

    const data = JSON.parse(e.postData.contents);
    const ticketId = data.ticket_id || ("SNIP-" + new Date().getFullYear() + "-" + Math.floor(Math.random()*0xFFFF).toString(16).toUpperCase());
    const category = (data.category || "bug").toLowerCase();
    const email = data.email || "anonymous@user.com";
    const subject = data.subject || "No Subject";
    const description = data.description || "No Description";
    const appVersion = data.app_version || "Web";
    const telemetry = data.telemetry || {};

    // 1. Process and save attachments to Google Drive
    const driveLinks = saveAttachmentsToDrive(data.attachments || [], ticketId);

    // 2. Create GitHub Issue
    const issueResult = createGitHubIssue({
      ticketId: ticketId,
      category: category,
      email: email,
      subject: subject,
      description: description,
      appVersion: appVersion,
      telemetry: telemetry,
      driveLinks: driveLinks
    });

    // 3. Log to Google Sheet (if active)
    if (CONFIG.ENABLE_SHEET_LOGGING) {
      logToSheet(ticketId, category, email, subject, description, issueResult.url, driveLinks);
    }

    // 4. Send Gmail Notification
    sendAdminEmail(ticketId, category, email, subject, description, issueResult.url, driveLinks);

    return jsonResponse({
      success: true,
      ticket_id: ticketId,
      issue_url: issueResult.url,
      drive_files_count: driveLinks.length
    });

  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function doGet(e) {
  return jsonResponse({
    status: "online",
    service: "SnipSonic Support Hub Backend",
    timestamp: new Date().toISOString()
  });
}

function saveAttachmentsToDrive(attachments, ticketId) {
  if (!attachments || !attachments.length) return [];

  const folder = getOrCreateFolder(CONFIG.DRIVE_FOLDER_NAME);
  const links = [];

  for (let i = 0; i < attachments.length; i++) {
    const item = attachments[i];
    if (!item.base64 || !item.name) continue;

    try {
      const decodedBytes = Utilities.base64Decode(item.base64);
      const mimeType = item.type || "application/octet-stream";
      const fileName = `[${ticketId}]_${item.name}`;
      const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);
      const file = folder.createFile(blob);
      
      // Allow viewing with link
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      links.push({ name: item.name, url: file.getUrl() });
    } catch (e) {
      links.push({ name: item.name, error: e.toString() });
    }
  }
  return links;
}

function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

function createGitHubIssue(ctx) {
  const token = getGitHubToken();
  if (!token) {
    return { url: "", note: "GitHub Token not set in Script Properties" };
  }

  const endpoint = `https://api.github.com/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/issues`;
  
  // Format markdown body
  let body = `## 🎫 Ticket \`${ctx.ticketId}\`\n\n`;
  body += `- **Submitter:** ${ctx.email}\n`;
  body += `- **Category:** \`${ctx.category.toUpperCase()}\`\n`;
  body += `- **App Version:** \`${ctx.appVersion}\`\n`;
  body += `- **Created At:** ${new Date().toUTCString()}\n\n`;
  body += `---\n\n### 📝 Description\n${ctx.description}\n\n`;

  if (ctx.telemetry && Object.keys(ctx.telemetry).length > 0) {
    const sys = ctx.telemetry.system || {};
    const diag = ctx.telemetry.diagnostics || {};
    body += `---\n\n### 🖥️ Diagnostics & Telemetry\n`;
    body += `| Spec | Value |\n| :--- | :--- |\n`;
    if (sys.os) body += `| **OS** | ${sys.os} |\n`;
    if (sys.cpu) body += `| **CPU** | ${sys.cpu} |\n`;
    if (sys.gpu) body += `| **GPU** | ${sys.gpu} |\n`;
    if (diag.error_code) body += `| **Error Code** | \`${diag.error_code}\` |\n`;

    if (diag.stacktrace_tail) {
      body += `\n<details>\n<summary>🔍 Stacktrace Preview</summary>\n\n\`\`\`\n${diag.stacktrace_tail}\n\`\`\`\n</details>\n\n`;
    }
  }

  if (ctx.driveLinks && ctx.driveLinks.length > 0) {
    body += `---\n\n### 📎 Attachments (Stored on Google Drive)\n`;
    ctx.driveLinks.forEach(link => {
      if (link.url) {
        body += `- [${link.name}](${link.url})\n`;
      }
    });
    body += `\n`;
  }

  const labels = [ctx.category === "bug" ? "bug" : ctx.category === "feature" ? "enhancement" : "support"];
  labels.push("user-feedback");

  const payload = {
    title: `[${ctx.ticketId}][${ctx.category.toUpperCase()}] ${ctx.subject}`,
    body: body,
    labels: labels
  };

  const options = {
    method: "post",
    headers: {
      "Authorization": "Bearer " + token,
      "Accept": "application/vnd.github+json",
      "User-Agent": "SnipSonic-Support-Bridge"
    },
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(endpoint, options);
  const code = response.getResponseCode();
  const resJson = JSON.parse(response.getContentText());

  if (code === 201) {
    return { url: resJson.html_url, id: resJson.number };
  } else {
    return { url: "", error: resJson.message || ("HTTP " + code) };
  }
}

function getGitHubToken() {
  const props = PropertiesService.getScriptProperties().getProperty("GITHUB_TOKEN");
  return props || CONFIG.GITHUB_TOKEN;
}

function sendAdminEmail(ticketId, category, userEmail, subject, description, issueUrl, driveLinks) {
  const emailSubj = `[SnipSonic Support][${ticketId}][${category.toUpperCase()}] ${subject}`;
  let html = `<div style="font-family: sans-serif; max-width: 600px; line-height: 1.6; color: #1e293b;">`;
  html += `<h2 style="color: #0284c7; margin-bottom: 4px;">SnipSonic Support Ticket</h2>`;
  html += `<p style="font-size: 14px; color: #64748b; margin-top: 0;">Ticket ID: <b>${ticketId}</b></p>`;
  html += `<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">`;
  html += `<p><b>From:</b> <a href="mailto:${userEmail}">${userEmail}</a></p>`;
  html += `<p><b>Subject:</b> ${subject}</p>`;
  html += `<p><b>Category:</b> ${category.toUpperCase()}</p>`;
  html += `<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 12px 0;">`;
  html += `<p><b>Description:</b><br>${description.replace(/\n/g, "<br>")}</p>`;
  html += `</div>`;

  if (issueUrl) {
    html += `<p>📌 <b>GitHub Issue:</b> <a href="${issueUrl}" style="color: #0284c7; text-decoration: underline;">${issueUrl}</a></p>`;
  }

  if (driveLinks && driveLinks.length) {
    html += `<p>📎 <b>Attachments (${driveLinks.length} files saved in Google Drive):</b></p><ul>`;
    driveLinks.forEach(l => {
      html += `<li><a href="${l.url}">${l.name}</a></li>`;
    });
    html += `</ul>`;
  }

  html += `<p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Click 'Reply' in your email client to respond directly to ${userEmail}.</p>`;
  html += `</div>`;

  GmailApp.sendEmail(CONFIG.ADMIN_EMAIL, emailSubj, description, {
    htmlBody: html,
    replyTo: userEmail
  });
}

function logToSheet(ticketId, category, userEmail, subject, description, issueUrl, driveLinks) {
  try {
    let sheet;
    try {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    } catch (e) {
      // If standalone script, search or create sheet
      const files = DriveApp.getFilesByName("SnipSonic Support Tickets");
      let ss;
      if (files.hasNext()) {
        ss = SpreadsheetApp.open(files.next());
      } else {
        ss = SpreadsheetApp.create("SnipSonic Support Tickets");
        ss.getActiveSheet().appendRow(["Timestamp", "Ticket ID", "Category", "User Email", "Subject", "Description", "GitHub Issue", "Drive Attachments"]);
      }
      sheet = ss.getActiveSheet();
    }
    const attachStr = (driveLinks || []).map(l => l.url || l.name).join("\n");
    sheet.appendRow([new Date(), ticketId, category, userEmail, subject, description, issueUrl || "N/A", attachStr]);
  } catch (err) {
    console.error("Sheet log error:", err);
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
