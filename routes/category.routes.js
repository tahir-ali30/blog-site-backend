const { createCategory, getAllCategories, getASingleCategory } = require('../controllers/category.controller');
const { upload } = require('../middleware/multer.middleware');

const router = require('express').Router();

router
    .route('/')
    .get(getAllCategories)
    .post(upload.single('category_img'), createCategory)
router
    .route('/:name')
    .get(getASingleCategory)

module.exports = router