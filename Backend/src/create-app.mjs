import express from "express";
import fs from 'fs';


export function createApp() {
    const jsonData = fs.readFileSync('env-veb.json', 'utf-8');
    const ENV_VEB = JSON.parse(jsonData);

    const app = express();


    return app;
}
