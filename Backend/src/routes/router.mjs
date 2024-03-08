import { Router } from "express";


const router = Router();


router.get("/", (req, res) => {
    res.status(200).send("Grocery Shop Management System WA [MERN]");
});

router.get("/api", (req, res) => {
    res.redirect("/");
});


export default router;