const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/public");
	},
	filename: function (req, file, cb) {
		// const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

module.exports = { upload };
