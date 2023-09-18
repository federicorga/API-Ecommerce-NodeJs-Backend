
import mongoose from "mongoose";


const userCollection = 'users'


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    age: {
        type: String,
        required: true
    },
    password: { type: String },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",

    },
    role: {
        type: String,
        default: 'user'
    },

    last_connection: { type: String }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
