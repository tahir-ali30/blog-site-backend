const mongoose = require("mongoose");

async function connectDB() {
	if (mongoose.connection === "1") return mongoose.connection; // already connected

	try {
		const dbConnection = await mongoose.connect(process.env.MONGO_URI);
		return dbConnection;
	} catch (error) {
		console.log(error);
	}
}
module.exports = connectDB;
