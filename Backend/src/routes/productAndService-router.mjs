import { Router } from "express";
import passport from "passport";
import getNewResData from "../utils/responseData.mjs"
import checkAuth from "../utils/middlewares.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator"


const router = Router();





export default router;