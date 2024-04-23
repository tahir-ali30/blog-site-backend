const { v2: cloudinary } = require("cloudinary");
const removeFile = require("./removefile");
const { ApiError } = require("./ApiError");

cloudinary.config({
	cloud_name: "dxfhnsdbe",
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function deleteFromCloudinary(public_id) {
	if (!public_id) return;
	try {
		const { result } = await cloudinary.uploader.destroy(public_id);
		return result;
	} catch (error) {
		throw new ApiError(500, "Failed to delete resource/image");
	}
}

async function uploadToCloudinary(localPath) {
	if (!localPath) return;
	try {
		const res = await cloudinary.uploader.upload(
			localPath,
			{ resource_type: "auto" }
			// function (error, result) {
			// 	// console.log(result);
			// }
		);
		removeFile(localPath);
		return res;
	} catch (error) {
		removeFile(localPath);
	}
}

module.exports = {
	uploadToCloudinary,
	deleteFromCloudinary,
};
