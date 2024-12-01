const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const { encryptPassword, decryptPassword } = require('../utils/cryptographyFunction/encryptFunction');
const { decrypt } = require('dotenv');
const { generateToken } = require('../utils/jwtFunctions/generateToken');

const signUpUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            mobileNo,
            profilePicture
        } = req.body;

        if (!firstName || !email || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: "Please fill all the Required Fields.",
                error: null
            })
        }

        let user = await User.findOne({
            email
        })

        if (user) {
            return res.status(400).json({
                success: false,
                errorMessage: "User already exists. Please Login!!!",
                error: null
            })
        }

        const userId = `u-${uuidv4()}`;

        const encryptedPassword = await encryptPassword(password);
        console.log("encryptedPassword:39", encryptedPassword)
        user = await User.create({
            ...(userId && { userId }),
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email }),
            ...(password && { password: encryptedPassword }),
            ...(mobileNo && { mobileNo }),
            ...(profilePicture && { profilePicture }),
        });

        return res.status(201).json({
            success: true,
            message: "User created Succeffully",
            data: user
        })
    } catch (error) {
        console.log('signUpUser:Error')
        console.log(error)
        console.log(error.message)
        return res.status(201).json({
            success: true,
            errorMessage: "Internal Server Error",
            error: error,
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: "Please fill all the Required Fields.",
                error: null
            })
        }

        let user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                errorMessage: "User doesn't Exists. Please Register!!!",
                error: null
            })
        }

        const userId = `u-${uuidv4()}`;

        const decryptedPassword = await decryptPassword(password, user.password);
        if (!decryptedPassword) {
            return res.status(400).json({
                success: false,
                errorMessage: "Invalid Email or Password.",
                error: null
            })
        }

        const token = generateToken(user.userId);
        if (!token.success) {
            return res.status(400).json({
                success: false,
                errorMessage: "Internal Server Error",
                error: null
            })
        }

        delete user.password;
        delete user[password];

        return res.status(200).json({
            success: true,
            message: "User Logged In Succeffully",
            data: {
                user: user,
                token: token.token
            }
        })
    } catch (error) {
        console.log('signUpUser:Error')
        console.log(error)
        console.log(error.message)
        return res.status(201).json({
            success: true,
            errorMessage: "Internal Server Error",
            error: error,
        })
    }
}

const searchUsers = async (req, res) => {
    console.log("searchUsers")
    try {
        const {
            searchQuery
        } = req.query;

        if (!searchQuery) {
            return res.status(400).json({
                success: false,
                errorMessage: "Please fill all the Required Fields.",
                error: null
            })
        }
        // db.users.find({ "name": { "$regex": "Jo", "$options": "i" } })
        let users = await User.find({
            "$or": [
                { "firstName": { "$regex": searchQuery, "$options": "i" } },
                { "lastName": { "$regex": searchQuery, "$options": "i" } }
            ]
        }).select("-password")

        console.log("users", users)
        // if (!users) {
        //     return res.status(400).json({
        //         success: false,
        //         errorMessage: "User doesn't Exists. Please Register!!!",
        //         error: null
        //     })
        // }


        return res.status(200).json({
            success: true,
            message: "Users for the Queried value",
            data: {
                users: users,
            }
        })
    } catch (error) {
        console.log('searchUsers:Error')
        console.log(error)
        console.log(error.message)
        return res.status(201).json({
            success: true,
            errorMessage: "Internal Server Error",
            error: error,
        })
    }
}

module.exports = {
    signUpUser,
    loginUser,
    searchUsers
}