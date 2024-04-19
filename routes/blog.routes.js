const express = require("express");
const router = express.Router();
const {
	getBlogs,
	createBlog,
	deleteAllBlog,
	getASingleBlog,
	updateBlog,
	deleteBlog,
	getActiveBlogs,
	searchBlogs,
} = require("../controllers/blog.controller");
const { upload } = require("../middleware/multer.middleware");
const authMiddleware = require("../middleware/auth.middleware");

router
	.route("/")
	.get(getActiveBlogs, getBlogs)
	.post(upload.single("featured_img"), authMiddleware, createBlog)
	// .post(authMiddleware, createBlog)
	.delete(deleteAllBlog);
router.route("/search").get(searchBlogs);
router
	.route("/:id")
	.get(getASingleBlog)
	.patch(upload.single("featured_img"), updateBlog)
	.delete(deleteBlog);

module.exports = router;
