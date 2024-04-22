const express = require("express");
const connectDB = require("./db/connectDB");
const app = express();
require("dotenv").config();
const { ApiResponse } = require("./utils/ApiResponse");
const { removeFile } = require("./utils/removefile");
const { default: mongoose } = require("mongoose");

// middlewares import
const errorHandlerMiddleware = require('./middleware/error-handler.middleware');
const test = require("./middleware/test.middleware");
const cors = require('cors');

// route import
const baseRouter = require('./routes')

const BlogModel = require("./models/Blog.model");
const CategoryModel = require("./models/Category.model");

const PORT = process.env.PORT || 5000;

// using middlewares
app.use(cors());
app.use(express.json());
// app.use(test)

// route decleration
app.use('/api/v1',baseRouter)

app.use(errorHandlerMiddleware)

// files route
app.get('/uploads/public/:fileName', (req, res) => {
	const { fileName } = req.params;
	// if (!(`${__dirname}/uploads/public/${fileName}`)) return res.status(404).json(new ApiResponse(404, {}, 'No such file exists'));
	res.sendFile(`${__dirname}/uploads/public/${fileName}`);
})

const start = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

		// await changeCategories();
	} catch (error) {
		console.log(error);
	}
};

start();

async function changeCategories() {
	const blogs = await BlogModel.find({}, {}, { lean: true });
	const categories = await CategoryModel.find();
	const filterBlogs = blogs.filter(blog => categories.some((cat) => {
		if (typeof blog.category !== 'string') return true;
		return cat.name === blog.category?.toLowerCase()
	}));

	const newBlogs = filterBlogs.map((blog) => {
		if(typeof blog.category !== 'string') return blog
		const cat = categories.find(cat => cat.name === blog.category.toLowerCase());
		blog.category = cat._id;
		return blog
	});

	// console.log(newBlogs);
	newBlogs.forEach(async (blog) => {
		await BlogModel.findByIdAndUpdate(blog._id, blog);
	})
	// return newBlogs;
}