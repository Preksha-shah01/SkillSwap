
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const uploadDirectory = path.join(__dirname, "..", "uploads");

fs.mkdirSync(uploadDirectory, { recursive: true });

const allowedTypes = {
  ".pdf": ["application/pdf"],
  ".ppt": ["application/vnd.ms-powerpoint"],
  ".pptx": [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
  ".doc": ["application/msword"],
  ".docx": [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const uniqueName = `${crypto.randomUUID()}${extension}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  const acceptedMimeTypes = allowedTypes[extension];

  if (
    !acceptedMimeTypes ||
    !acceptedMimeTypes.includes(file.mimetype)
  ) {
    return cb(
      new Error(
        "Only PDF, PPT, PPTX, DOC and DOCX files are allowed."
      )
    );
  }

  cb(null, true);
};

const uploadResource = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
});

module.exports = {
  uploadResource,
  uploadDirectory,
};
