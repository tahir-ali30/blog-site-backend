const express = require("express");
const router = express.Router();
const {
	getUserInfo,
    updateProfilePicture,
} = require("../controllers/user.controller");
const { upload } = require("../middleware/multer.middleware");
const authMiddleware = require("../middleware/auth.middleware");

router.route("/").get();
router
	.route("/update/avatarimage")
	.post(upload.single("avatar_img"), updateProfilePicture);
router.route("/:id").get(getUserInfo).patch().delete();

module.exports = router;
