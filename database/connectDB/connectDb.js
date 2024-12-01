const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        const mongoConnection = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "ChatApp"
        });
        console.log(`MongoDB Connected to:${mongoConnection.connection.host}`);
        // console.log(mongoConnection)
    } catch (error) {
        console.log(`connectDb:Error`)
        console.log(error)
    }
}

module.exports = connectDb;