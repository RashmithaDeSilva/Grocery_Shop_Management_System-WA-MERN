import getNewResData from "../utils/responseData.mjs"


const checkAuth = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    if(!req.user) return res.status(400).send(getNewResData(false, false, 
    "[ERROR] - Unauthorized user", 401, [{ redirect: "/api/auth" }]));

    

    next();
}


export default checkAuth;