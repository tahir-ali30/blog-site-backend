const express = require("express");
const connectDB = require("./db/connectDB");
const cors = require('cors');
const app = express();
require("dotenv").config();

// routes import
const blogRoutes = require("./routes/blog.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const { ApiResponse } = require("./utils/ApiResponse");
const { removeFile } = require("./utils/removefile");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// routes decleration
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

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
	} catch (error) {
		console.log(error);
	}
};

start();
