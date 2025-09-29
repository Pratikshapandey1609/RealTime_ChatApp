import { generateStreamToken } from "../config/stream.js";
import Chat from "../models/chatModel.js";

export async function  getStreamToken(req , res) {
    try{
      const token = generateStreamToken(req.user.id);

      res.status(200).json({token});

    }catch(error){
       console.log("Error in getStream controller ", error.message);
       res.status(500).json({message : "Internal Server Error"})
    }
}

export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({ participants: userId })
      .populate("participants", "fullName profilePic")
      .sort({ updatedAt: -1 }); // latest chat on top

    res.status(200).json(chats);
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

export const createChat = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user._id;

    // Check if chat already exists
    let chat = await Chat.findOne({
      participants: { $all: [userId, friendId] }
    });

    if (chat) return res.status(200).json(chat);

    // Otherwise create new chat
    chat = new Chat({
      participants: [userId, friendId],
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    console.error("Error creating chat:", err);
    res.status(500).json({ message: "Failed to create chat" });
  }
};

export const updateLastMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        lastMessage: { text, sender: userId, createdAt: new Date() }
      },
      { new: true }
    ).populate("participants", "fullName profilePic");

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.status(200).json(chat);
  } catch (err) {
    console.error("Error updating last message:", err);
    res.status(500).json({ message: "Failed to update last message" });
  }
};


export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId)
      .populate("participants", "fullName profilePic");

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.status(200).json(chat);
  } catch (err) {
    console.error("Error fetching chat:", err);
    res.status(500).json({ message: "Failed to fetch chat" });
  }
};


