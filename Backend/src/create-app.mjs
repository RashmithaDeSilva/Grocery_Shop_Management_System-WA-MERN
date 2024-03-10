import express from "express";
import fs from "fs";
import session from "express-session";
import passport from "passport";
import router from "./routes/router.mjs";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./strategies/local-stratagy.mjs"


export function createApp() {
    const jsonData = fs.readFileSync('./env-veb.json', 'utf-8');
    const ENV_VEB = JSON.parse(jsonData);

    const app = express();
    app.use(express.json());
    app.use(session({
        secret: ENV_VEB.SESION_SECRET,
        saveUninitialized: false,
        resave: true,
        cookie: {
            maxAge: ENV_VEB.COOKIE_TIME,
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(router);

    return app;
}
