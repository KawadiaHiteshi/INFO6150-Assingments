const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

  const fileExtension = path.extname(file.originalname).toLowerCase();
  const mimeType = (file.mimetype || "").toLowerCase();

  if (allowedMimeTypes.includes(mimeType) || allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format. Only JPEG, PNG, and GIF are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;