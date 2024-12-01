const express = require('express');
const connectDb = require('./database/connectDB/connectDb');
const { createServer } = require('http');
const cors = require('cors')
// Router
const userRouter = require('./routes/userRoutes');
const { getConversations } = require('./controllers/conversationControllers/conversationControllers');
const Conversation = require('./models/conversationModel');
const Message = require('./models/MessageModel');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()

const app = express();
app.use(cors())
const server = createServer(app, {

});

const io = require('socket.io')(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST"]
    }
});

console.log("19", process.env.FRONTEND_URL)

// Conncet DB
connectDb();

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Home Route of Chat App Server!"
    })
})

// User Routes
app.use(express.json());
app.use('/api/v1/user', userRouter);

const PORT = process.env.PORT;

io.on('connection', async (socket) => {
    console.log("New socket connection", socket.id);

    const obj = {
        messages: [
            {
                message: "Hello",
                sender: "User1"
            },
            {
                message: "Hello",
                sender: "User2"
            }
        ]
    }

    // const conversations = [];
    const conversations = await getConversations("userId");
    socket.emit("all-conversations", conversations);

    // Send message
    socket.on("send-message", async ({ senderId, receiverId, message }) => {

        let conversations = await Conversation.findOne({
            conversationUsers: { $all: [senderId, receiverId] }
        });

        if (!conversations) {
            const cvId = `cv-${uuidv4()}`;
            conversations = await Conversation.create({
                conversationId: cvId,
                conversationUsers: [senderId, receiverId]
            });
        }

        console.log("conversations", conversations)

        const sendMessage = await Message.create({
            conversationId: conversations.conversationId,
            senderId,
            receiverId,
            message
        });

        socket.emit("message-send-success", {
            success: true,
            sendMessage
        });
    })

    socket.on("disconnect", () => {
        console.log("Socket Disconnected", socket.id);
    });
    // client.on('event', data => { /* … */ });
    // client.on('disconnect', () => { /* … */ });
});

server.listen(PORT, () => {
    console.log(`Server is runnig`)
    console.log(`Server url: http://localhost:${PORT}`);
});

