import fs from 'fs'
import mongoose from "mongoose";
import { createApp } from './create-app.mjs';


const jsonData = fs.readFileSync('env-veb.json', 'utf-8');
const ENV_VEB = JSON.parse(jsonData);

const app = createApp();
const PORT = ENV_VEB.port;

mongoose.connect(`mongodb/${ ENV_VEB.db.ip }/${ ENV_VEB.db.port }/${ ENV_VEB.db.name }`)
    .then(() => console.log('[INFO] - Connected to Database'))
    .catch(e => console.log(`[ERROR] - ${ e } !`))
;

app.listen(PORT, () => {
    console.log(`[INFO] - Runing on Port ${ PORT }`);
});