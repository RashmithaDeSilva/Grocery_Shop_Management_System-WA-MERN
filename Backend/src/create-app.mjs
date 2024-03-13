import express from "express";
import session from "express-session";
import passport from "passport";
import router from "./routes/router.mjs";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./strategies/local-stratagy.mjs";


export function createApp() {
    const app = express();
    app.use(express.json());
    app.use(session({
        secret: `${ process.env.SESION_SECRET }`,
        saveUninitialized: false,
        resave: true,
        maxAge: parseInt(process.env.SESION_TIME),
        cookie: {
            maxAge: parseInt(process.env.COOKIE_TIME),
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
