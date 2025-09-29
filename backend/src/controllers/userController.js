import User from "../models/authModel.js";
import FriendRequest from "../models/friendRequestModel.js"
import mongoose from "mongoose";

// export async function getRecommendedUsers(req, res) {
//     try {
//         const currentUserId = req.user.id;
//         const currentUser = req.user

//         const recommendedUsers = await User.find({
//             $and: [
//                 { _id: { $ne: currentUserId } }, // exclude current user
//                 { _id: { $nin: currentUser.friends } }, // exclude current user's friends  
//                 { isOnboarded: true }
//             ]
//         })
//         res.status(200).json(recommendedUsers)
//     } catch (error) {
//         console.log("Error in getRecommendedUsers controllers ", error.message);
//         res.status(500).json({ message: "Internal Server Error !!" })
//     }
// }

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = new mongoose.Types.ObjectId(req.user.id);
        const friendIds = req.user.friends.map(id => new mongoose.Types.ObjectId(id));

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: friendIds } },
                { isOnboarding: true }
            ]
        });

        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.log("Error in getRecommendedUsers controllers", error.message);
        res.status(500).json({ message: "Internal Server Error !!" });
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select("friends")
            .populate("friends", "fullName ProfilePic NativeLanguage LearningLanguage")

        res.status(200).json(user.friends);
    } catch (error) {
        console.log("Error in getRecommendedUsers controllers ", error.message);
        res.status(500).json({ message: "Internal Server Error !!" })
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;

        if (myId === recipientId) {
            return res.status(400).json({ message: "you can't send friend request to yourself.." })
        }
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" })
        }

        // check if user already friends 
        if (recipient.friends.includes(myId)) {
            return res.status(404).json({ message: "you are already friend with this user " })
        }
        // check if request already send 
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        })
        if (existingRequest) {
            return res
                .status(400)
                .json({ message: "A friend request already exist between you and this user.." })
        }
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });

        res.status(201).json(friendRequest);

    } catch (error) {
        console.log("Error in sendFriendRequest controllers ", error.message);
        res.status(500).json({ message: "Internal Server Error !!" })
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: "Friend Request not found.." })
        }

        // verify if the current user is recipient 
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this request" })
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        const user = await User.findById(req.user.id);

        // add each user to others friend array
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        });

        res.status(200).json({ message: "Friend request accepted..." })

    } catch (error) {
        console.log("Error in  acceptFriendRequest controllers ", error.message);
        res.status(500).json({ message: "Internal Server Error !!" })
    }
}

export async function getFriendsRequest(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName  ProfilePic  NativeLanguage LearningLanguage")

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted",
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({incomingReqs, acceptedReqs })

    } catch (error) {
        console.log("Error in getFriendsRequest controllers ", error.message);
        res.status(500).json({ message: "Internal Server Error !!" })
    }
}

export async function getOutgoingFriendReqs(req, res) {
    try {
        const outgoingRequest = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequest);

    } catch (error) {
        console.log("Error in  getOutgoingFriendReqs  controllers ", error.message);
        res.status(500).json({ message: "Internal Server Error !!" })
    }
}