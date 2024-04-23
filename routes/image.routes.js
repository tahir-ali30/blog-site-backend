const { getAllImages, uploadImage, deleteImage } = require('../controllers/imageUpload.controller');
const { upload } = require('../middleware');

const router = require('express').Router();

router.route('/').get(getAllImages).post(upload.single('image'), uploadImage)
router.delete('/:publicId', deleteImage)

module.exports = router