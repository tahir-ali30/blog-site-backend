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
const { upload, authMiddleware } = require("../middleware");

router
	.route("/")
	.get(getActiveBlogs, getBlogs)
	.post(upload.single("featured_img"), authMiddleware, createBlog);
router.route("/search").get(searchBlogs);
router
	.route("/:slug")
	.get(getASingleBlog)
	.patch(upload.single("featured_img"), updateBlog)
	.delete(deleteBlog);

module.exports = router;
