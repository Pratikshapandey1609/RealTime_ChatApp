import express, { Router } from "express"
import { acceptFriendRequest, getFriendsRequest, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// apply auth middleware to all routes
router.use(protectRoute);

router.get("/" , getRecommendedUsers)
router.get("/friends" , getMyFriends);

router.post("/friend-request/:id" , sendFriendRequest);
router.put("/friend-request/:id/accept" , acceptFriendRequest);

router.get("/friend-request" , getFriendsRequest);
router.get("/outgoing-friend-request" , getOutgoingFriendReqs)

export default router;