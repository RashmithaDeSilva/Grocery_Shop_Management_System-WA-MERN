import { Router } from "express";
import getNewResData from "../utils/responseData.mjs";
import checkAuth from "../utils/middlewares.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { ProductOrService } from "../mongoose/schemas/productOrService.mjs";
import { productAndServiceValidations } from "../utils/validation/validationSchema.mjs";



const router = Router();


async function getProductAndServic(limit) {
    return await ProductOrService.find().limit(limit);
}

async function getProductAndServicByFilter(limit, filter, value) {
    const mongoQuery = {};

    mongoQuery[filter] = (filter === "category" && value === "products") ? 0 
    : (filter === "category" && value === "services") ? 1 : value;

    return await ProductOrService.find({ ...mongoQuery }).limit(limit);
}


router.get("/api/auth/productandservices",
[
    checkAuth,
    checkSchema(productAndServiceValidations.filterValidetionSchema), 
    checkSchema(productAndServiceValidations.valueValidetionSchema),
    checkSchema(productAndServiceValidations.limitValidetionSchema)
], 
async (req, res) => {
    try {

        const result = validationResult(req);
        const data = matchedData(req);
        const { query: { filter, value, limit }} = req;

        if(filter !== undefined && filter !== null && result.errors.filter((e) => e.msg.value === "FILTER").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));
        
        if(value !== undefined && value !== null && result.errors.filter((e) => e.msg.value === "VALUE").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(limit === undefined && result.errors.filter((e) => e.msg.value === "LIMITE").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));
 
        let newLimit = (limit === "0") ? 10 : limit;

        if(Object.keys(data).length === 1) {
            const productAndService = await getProductAndServic(newLimit);
            return res.status(200).send(getNewResData(true, true, "Successful request", 200, productAndService));

        } else if(Object.keys(data).length === 3) {
            const productAndService = await getProductAndServicByFilter(newLimit, filter, value);
            return res.status(200).send(getNewResData(true, true, "Successful request", 200, productAndService));
        }
        
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));
    
    } catch(e) {
        return res.status(400).send(getNewResData(false, true, "[ERROR]", 404, { errors: e }));
    }
})


export default router;