import getNewResData from "../utils/responseData.mjs";
import fs from "fs/promises";


let userRollAccess = null;
const filePath = "user-rolls.json"; // Ensure correct path resolution

// Function to read and parse JSON file
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);

  } catch (error) {
    console.error('[ERROR] - Error reading user-rolls JSON file: ', error);
    throw error;
  }
}

// Main function
async function loadPermission() {
  try {
    // Read the JSON file
    const permissions = await readJsonFile(filePath);

    // Access the DEVELOPER array
    userRollAccess = permissions;

    // Use the array as needed
    console.log("[INFO] - Permissions loaded");
    
  } catch (error) {
    console.error('[Error] - ', error);
    throw error; // Ensure the error is propagated to the caller
  }
}

const checkAuth = async (req, res, next) => {
//   console.log(`${req.method} - ${req.url}`);
  if (!req.user) {
    return res.status(401).send(getNewResData(false, false, "[ERROR] - Unauthorized user", 401, [{ redirect: "/api/auth" }]));
  }

  if (userRollAccess === null) {
    await loadPermission(); // Wait for the permissions to be loaded
  }

  let valide = false;
  const splitLength = req.url.split("/").length;

  valide = false;

  switch(req.user.title) {
    case 0: // Developer ---------------------------------------------------------------------------------
        if(req.url.split("/")[splitLength - 1] !== req.user.username && !req.url.includes("?")) {
            valide = false
            break;
        };

        for(let i=1; i<userRollAccess.ADMIN.length; i++) {
            if(req.url.includes(userRollAccess.ADMIN[i])) valide = true;
        };

        break;

    case 1: // Super Admin -------------------------------------------------------------------------------
        if(req.url.split("/")[splitLength - 1] !== req.user.username && !req.url.includes("?")) {
            valide = false
            break;
        };

        for(let i=1; i<userRollAccess.ADMIN.length; i++) {
            if(req.url.includes(userRollAccess.ADMIN[i])) valide = true;
        };

        break;

    case 2: // Admin -------------------------------------------------------------------------------------
        if(req.url.split("/")[splitLength - 1] !== req.user.username && !req.url.includes("?")) {
            valide = false
            break;
        };

        for(let i=1; i<userRollAccess.ADMIN.length; i++) {
            if(req.url.includes(userRollAccess.ADMIN[i])) valide = true;
        };

        break;

    case 3: // User --------------------------------------------------------------------------------------
        if(req.url.split("/")[splitLength - 1] === req.user.username) {
            valide = true
            break;
        };

        for(let i=1; i<userRollAccess.USER.length; i++) {
            if(req.url.includes(userRollAccess.USER[i])) valide = true;
        }

        break;

    default:
        return res.status(401).send(getNewResData(false, true, "[ERROR] - Unauthorized user roll", 401, [{ redirect: "/api/auth" }]));
  }

  if(!valide) return res.status(401).send(getNewResData(false, true, "[ERROR] - Unauthorized user roll", 401, [{ redirect: "/api/auth" }]));

  next();
};


export default checkAuth;
