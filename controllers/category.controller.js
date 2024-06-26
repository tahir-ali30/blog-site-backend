const {
	ApiError,
	asyncHandler,
	uploadToCloudinary,
	ApiResponse,
	ObjectIsEmpty,
	extractPublicId,
	deleteFromCloudinary,
} = require("../utils");
const Category = require("../models/Category.model");

const getAllCategories = asyncHandler(async (req, res) => {
	const { name } = req.query;
	const queryObject = {};

	if (name) queryObject.name = name;

	const categories = await Category.find(queryObject);

	if (!categories) throw new ApiError(404, "No categories found!");

	res.status(200).json(new ApiResponse(200, categories));
});

const getASingleCategory = asyncHandler(async (req, res) => {
	const { name } = req.params;

	if (!name) throw new ApiError(400, `No category name is provided!`);

	const category = await Category.findOne({ name });

	if (!category)
		throw new ApiError(
			404,
			`The category with name of ${name} does not exist!`
		);

	res
		.status(200)
		.json(
			new ApiResponse(200, category, "Successfully retrieved the category")
		);
});

const createCategory = asyncHandler(async (req, res) => {
	const categoryDetails = req.body;
	const category_img = (await uploadToCloudinary(req?.file?.path))?.url;

	if (ObjectIsEmpty(categoryDetails))
		throw new ApiError(404, "No data provided");

	const category = await Category.create({ ...categoryDetails, category_img });

	if (!category)
		throw new ApiError(500, "Server Error: Failed to Create Category");

	res
		.status(201)
		.json(new ApiResponse(201, category, "Category created successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
	const catDetails = req.body;
	const { name } = req.params;
	if (ObjectIsEmpty(catDetails))
		throw new ApiError(400, "No details provided to update category with");

	const category_img =
		(await uploadToCloudinary(req?.file?.path))?.url || req.body.category_img;

	const category = await Category.findOne({ name });

	if (!category) throw new ApiError(404, "Category Not Found!");

	if (category?.category_img !== category_img) {
		const public_id = extractPublicId(category?.category_img);
		await deleteFromCloudinary(public_id);
	}

	await category.updateOne({ catDetails, category_img });

	res
		.status(200)
		.json(new ApiResponse(200, {}, "Category updated successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
	const { name } = req.params;
	const category = await Category.findOne({ name });

	if (!category) throw new ApiError(404, "Category not found.");

	const public_id = extractPublicId(category?.category_img);

	await deleteFromCloudinary(public_id);
	await category.deleteOne();

	res
		.status(200)
		.json(new ApiResponse(200, null, "Category Deleted Successfully"));
});

module.exports = {
	createCategory,
	getAllCategories,
	getASingleCategory,
	updateCategory,
	deleteCategory,
};
