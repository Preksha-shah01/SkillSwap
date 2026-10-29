
const fs = require("fs/promises");
const path = require("path");

const allowedExtensions = new Set([
  ".pdf",
  ".ppt",
  ".pptx",
  ".doc",
  ".docx",
]);

async function validateResourceFile(file) {
  if (!file) {
    return {
      valid: false,
      message: "Please select a file.",
    };
  }

  const extension = path.extname(
    file.originalname
  ).toLowerCase();

  if (!allowedExtensions.has(extension)) {
    return {
      valid: false,
      message: "Unsupported file extension.",
    };
  }

  const { fileTypeFromFile } = await import("file-type");
  const detected = await fileTypeFromFile(file.path);

  if (!detected) {
    return {
      valid: false,
      message: "Could not identify the file format.",
    };
  }

  const expectedMime = {
    ".pdf": "application/pdf",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pptx":
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".doc": "application/msword",
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };

  if (detected.mime !== expectedMime[extension]) {
    return {
      valid: false,
      message: "File content does not match its extension.",
    };
  }

  const stats = await fs.stat(file.path);

  if (stats.size === 0 || stats.size > 10 * 1024 * 1024) {
    return {
      valid: false,
      message: "File must be between 1 byte and 10 MB.",
    };
  }

  return {
    valid: true,
    mime: detected.mime,
  };
}

module.exports = { validateResourceFile };
