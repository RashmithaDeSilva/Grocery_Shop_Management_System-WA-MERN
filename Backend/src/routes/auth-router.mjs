import { Router } from "express";
import passport from "passport";


const router = Router();


router.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.sendStatus(200);
});


export default router;