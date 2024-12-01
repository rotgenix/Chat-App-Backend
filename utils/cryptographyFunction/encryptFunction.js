const bcrypt = require('bcrypt')

const encryptPassword = async (userPassword) => {
    const encryptedPassword = await bcrypt.hash(userPassword, 10);
    return encryptedPassword;
}

const decryptPassword = async (userPassword, encryptedPassword) => {
    const isPasswordCorrect = await bcrypt.compare(userPassword, encryptedPassword);
    return isPasswordCorrect;
}

module.exports = { encryptPassword, decryptPassword }