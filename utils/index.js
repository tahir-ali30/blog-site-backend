const { ApiResponse } = require("./ApiResponse");
const { ApiError } = require("./ApiError");
const asyncHandler = require("./asyncHandler");
const { uploadToCloudinary, deleteFromCloudinary } = require("./cloudinary");
const removeFile = require("./removefile");

const ObjectIsEmpty = (obj) => Object.keys(obj).length === 0;

function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w-]+/g, "") // Remove all non-word chars
		.replace(/--+/g, "-") // Replace multiple - with single -
		.replace(/^-+/, "") // Trim - from start of text
		.replace(/-+$/, ""); // Trim - from end of text
}

function extractPublicId(url) {
	if(!url) return null
	let public_id = url.split("/").pop();
	[public_id] = public_id.split(".");
	return public_id;
}

async function changeCategories() {
	const blogs = await BlogModel.find(
		{ category: { $type: "string" } },
		{},
		{ lean: true }
	);
	const categories = await CategoryModel.find();

	const newBlogs = blogs.map((blog) => {
		if (typeof blog.category !== "string") return blog;
		const cat = categories.find(
			(cat) => cat.name === blog.category.toLowerCase()
		);
		blog.category = cat._id;
		return blog;
	});

	// console.log(newBlogs);
	newBlogs.forEach(async (blog) => {
		await BlogModel.findByIdAndUpdate(blog._id, blog);
	});
	return "done";
}

module.exports = {
	ObjectIsEmpty,
	slugify,
	changeCategories,
	ApiError,
	ApiResponse,
	uploadToCloudinary,
	removeFile,
	asyncHandler,
	deleteFromCloudinary,
	extractPublicId,
};
