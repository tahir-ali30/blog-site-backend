const mongoose = require("mongoose");

async function connectDB() {
	if (mongoose.connection === "1") return mongoose.connection; // already connected

	try {
		return await mongoose.connect(process.env.MONGO_URI);
	} catch (error) {
		console.log(error);
	}
}
module.exports = connectDB;
