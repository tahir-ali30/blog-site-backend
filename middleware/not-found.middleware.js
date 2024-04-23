const { ApiResponse } = require("../utils");

const notFound = (req, res) =>
	res.status(404).json(new ApiResponse(404, null, "Route does not exist"));

module.exports = notFound;
