import mongoose from "mongoose";


const StockSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product_or_service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductOrService"
    },
    quantity: {
        type: mongoose.Schema.Types.Number
    },
    refill_quantity: {
        type: mongoose.Schema.Types.Number
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    selling_price: {
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


export const Stock = mongoose.model("Stocke", StockSchema);
