import { Router } from "express";
import getNewResData from "../utils/responseData.mjs";
import authRouter from "./auth-router.mjs";
import userRouter from "./user-router.mjs";
import productAndServiceRouter from "./productAndService-router.mjs";
import stockRouter from "./stock-router.mjs";


const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(productAndServiceRouter);
router.use(stockRouter);


router.get("/", (req, res) => {
    return res.status(200).send(getNewResData(true, false, 
        `Grocery Shop Management System WA [MERN] - ${ process.env.SHOP_NAME }`, 200, []));
});

router.get("/api", (req, res) => {
    return res.redirect("/");
});

router.all("*", (req, res) => {
    return res.status(404).send(getNewResData(false, false, "Page Not Found !", 404, [{ redirect: "/api/auth" }]));
});


export default router;