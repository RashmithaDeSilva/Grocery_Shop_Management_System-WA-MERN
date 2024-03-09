import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    // id: {
    //     type: mongoose.Schema.Types.String,
    //     default: () => "U_" + new mongoose.Types.ObjectId().toString(),
    //     required: true,
    //     unique: true
    // },
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    title: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    banded: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    contactnuber: {
        type: mongoose.Schema.Types.Number
    },
    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    }
});


export const User = mongoose.model("User", UserSchema);