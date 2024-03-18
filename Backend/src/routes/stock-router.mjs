import { Router } from "express";
import getNewResData from "../utils/responseData.mjs";
import checkAuth from "../utils/middlewares.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { stockValidations } from "../utils/validation/validationSchema.mjs";
import { Stock } from "../mongoose/schemas/stock.mjs";


const router = Router();
const currentDate = new Date();


async function getStocks(limit) {
    return await Stock.find().limit(limit);
}

async function getStocksByFilter(limit, filter, value) {
    const mongoQuery = {};

    switch(filter) {
        case "itemId":
            mongoQuery["product_or_service_id"] = value;
            break;
        
        case "qty":
            break;
        
        case "refillQty":
            break;

        case "price":
            break;

        case "qty":
            break;
    }

    if(filter === "quantity" || filter === "refillQuantity" || filter === "refillQuantity")

    mongoQuery[filter] = (filter === "category" && value === "products") ? 0 
    : (filter === "category" && value === "services") ? 1 : value;

    return await ProductOrService.find({ ...mongoQuery }).limit(limit);
}

function getDate() {
    // Format date as DD-MM-YYYY
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    return formattedDate;
}

function getTime() {
    // Format time as HH-MM (24-hour clock)
    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    return formattedTime;
}


// Super admin and Admin only
router.get("/api/auth/stock",
[
    checkAuth,
    checkSchema(stockValidations.filterValidetionSchema), 
    checkSchema(stockValidations.valueValidetionSchema),
    checkSchema(stockValidations.limitValidetionSchema)
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
            const stocks = await getStocks(newLimit);
            return res.status(200).send(getNewResData(true, true, "Successful request", 200, stocks));

        } else if(Object.keys(data).length === 3) {
            const productAndService = await getStocksByFilter(newLimit, filter, value);
            return res.status(200).send(getNewResData(true, true, "Successful request", 200, productAndService));
        }
        
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        return res.status(200).send("Stock !");
    
    } catch(e) {
        return res.status(400).send(getNewResData(false, true, "[ERROR]", 404, { errors: e }));
    }
})

// // Super admin and Admin only
// router.post("/api/auth/productandservices/newproductorservice", 
// [
//     checkAuth,
//     checkSchema(productAndServiceValidations.productAndserviceNameValidetionSchema),
//     checkSchema(productAndServiceValidations.categoryValidetionSchema),
//     checkSchema(productAndServiceValidations.stopSellingValidetionSchema)
// ], 
// async (req, res) => {
//     try {
//         const result = validationResult(req);
//         const data = matchedData(req);

//         if(result.errors.filter((e) => e.msg.value === "PRODUCTORSERVICENAME").length !== 0)
//         return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

//         if(result.errors.filter((e) => e.msg.value === "CATEGORY").length !== 0)
//         return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

//         if(result.errors.filter((e) => e.msg.value === "STOPSELLING").length !== 0)
//         return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

//         if(parseInt(data.category) < 0 || parseInt(data.category) > 1)
//         return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: "Category must be at least 0 - 1 numbers !"}));
        
//         data["user_id"] = req.user._id;
//         data["set_or_reset_date"] = getDate();
//         data["set_or_reset_time"] = getTime();
//         const newProductOrService = new ProductOrService(data);
//         const saveProductOrService = await newProductOrService.save();
//         return res.status(201).send(getNewResData(true, true, `Successfully added ${data.category === 0 ? "product" : "service"}`, 201, { item: saveProductOrService }));
    
//     } catch(e) {
//         console.log(e);
//         return res.status(400).send(getNewResData(false, true, "[ERROR]", 404, { errors: e }));
//     }
// });

// // Super admin and Admin only
// router.patch("/api/auth/productandservices/updateproductorservice", 
// [
//     checkAuth,
//     checkSchema(productAndServiceValidations.productAndserviceNameValidetionSchema),
//     checkSchema(productAndServiceValidations.categoryValidetionSchema),
//     checkSchema(productAndServiceValidations.stopSellingValidetionSchema)
// ], 
// async (req, res) => {
//     try {
//         const result = validationResult(req);
//         const data = matchedData(req);

//         if(req.body._id === undefined)
//         return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: "ID must required !"}));

//         if(data.product_or_service_name !== undefined && result.errors.filter((e) => e.msg.value === "PRODUCTORSERVICENAME").length !== 0)
//         return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

//         if(data.category !== undefined && result.errors.filter((e) => e.msg.value === "CATEGORY").length !== 0)
//         return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

//         if(data.stop_selling !== undefined && result.errors.filter((e) => e.msg.value === "STOPSELLING").length !== 0)
//         return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

//         if(data.category !== undefined && parseInt(data.category) < 0 || parseInt(data.category) > 1)
//         return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: "Category must be at least 0 - 1 numbers !"}));

//         data["user_id"] = req.user._id;
//         data["set_or_reset_date"] = getDate();
//         data["set_or_reset_time"] = getTime();
//         await ProductOrService.findByIdAndUpdate(req.body._id, data);
//         const updateProductOrService = await ProductOrService.findById(req.body._id);
//         return res.status(204).send(getNewResData(true, true, `Successfully added ${data.category === 0 ? "product" : "service"}`, 204, { item: updateProductOrService }));
    
//     } catch(e) {
//         return res.status(400).send(getNewResData(false, true, "[ERROR]", 404, { errors: e }));
//     }
// });


export default router;