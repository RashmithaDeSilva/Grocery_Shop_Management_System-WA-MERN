import dotenv from 'dotenv';
import mongoose from "mongoose";
import { createApp } from './create-app.mjs';


dotenv.config();

mongoose.connect(`mongodb://${ process.env.DB_IP }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`)
    .then(() => console.log('[INFO] - Connected to Database'))
    .catch(e => console.log(`[ERROR] - ${ e } !`))
;

const app = createApp();
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`[INFO] - Runing on Port ${ PORT }`);
});