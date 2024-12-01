const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        return {
            success: true,
            token
        }
    } catch (error) {
        console.log("generateToken:Error")
        console.log(error)
        return {
            success: false,
            error
        };
    }
}

module.exports = { generateToken }