import mongoose from "mongoose";


const ServiceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    service_name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    set_or_reset_date: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    set_or_reset_time: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    stop_selling: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    }
});

// Pre-save middleware to update date and time fields
ServiceSchema.pre('save', function(next) {
    const currentDate = new Date();

    // Format date as DD-MM-YYYY
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

    // Format time as HH-MM (24-hour clock)
    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}-${currentDate.getMinutes().toString().padStart(2, '0')}`;

    // Update fields
    this.set_or_reset_date = formattedDate;
    this.set_or_reset_time = formattedTime;

    next();
});


export const Service = mongoose.model('Product', ServiceSchema);
