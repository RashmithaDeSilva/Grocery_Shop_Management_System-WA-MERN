import { Router } from "express";
import { query, validationResult, matchedData, checkSchema } from "express-validator"
import { userValidations } from "../utils/validation/validationSchema.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/hash.mjs";


const router = Router();


router.get("/api/auth/usermanagement", 
[ 
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
        return res.status(404).send(result.errors.map((e) => e.msg.error));

        if(value !== undefined && value !== null && result.errors.filter((e) => e.msg.value === "VALUE").length !== 0)
        return res.status(404).send(result.errors.map((e) => e.msg.error));

        if(limit === undefined && result.errors.filter((e) => e.msg.value === "LIMITE").length !== 0)
        return res.status(404).send(result.errors.map((e) => e.msg.error));
 
        let newLimit = (limit === "0") ? 10 : limit;

        if(Object.keys(data).length === 1) {
            const users = await User.find().limit(newLimit);
            return res.status(200).send(users);

        } else if(Object.keys(data).length === 3) {
            const mongoQuery = {};

            if(filter === "title" || filter === "contactnumber") {
                mongoQuery[filter] = value;
            } else{
                mongoQuery[filter] = { $regex: value, $options: 'i' };
            }
            
            const users = await User.find(mongoQuery).limit(newLimit);
            return res.status(200).send(users);
        }
        
        
        return res.status(404).send({ msg: "Invalid quarts !"});
    
    } catch(e) {
        return res.status(400).send(e);
    }

});

router.post("/api/auth/usermanagement/newuser", 
[
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
        return res.status(404).send(result.errors.map((e) => e.msg.error));

        if(result.errors.filter((e) => e.msg.value === "PASSWORD").length !== 0)
        return res.status(404).send(result.errors.map((e) => e.msg.error));

        if(result.errors.filter((e) => e.msg.value === "TITLE").length !== 0)
        return res.status(404).send(result.errors.map((e) => e.msg.error));

        if(result.errors.filter((e) => e.msg.value === "BANDED").length !== 0)
        return res.status(404).send(result.errors.map((e) => e.msg.error));

        if(data.contactnuber && result.errors.filter((e) => e.msg.value === "CONTACTNUMBER").length !== 0)
        return res.status(404).send(result.errors.map((e) => e.msg.error));

        if(req.body.email !== undefined && result.errors.filter((e) => e.msg.value === "EMAIL").length !== 0)
        return res.status(404).send(result.errors.map((e) => e.msg.error));

            
        data.password = hashPassword(data.password);
        const newUser = new User(data);
        const saveUser = await newUser.save();
        const userWithoutPassword = { ...saveUser._doc };
        delete userWithoutPassword.password;
        return res.status(201).send({ msg: "Successfully added user", userWithoutPassword });
    
    } catch(e) {
        return res.status(400).send(e);
    }

});


export default router;