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
router.route("/:name").get(getASingleCategory).delete(deleteCategory).patch(upload.single("category_img"), updateCategory);;

module.exports = router;
