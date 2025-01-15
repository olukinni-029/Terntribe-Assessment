const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({destination: (req, file, cb) => {
    // Directory where files will be saved
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Rename the file to include a timestamp to avoid conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"), false);
    }
  };
  

const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 1024 * 1024 * 50 },
});

module.exports = upload;