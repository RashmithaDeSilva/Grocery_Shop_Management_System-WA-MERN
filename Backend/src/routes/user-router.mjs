import { Router } from "express";
import { validationResult, matchedData, checkSchema } from "express-validator"
import { userValidations } from "../utils/validation/validationSchema.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/security/hash.mjs";
import getNewResData from "../utils/responseData.mjs"
import checkAuth from "../utils/middlewares.mjs";


const router = Router();


async function getUsers(userRoll, limit) {
    switch(userRoll) {
        case 0:
            return await User.find({ title: { $ne: '0' } }, 'username title').limit(limit);

        case 1:
            return await User.find({ title: { $ne: '0' } }).select('-password').limit(limit);

        case 2:
            return await User.find({ title: { $nin: ['0', '1', '2'] } }).select('-password').limit(limit);

        default:
            return [];
    }
    
}

async function getUsersByFilter(userRoll, limit, filter, value) {
    const mongoQuery = {};

    if (filter === "contactnumber") {
        mongoQuery[filter] = value;
    } else {
        mongoQuery[filter] = { $regex: value, $options: 'i' };
    }

    switch (userRoll) {
        case 0:
            return await User.find({ title: { $ne: '0' }, ...mongoQuery }).select('username title').limit(limit);

        case 1:
            return await User.find({ title: { $ne: '0' }, ...mongoQuery }).select('-password').limit(limit);

        case 2:
            mongoQuery.title = { $nin: ["0", "1", "2"] };
            return await User.find(mongoQuery).select('-password').limit(limit);

        default:
            return [];
    }
}



// Only use super admin
router.get("/api/auth/users", 
[ 
    checkAuth,
    checkSchema(userValidations.filterValidetionSchema), 
    checkSchema(userValidations.valueValidetionSchema),
    checkSchema(userValidations.limitValidetionSchema)
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
            const users = await getUsers(req.user.title, newLimit);
            return res.status(200).send(getNewResData(true, true, "Successful request", 200, users));

        } else if(Object.keys(data).length === 3) {
            const users = await getUsersByFilter(req.user.title, newLimit, filter, value);
            return res.status(200).send(getNewResData(true, true, "Successful request", 200, users));
        }
        
        
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));
    
    } catch(e) {
        return res.status(400).send(getNewResData(false, true, "[ERROR]", 404, { errors: e }));
    }

});

// 
router.get("/api/auth/users/:username", 
[
    checkAuth,
    checkSchema(userValidations.usernameValidetionSchema)
],
async (req, res) => {

    try {

        const result = validationResult(req);
        const data = matchedData(req);

        if(result.errors.filter((e) => e.msg.value === "USERNAME").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(data.username === undefined || data.username === null) return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        const user = await User.findOne({ username: data.username }).select('-password');
        if(user !== null) return res.status(200).send(getNewResData(true, true, "Successful request", 200, { user: user }));

        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));
    
    } catch(e) {
        return res.status(400).send(getNewResData(false, true, "[ERROR]", 404, { errors: e }));
    }

});

// Only use super admin
router.post("/api/auth/users/newuser", 
[
    checkAuth,
    checkSchema(userValidations.usernameValidetionSchema),
    checkSchema(userValidations.passwordValidetionSchema),
    checkSchema(userValidations.titleValidetionSchema),
    checkSchema(userValidations.bandedValidetionSchema),
    checkSchema(userValidations.contactnuberValidetionSchema),
    checkSchema(userValidations.emailValidetionSchema)
], 
async (req, res) => {

    try {
        const result = validationResult(req);
        const data = matchedData(req);

        if(result.errors.filter((e) => e.msg.value === "USERNAME").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(result.errors.filter((e) => e.msg.value === "PASSWORD").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(result.errors.filter((e) => e.msg.value === "TITLE").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(data.title < 0 || data.title > 3)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: "Title ust be at least 0 - 3 numbers !"}));

        if(result.errors.filter((e) => e.msg.value === "BANDED").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(req.body.contactnuber !== undefined && result.errors.filter((e) => e.msg.value === "CONTACTNUMBER").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(req.body.email !== undefined && result.errors.filter((e) => e.msg.value === "EMAIL").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(req.user.title === 1 && data.title >= 2 && data.title <= 3) 
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, {msg: "You can add only title type are 2(admin) and 3(user)"}));

        if(req.user.title === 2 && data.title !== 3) 
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, {msg: "You can add only title type is 3(user)"}));
        
        data.password = hashPassword(data.password);
        const newUser = new User(data);
        const saveUser = await newUser.save();
        const userWithoutPassword = { ...saveUser._doc };
        delete userWithoutPassword.password;
        return res.status(201).send(getNewResData(true, true, "Successfully added user", 201, { user: userWithoutPassword }));
    
    } catch(e) {
        return res.status(400).send(getNewResData(false, true, "[ERROR]", 404, { errors: e }));
    }

});

// Only use super admin
router.patch("/api/auth/users/updateuser", 
[
    checkAuth,
    checkSchema(userValidations.usernameValidetionSchema),
    checkSchema(userValidations.passwordValidetionSchema),
    checkSchema(userValidations.titleValidetionSchema),
    checkSchema(userValidations.bandedValidetionSchema),
    checkSchema(userValidations.contactnuberValidetionSchema),
    checkSchema(userValidations.emailValidetionSchema)
], 
async (req, res) => {

    try {
        const result = validationResult(req);
        const data = matchedData(req);

        if(result.errors.filter((e) => e.msg.value === "USERNAME").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(req.body.password !== undefined && result.errors.filter((e) => e.msg.value === "PASSWORD").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(result.errors.filter((e) => e.msg.value === "TITLE").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(data.title < 0 || data.title > 3)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: "Title ust be at least 0 - 3 numbers !"}));

        if(result.errors.filter((e) => e.msg.value === "BANDED").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(req.body.contactnuber !== undefined && result.errors.filter((e) => e.msg.value === "CONTACTNUMBER").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(req.body.email !== undefined && result.errors.filter((e) => e.msg.value === "EMAIL").length !== 0)
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, { errors: result.errors.map((e) => e.msg.error) }));

        if(req.user.title === 1 && data.title >= 2 && data.title <= 3) 
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, {msg: "You can add only title type are 2(admin) and 3(user)"}));

        if(req.user.title === 2 && data.title !== 3) 
        return res.status(404).send(getNewResData(false, true, "Invalid quarts !", 404, {msg: "You can add only title type is 3(user)"}));

        if(data.password !== undefined) data.password = hashPassword(data.password);
        await User.findByIdAndUpdate(req.body._id, data);
        const updateUser = await User.find({ _id: req.body._id }).select('-password').limit(1);
        return res.status(204).send(getNewResData(true, true, "Successfully update user", 204, { user: updateUser[0] }));
    
    } catch(e) {
        return res.status(400).send(getNewResData(false, true, "[ERROR]", 404, { errors: e }));
    }

});


export default router;