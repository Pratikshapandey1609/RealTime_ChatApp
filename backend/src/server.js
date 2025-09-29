import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"

// routes
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import chatRoutes from "./routes/chatRoute.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(helmet());

// cors
app.use(cors({
    origin :"http://localhost:5173",
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true // allow frontend to send cookies 
}))

// api
app.use("/api/auth" , authRoutes)
//  http://localhost:5501/api/auth/signup  // http://localhost:5501/api/auth/login 
// http://localhost:5501/api/auth/logout  //  http://localhost:5501/api/auth/onboarding

app.use("/api/users",userRoutes);
app.use("/api/chat" , chatRoutes)

const PORT = 5501 || process.env.PORT;
app.listen(PORT,() => {
   console.log(`Server is Running on port :  ${PORT}`);
   connectDB();
})