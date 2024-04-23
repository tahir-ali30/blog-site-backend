const Image = require('../models/Images.model');
const { ApiError, ApiResponse, asyncHandler, uploadToCloudinary } = require('../utils');

const uploadImage = asyncHandler(async (req, res) => {
    const file = req.file
    
    if (!file) throw new ApiError(404, 'No image is provided');

    const url = (await uploadToCloudinary(file.path)).secure_url;

    const image = await Image.create({ url });

    if (!image) throw new ApiError(401, 'Failed to upload the image!');

    res.status(201).json(new ApiResponse(201, image, 'Image successfully uploaded'));
})

const getAllImages = asyncHandler(async (req, res) => {
    const images = await Image.find();

    if (!images) throw new ApiError(500, "Failed to get images");

    res.status(200).json(new ApiResponse(200, images));
})

module.exports = {
    uploadImage,
    getAllImages,
}