import { upsertStreamUser } from "../config/stream.js";
import User from "../models/authModel.js";
import jwt from "jsonwebtoken"

export async function signup(req, res) {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All Fields are required !!" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 Character !!" })
        }
        // password validation 
        const specialCharRegex = /[!@#$%^&*]/;
        if (!specialCharRegex.test(password)) {
            return res.status(400).json({ message: "Password must include at least one special character!" });
        }
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address!" });
        }
        // chack if user is unique or not 
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exist, Please use different Email !!" });
        }

        // creating user Avtar randomly here 
        const idx = Math.floor(Math.random() * 100) + 1; // genrate num b/w 1 tp 100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        });

        // creating stream user 
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            })
            console.log(`Stream User Created for ${newUser.fullName}`)
        } catch (error) {
            console.log("Error creating Stream user :", error)
        }

        // genrating token here 
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"

        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent XSS attacks
            sameSite: "strict", // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production"
        })
        res.status(201).json({ success: true, user: newUser })
    }
    catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ message: "Internal Server Error !!" })
    }
}


export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export async function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: " Logout Successfully...!!" })
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id;
        const { fullName, bio, NativeLanguage, LearningLanguage, location } = req.body;

        if (!fullName || !bio || !NativeLanguage || !LearningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required!!",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !NativeLanguage && "NativeLanguage",
                    !LearningLanguage && "LearningLanguage",
                    !location && "location"
                ],
            });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarding: true
        }, { new: true })

        if (!updatedUser) {
            return res.status(404).json({ message: "User not Found" })
        }

        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            })
            console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`)
        } catch (streamError) {
            console.log("Error updating Stream usr during onboarding :", streamError.message)
        }

        res.status(200).json({ message: true, user: updatedUser });
    } catch (error) {
        console.error("Onboarding error :", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


