const Conversation = require("../../models/conversationModel")

const getConversations = async (userId) => {
    try {
        const conversations = await Conversation.find({
            conversationUsers: userId // Find documents where userId is in the conversationUsers array
        });
        // const conversations2 = await Conversation.find({
        //     $or: [
        //         { conversationUsers: userId },
        //         // { receiver: userId }
        //     ]
        // })

        return {
            success: true,
            conversations
        }
    } catch (error) {
        console.log('getConversations:Error')
        console.log(error)
        console.log(error.message)
        return {
            success: false,
            errorMessage: "Internal Server Error",
            error: error,
        }
    }
}

module.exports = {
    getConversations
}