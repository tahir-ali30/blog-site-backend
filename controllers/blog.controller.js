const Blog = require("../models/Blog.model");
const { ApiResponse, ApiError, asyncHandler, uploadToCloudinary } = require("../utils");
const BLOG_LIMIT = 10;

// controller for fetching all blogs
const getBlogs = asyncHandler(async (req, res) => {
	const { category, status, sort } = req?.query;
	const queryObject = {};
	const sortObject = {};
	let pageNumber = req.query.page || 1;
	// pageNumber = Math.max(Math.floor(pageNumber), 1); // No negative pages!

	const offset = (pageNumber - 1) * BLOG_LIMIT;
	if (category) {
		queryObject.category = category
	}
	if (status) {
		queryObject.status = status
	}
	if (sort) {
		sort.split(',').forEach(item => {
			const [key, value] = item.split(`:`);
			sortObject[key] = isNaN(value) ? value : parseInt(value)
		});
	}

	const blogs = await Blog.find(queryObject).sort(sortObject);
	// const blogs = await Blog.find({}, {}, { limit: BLOG_LIMIT, skip: offset });

	return res.status(200).json(new ApiResponse(200, blogs));
});

// controller for fetching text searched blogs
const searchBlogs = asyncHandler(async (req, res) => {
	const { title } = req?.query;

	if (!title) throw new ApiError(404, 'No title provided to search by');

	const blogs = await Blog.aggregate([
		{
			$search: {
				index: "title",
				text: {
					query: title,
					path: "title",
				},
			},
		},
	]);

	return res.status(200).json(new ApiResponse(200, blogs));
});

// controller for fetching only published and unblocked blogs
const getActiveBlogs = asyncHandler(async (req, res, next) => {
	const { status } = req?.query;

	if (status !== "Published") return next();

	const blogs = await Blog.find({ status, active: true });

	const formattedBlogs = blogs.map((blog) => {
		const jsonBlog = blog.toJSON();

		const formattedBlog = {
			// ...jsonBlog,
			featureImg: jsonBlog.featured_img,
			author_name: jsonBlog.author.fullName,
			author_img: jsonBlog.author.avatar_img,
			author_slug: jsonBlog.author._id,
			cate: jsonBlog?.category?.name || 'uncategorized',
			date: jsonBlog.createdAt,
			slug: jsonBlog.slug,
			title: jsonBlog.title,
			featured: jsonBlog?.featured,
			slidePost: jsonBlog?.slidePost,
			id: jsonBlog._id,
		}

		return formattedBlog
	});

	return res.status(200).json(new ApiResponse(200, formattedBlogs));
});

// controller for fetching a blog
const getASingleBlog = asyncHandler(async (req, res) => {
	const { slug } = req.params;

	const blog = await Blog.findOne({ slug })

	if (!blog) {
		throw new ApiError(404, "No such blog exists");
	}

	const jsonBlog = blog.toJSON();
	const formattedBlog = {
		...jsonBlog,
		featureImg: jsonBlog.featured_img,
		cate: jsonBlog.category.name || 'uncategorized',
		date: jsonBlog.createdAt,
		slug: jsonBlog.slug,
		author_name: jsonBlog.author.fullName,
		author_img: jsonBlog.author.avatar_img,
		author_slug: jsonBlog.author._id,
	}

	res.status(200).json(new ApiResponse(200, formattedBlog));
});

// controller for creating a blog
const createBlog = asyncHandler(async (req, res) => {
	const newBlog = req.body;
	const featured_img = (await uploadToCloudinary(req?.file?.path))?.url;

	newBlog.tags = newBlog?.tags?.split(",");

	if (!newBlog.title || !newBlog.content) {
		throw new ApiError(400, "Title or Blog content is missing!");
	}

	const blog = await Blog.create({
		...newBlog,
		featured_img,
		author: req?.user?._id,
	});
	return res
		.status(201)
		.json(new ApiResponse(201, blog, "Blog successfully uploaded"));
});

// controller for updating a blog
const updateBlog = asyncHandler(async (req, res) => {
	const { slug } = req.params;
	const newBlog = req.body;
	const featured_img = req?.file?.path ? (await uploadToCloudinary(req?.file?.path))?.url : newBlog.featured_img;

	newBlog.tags = newBlog?.tags?.split(",");
	const blog = await Blog.findOne({ slug });

	if (!blog) throw new ApiError(404, "No such blog found!");

	const updatedBlog = await blog.updateOne(
		{
			...newBlog,
			featured_img,
		},
		{returnDocument: 'after'}
	);

	return res
		.status(200)
		.json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

// controller for deleting a blog
const deleteBlog = asyncHandler(async (req, res) => {
	const { id } = req.params;

	await Blog.findByIdAndDelete({ _id: id });

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Blog Deleted Successfully"));
});

module.exports = {
	getBlogs,
	getASingleBlog,
	createBlog,
	updateBlog,
	deleteBlog,
	getActiveBlogs,
	searchBlogs,
};
