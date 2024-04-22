const { getAllImages, uploadImage } = require('../controllers/imageUpload.controller');
const { upload } = require('../middleware/multer.middleware');

const router = require('express').Router();

router.route('/').get(getAllImages).post(upload.single('image'), uploadImage)

module.exports = router