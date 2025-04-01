const CustomError = require("../utils/customError")
let User = require("../model/userSchema")

module.exports.currentUser = async (req, res, next) => {
    try {
        res.status(200).json({
            user: req.user
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error.message, 500))
    }
}

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body
        let existingUser = await User.findOne({ email })
        if (existingUser) return next(new CustomError("User already exists", 400))
        let user = await User.create({
            username, email, password
        })
        await user.save()

        let token = user.generateAuthToken()
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 5
        })
        res.status(200).json({
            message: "User created successfully",
            token

        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}

module.exports.login = async (req, res, next) => {
    try {
        let { email, password } = req.body
        let existingUser = await User.findOne({email})
        if (!existingUser) return next(new CustomError("User not found", 400))
        let user = await User.authenticate(email, password)
        let token = user.generateAuthToken()
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 5,
            secure:true
        })
        res.status(200).json({
            message: "Login Successful",
            token
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error.message, 500))
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true
        })
        res.status(200).json({
            message: "Logout Successful"
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error.message, 500))
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        let { username, email, password } = req.body
        if (username) req.user.username = username
        if (email) req.user.email = email
        if (password) req.user.password = password
        await req.user.save()

        res.status(200).json({
            message: "User updated successfully",
            user: req.user
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error.message, 500))
    }
}