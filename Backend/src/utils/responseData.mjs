// Set respons data
const getNewResData = (status, auth, msg, code, res) => {
    const newResData = {
        status: status,
        auth: auth,
        msg: msg,
        code: code,
        res: res
    };

    return newResData;
}

export default getNewResData;