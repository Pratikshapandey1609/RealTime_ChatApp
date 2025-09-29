import mongoose from "mongoose"


const chatSchema = new mongoose.Schema({
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    lastMessage: {
        text: { type: String },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now }
    },
    unreadCount: {
        type: Map,
        of: Number, // e.g. { userId: count }
        default: {}
    }
}, { timestamps: true }
);

const Chat = mongoose.model("chat" , chatSchema);
export default Chat;


