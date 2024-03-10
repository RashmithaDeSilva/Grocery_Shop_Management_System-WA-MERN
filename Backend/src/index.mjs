import fs from 'fs';
import mongoose from "mongoose";
import { createApp } from './create-app.mjs';


const jsonData = fs.readFileSync('env-veb.json', 'utf-8');
const ENV_VEB = JSON.parse(jsonData);

mongoose.connect(`mongodb://${ ENV_VEB.DB.IP }:${ ENV_VEB.DB.PORT }/${ ENV_VEB.DB.NAME }`)
    .then(() => console.log('[INFO] - Connected to Database'))
    .catch(e => console.log(`[ERROR] - ${ e } !`))
;

const app = createApp();
const PORT = process.env.PORT || ENV_VEB.PORT;

app.listen(PORT, () => {
    console.log(`[INFO] - Runing on Port ${ PORT }`);
});