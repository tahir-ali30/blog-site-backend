const express = require("express");
const connectDB = require("./db/connectDB");
const app = express();
require("dotenv").config();
const fs = require('node:fs');
const { ApiResponse } = require("./utils/ApiResponse");

// middlewares import
const { errorHandlerMiddleware, notFoundMiddleware } = require('./middleware');
const cors = require('cors');
const cookieParser = require('cookie-parser')

// route import
const baseRouter = require('./routes');
const { asyncHandler } = require("./utils");

const PORT = process.env.PORT || 5000;

// using middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// route decleration
app.use('/api/v1',baseRouter)

// files route
app.get('/uploads/public/:fileName', (req, res) => {
	const { fileName } = req.params;
	const localPath = `${__dirname}/uploads/public/${fileName}`;
	const fileExists = fs.existsSync(localPath)
	if (!fileExists) return res.status(404).json(new ApiResponse(404, null, 'No such file exists'));
	res.sendFile(localPath);
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

		// console.log(await changeCategories())
	} catch (error) {
		console.log(error);
	}
};

start();