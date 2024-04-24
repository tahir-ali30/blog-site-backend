const User = require("../models/User.model");
const { ApiResponse, asyncHandler } = require("../utils");

const register = asyncHandler(async function (req, res) {
	const regUser = req.body;

	try {
		const userExists = await User.exists({ $or: [{email: regUser.email , userName: regUser.username}] })

		if (userExists)
			return res.json(new ApiResponse(400, {}, "User already registered."));

		const user = await User.create(regUser);

		return res
			.status(201)
			.json(
				new ApiResponse(
					201,
					{ user: { name: user.fullName } },
					"Signup Successfull"
				)
			);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
})

const login = asyncHandler(async function (req, res) {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.json(new ApiResponse(400, {}, "Invalid Email"));
		}
		if (!(await user.comparePassword(password))) {
			return res.json(new ApiResponse(400, {}, "Invalid Password"));
		}
		const token = user.createToken();
		const loggedUser = await User.findById(user._id).select("-password");

		return res.json(
			new ApiResponse(200, { token, user: loggedUser }, "Logged In Succesfully")
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
})

module.exports = { register, login };
