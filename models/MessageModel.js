const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    }
}, {
    timeStamps: true
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;