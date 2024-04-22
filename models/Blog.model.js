const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		content: {
			type: String,
			required: true,
		},
		tags: {
			type: [String],
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
		featured_img: {
			type: String,
			// get: function (img) {
			// 	if (img?.includes("res")) return img;
			// 	return `${process.env.DOMAIN}/${img}`;
			// },
		},
		active: {
			type: Boolean,
			default: true,
		},
		status: {
			type: String,
			enum: ["Published", "Pending", "Draft"],
			default: "Draft",
		},
		createdAt: {
			type: Date,
			get: (date) => new Date(date).toLocaleDateString(),
		},
		updatedAt: {
			type: Date,
			get: (date) => new Date(date).toLocaleDateString(),
		},
	},
	{ timestamps: true, toJSON: { getters: true }, toObject: { getters: true } }
);

// Method to get the author of a blog post
// blogSchema.method("getAuthor", function (cb) {
// 	this.populate("author", "name email").execPopulate();
// });

module.exports = mongoose.model("Blog", blogSchema);
