const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/"
    }
}, {
    timeStamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;