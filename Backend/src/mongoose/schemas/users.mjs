import mongoose from "mongoose";
import uuid from "uuid";


const UsreSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.String,
        default: () => "U_" + uuid.v4(),
        required: true,
        unique: true,
    },
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    title: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    banded: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
    }
});