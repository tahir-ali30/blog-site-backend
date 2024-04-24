const {
	createCategory,
	getAllCategories,
	getASingleCategory,
	deleteCategory,
	updateCategory,
} = require("../controllers/category.controller");
const { upload } = require("../middleware");

const router = require("express").Router();

router
	.route("/")
	.get(getAllCategories)
	.post(upload.single("category_img"), createCategory)
	.patch(upload.single("category_img"), updateCategory);
router.route("/:name").get(getASingleCategory).delete(deleteCategory);

module.exports = router;
