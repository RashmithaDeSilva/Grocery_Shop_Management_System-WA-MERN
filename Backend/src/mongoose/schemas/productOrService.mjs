import mongoose from "mongoose";


const ProductOrServiceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product_or_service_name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    stop_selling: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    set_or_reset_date: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    set_or_reset_time: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});


export const ProductOrService = mongoose.model("ProductOrService", ProductOrServiceSchema);
