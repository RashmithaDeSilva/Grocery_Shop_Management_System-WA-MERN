import { Router } from "express";
import authRouter from "./auth-router.mjs";
import userRouter from "./user-router.mjs";


const router = Router();
// router.use(authRouter);
router.use(userRouter);


router.get("/", (req, res) => {
    return res.status(200).send("Grocery Shop Management System WA [MERN]");
});

router.get("/api", (req, res) => {
    return res.redirect("/");
});


export default router;