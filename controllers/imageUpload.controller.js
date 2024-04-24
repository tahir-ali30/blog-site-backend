const Image = require('../models/Images.model');
const { ApiError, ApiResponse, asyncHandler, uploadToCloudinary, deleteFromCloudinary } = require('../utils');

const uploadImage = asyncHandler(async (req, res) => {
    const file = req.file
    
    if (!file) throw new ApiError(404, 'No image is provided');

    const uploadedImage = (await uploadToCloudinary(file.path));

    const image = await Image.create(uploadedImage);

    if (!image) throw new ApiError(401, 'Failed to upload the image!');

    res.status(201).json(new ApiResponse(201, image, 'Image successfully uploaded'));
})

const getAllImages = asyncHandler(async (req, res) => {
    const images = await Image.find();

    if (!images) throw new ApiError(500, "Failed to get images");

    res.status(200).json(new ApiResponse(200, images));
})

const deleteImage = asyncHandler(async (req, res) => {
    const { publicId } = req.params;
    await deleteFromCloudinary(publicId);
    await Image.deleteOne({ public_id: publicId });
    res.status(200).json(new ApiResponse(200,null,'Image deleted successfully'))
})

module.exports = {
    uploadImage,
    getAllImages,
    deleteImage,
}