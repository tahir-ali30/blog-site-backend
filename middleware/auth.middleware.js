const User = require("../models/User.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, _, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		if (!token) throw new ApiError(401, "Unauthorized request");

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decodedToken.userId).select("-password");

		// Checking if the user exists and the token is valid
		if (!user) throw new ApiError(404, "Invalid authentication credentials");

		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		throw new ApiError(401, error?.message || "Invalid access token");
	}
});

module.exports = authMiddleware