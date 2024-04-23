const express = require("express");
const router = express.Router();
const {
	getUserInfo,
    updateProfilePicture,
} = require("../controllers/user.controller");
const { upload, authMiddleware } = require("../middleware");

router.route("/").get();
router
	.route("/update/avatarimage")
	.post(upload.single("avatar_img"), updateProfilePicture);
router.route("/:id").get(getUserInfo).patch().delete();

module.exports = router;
