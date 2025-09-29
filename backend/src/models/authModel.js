import mongoose from "mongoose";
import argon2 from "argon2";


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: "",
    },
    nativeLanguage: {
        type: String,
        default: "",
    },
    learningLanguage: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    isOnboarding: {
        type: Boolean,
        default: false
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

}, { timestamps: true });


// preHook  hashing password here  using Argon2 here 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await argon2.hash(this.password); // Argon2 auto-generates salt
        console.log(password)
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordCorrect = await argon2.verify(this.password, enteredPassword);
    return isPasswordCorrect;
}

const User = mongoose.model('User', userSchema);

export default User;

