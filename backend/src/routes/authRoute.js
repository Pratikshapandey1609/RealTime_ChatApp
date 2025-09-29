import express, { Router } from "express"
import { login, logout, onboard, signup } from "../controllers/authController.js"
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/signup",signup);
router.post("/login", login);
router.post("/logout", logout); // post is which change the server states 

router.post("/onboarding", protectRoute ,onboard);

// checks if user is logged in or not 
router.get("/me", protectRoute, (req,res)=>{
    res.status(200).json({success : true, user:req.user});
});


export default router;
