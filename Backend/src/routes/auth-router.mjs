import { Router } from "express";
import passport from "passport";
import getNewResData from "../utils/responseData.mjs"


const router = Router();


// Login
router.post("/api/auth", passport.authenticate("local"), async (req, res) => {
    try {
        res.status(200).send(getNewResData(true, true, "Successfully Login", 200, []));
    } catch(e) {
        return res.status(400).send(getNewResData(false, false, "[ERROR]", 404, { errors: e }));
    }
});

// Chech auth status
router.get("/api/auth/status", (req, res) => {
    return req.user ? res.status(200).send(getNewResData(true, true, "Authorized User", 200, [req.user])) 
    : res.status(400).send(getNewResData(false, false, "[ERROR] - Unauthorized user", 401, []));
});

// Logout
router.get("/api/auth/logout", (req, res) => {
    if(!req.user) return res.status(400).send(getNewResData(false, false, "[ERROR] - Unauthorized user", 401, []));
    req.logOut((e) => {
        if(e) return res.status(400).send(getNewResData(false, false, e, 401, []));
        res.status(200).send(getNewResData(true, false, "Successfully Logout", 200, []));
    });
});


export default router;