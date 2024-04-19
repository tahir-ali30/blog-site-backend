const User = require("../models/User.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

async function updateUserDetails(req, res) {
	const details = req.body;

	const user = await User.findByIdAndUpdate(req.user?._id, details, {
		new: true,
	}).select(["-password", "-__v"]);

	res
		.status(200)
		.json(new ApiResponse(200, user, "Details updated successfully"));
}

async function getUserInfo(req, res) {
	const { id } = req.params;

	const user = await User.findById({ _id: id });

	if (!user) throw new ApiError(404, "No user found!");

	const formattedUser = {
		author_name: user.fullName,
		author_img: user.avatar_img,
		author_bio: user.bio,
		author_designation: "Jr.Web Developer",
	};

	res.status(200).json(new ApiResponse(200, formattedUser));
}

async function updateProfilePicture(req, res) {
	if (!req.file) return res.status(404).send("No file provided");

	try {
		const user = await User.findOne({ _id: req.user._id });

		removeFile(user.profilePic);

		user.profilePic = req.file.path;
		await user.save();

		res
			.status(200)
			.send(new ApiResponse(200, {}, `Profile Image successfully updated`));
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getUserInfo,
	updateUserDetails,
	updateProfilePicture,
};
