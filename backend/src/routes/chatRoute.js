import express, { Router } from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chatController.js";
import { getUserChats ,createChat , getChatById , updateLastMessage } from "../controllers/chatController.js";

const router = express.Router();

router.get("/token" , protectRoute , getStreamToken);
router.get("/", protectRoute, getUserChats);
router.post("/", protectRoute, createChat);
router.get("/:chatId", protectRoute, getChatById);
router.put("/:chatId/last-message", protectRoute, updateLastMessage);


export default router;
