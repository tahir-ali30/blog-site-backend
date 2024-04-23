const mongoose = require("mongoose");
const populatePlugin = require('mongoose-autopopulate');
const { slugify } = require("../utils");

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			autopopulate: {
				select: "-email -password -role -userName -createdAt -updatedAt",
			}
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
			autopopulate: true,
		},
		featured_img: {
			type: String,
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
		slug: {
			type: String,
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

blogSchema.pre('save', function () {
	this.slug = slugify(this.title);
})

blogSchema.options.selectPopulatedPaths = false;
blogSchema.plugin(populatePlugin)

module.exports = mongoose.model("Blog", blogSchema);
