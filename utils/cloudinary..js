const { v2: cloudinary } = require("cloudinary");
const { removeFile } = require("./removefile");

cloudinary.config({
	cloud_name: "dxfhnsdbe",
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(localPath) {
	if (!localPath) return;
	try {
        const res = await cloudinary.uploader.upload(
        		localPath,
        		{ resource_type: "auto" },
        		// function (error, result) {
        		// 	// console.log(result);
        		// }
            );
            // removeFile(localPath);
            return res
    } catch (error) {
        removeFile(localPath);
    }
}

module.exports = uploadToCloudinary