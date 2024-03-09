import { Router } from "express";
import { query, validationResult, matchedData, checkSchema } from "express-validator"
import { userValidations } from "../utils/validation/validationSchema.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/hash.mjs";


const router = Router();


router.get("/api/auth/usermanagement", async (req, res) => {
    try {
        
        return res.status(201).send({ msg: "Successfully added user", userWithoutPassword });
    
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

        if(req.body.email !== undefined &&result.errors.filter((e) => e.msg.value === "EMAIL").length !== 0)
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