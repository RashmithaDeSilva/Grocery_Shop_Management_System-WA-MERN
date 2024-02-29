import express from "express";
import mongoose from "mongoose";


const app = express();
const PORT = process.env.PORT || 7000;
mongoose.connect('mongodb://192.168.8.139:27017/upeksha_communication')
    .then(() => console.log('[INFO] - Connected to Database'))
    .catch(e => console.log(`[ERROR] - ${ e } !`));


app.listen(PORT, () => {
    console.log(`[INFO] - Runing on Port ${ PORT }`);
});