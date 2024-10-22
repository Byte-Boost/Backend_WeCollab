const controller = require('../controllers/archive.controller.js');
const adminMiddleware = require('../middleware/admin.middleware');
const router = require('express').Router();
const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save the uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });
  
router.post('/upload',adminMiddleware, upload.single('archive'), controller.uploadArchive);
router.get('/download/:filename', controller.downloadArchive);
router.delete('/delete/:filename', adminMiddleware, controller.deleteArchive);
router.get('/', controller.getArchives);
module.exports = router;
