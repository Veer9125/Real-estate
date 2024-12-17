import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default: "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_640.png",
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;