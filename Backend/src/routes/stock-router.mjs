import { Router } from "express";
import getNewResData from "../utils/responseData.mjs";
import checkAuth from "../utils/middlewares.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { stockValidations } from "../utils/validation/validationSchema.mjs";
import { Stock } from "../mongoose/schemas/stock.mjs";
import { ProductOrService } from "../mongoose/schemas/productOrService.mjs";


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
            mongoQuery["quantity"] = value;
            break;
        
        case "refQty":
            mongoQuery["refill_quantity"] = value;
            break;

        case "price":
            mongoQuery["price"] = value;
            break;

        case "sellPrice":
            mongoQuery["selling_price"] = value;
            break;

        case "stopSell":
            mongoQuery["stop_selling"] = value;
            break;

        case "stopSell":
            mongoQuery["stop_selling"] = value;
            break;

        case "date":
            mongoQuery["set_or_reset_date"] = value;
            break;

        case "time":
            mongoQuery["set_or_reset_time"] = value;
            break;
    }

    return await Stock.find({ ...mongoQuery }).limit(limit);
}

async function getStocksByValue(limit, searchRegex) {
    return await Stock.find({
        $or: [
            { user_id: searchRegex },
            { product_or_service_id: searchRegex },
            { quantity: searchRegex },
            { refill_quantity: searchRegex },
            { price: searchRegex },
            { selling_price: searchRegex },
            { stop_selling: searchRegex },
            { set_or_reset_date: searchRegex },
            { set_or_reset_time: searchRegex },
        ]
    })
    .populate('user_id')
    .populate('product_or_service_id')
    .limit(limit);
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
    checkSchema(stockValidations.filterValidationSchema), 
    checkSchema(stockValidations.valueValidationSchema),
    checkSchema(stockValidations.limitValidationSchema)
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
        let searchRegex = new RegExp(value, 'i'); // 'i' for case-insensitive

        if(Object.keys(data).length === 1) {
            const stocks = await getStocks(newLimit);
            return res.status(200).send(getNewResData(true, true, "Successful request", 200, stocks));

        } else if(Object.keys(data).length === 2) {
            const productAndService = await getStocksByValue(newLimit, searchRegex);
            return res.status(200).send(getNewResData(true, true, "Successful request", 200, productAndService));

        } else if (Object.keys(data).length === 3) {
            const productAndService = await getStocksByFilter(newLimit, filter, searchRegex);
            return res.status(200).send(getNewResData(true, true, "Successful request", 200, productAndService));
        }
        
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));
    
    } catch(e) {
        return res.status(400).send(getNewResData(false, true, "[ERROR]", 404, { errors: e }));
    }
})

// // Super admin and Admin only
router.post("/api/auth/stock/newstock", 
[
    checkAuth,
    checkSchema(stockValidations.productAndserviceNameValidetionSchema),
    checkSchema(stockValidations.quantityValidationSchema), 
    checkSchema(stockValidations.refillQuantityValidationSchema),
    checkSchema(stockValidations.priceValidationSchema),
    checkSchema(stockValidations.sellingPriceValidationSchema),
    checkSchema(stockValidations.stopSellingValidationSchema)
], 
async (req, res) => {
    try {
        const result = validationResult(req);
        const data = matchedData(req);

        if(result.errors.filter((e) => e.msg.value === "PRODUCTORSERVICENAME").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(result.errors.filter((e) => e.msg.value === "QUANTITY").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(result.errors.filter((e) => e.msg.value === "REFILLQUANTITY").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(result.errors.filter((e) => e.msg.value === "PRICE").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(result.errors.filter((e) => e.msg.value === "SELLINGPRICE").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(result.errors.filter((e) => e.msg.value === "STOPSELLING").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        let productOrService_id = await ProductOrService.find({ product_or_service_name: data.product_or_service_name }).limit(1).select('_id');
        productOrService_id = productOrService_id.length > 0 ? productOrService_id[0]._id : null;
        if(productOrService_id === null)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: ["Invalide product_or_service_name"]}));
        
        data["user_id"] = req.user._id;
        data["product_or_service_id"] = productOrService_id;
        data["set_or_reset_date"] = getDate();
        data["set_or_reset_time"] = getTime();
        const newStock = new Stock(data);
        const saveStock = await newStock.save();
        return res.status(201).send(getNewResData(true, true, "Successfully added Stock", 201, { item: saveStock }));
    
    } catch(e) {
        console.log(e);
        return res.status(400).send(getNewResData(false, true, "[ERROR]", 404, { errors: e }));
    }
});

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