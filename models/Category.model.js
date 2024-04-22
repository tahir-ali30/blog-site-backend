const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Category name is required"],
			unique: [true, "This category already exists"],
			lowercase: true,
		},
		category_img: {
			type: String,
            default: "uploads/public/defaultImg.jpeg",
			get: function (img) {
                if (img.includes('cloudinary')) return img
                return `${process.env.DOMAIN}/${img}`
            }
		},
		description: {
			type: String,
			required: [true, "Description of the category is required"],
		},
		meta_title: {
			type: String,
			required: [true, "Meta Title of the category is required"],
		},
		meta_description: {
			type: String,
			required: [true, "Meta Description of the category is required"],
		},
	},
	{
		timestamps: true,
		toObject: { getters: true },
		toJSON: { getters: true },
	}
);

module.exports = mongoose.model('Category', categorySchema);