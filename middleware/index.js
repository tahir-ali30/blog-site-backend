const errorHandlerMiddleware = require("./error-handler.middleware");
const authMiddleware = require("./auth.middleware");
const { upload } = require("./multer.middleware");
const notFoundMiddleware = require("./not-found.middleware");

module.exports = {
	authMiddleware,
	errorHandlerMiddleware,
	upload,
	notFoundMiddleware,
};
