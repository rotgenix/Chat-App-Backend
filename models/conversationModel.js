const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
        unique: true
    },
    isGroupConversation: {
        type: Boolean,
        default: false
    },
    conversationUsers: {
        type: [
            {
                type: String,
                required: true,
            }
        ],
    },
}, {
    timeStamps: true
})

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;