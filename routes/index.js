const router = require("express").Router();

// routes import
const blogRoutes = require("./blog.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const imageRoutes = require("./image.routes");

router.use("/blogs", blogRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/images", imageRoutes);

module.exports = router;
