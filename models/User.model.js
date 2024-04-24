const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		userName: {
			type: String,
			unique: true,
			lowercase: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		role: {
			type: String,
			required: true,
			default: "user",
		},
		avatar_img: {
			type: String,
		},
		bio: {
			type: String,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function () {
	if(!(this.isModified("password"))) return

	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createToken = function () {
	return jwt.sign(
		{ userId: this._id, name: this.fullName },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
		}
	);
};

userSchema.methods.comparePassword = async function(password){
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
}

module.exports = mongoose.model("User", userSchema);
