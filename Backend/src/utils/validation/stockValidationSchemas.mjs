export const stopSellingValidetionSchema = {
    stop_selling: {
        notEmpty: { 
            errorMessage: {
                value: "STOPSELLING", 
                error: "Stop selling canot empty !"
            }
        },
        isBoolean: {
            errorMessage: {
                value: "STOPSELLING", 
                error: "Stop selling must be boolean value !"
            }
        }
    }
};

export const filterValidetionSchema = {
    filter: {
        isString: {
            errorMessage: {
                value: "FILTER", 
                error: "Filter must be string !"
            }
        },
        notEmpty: { 
            errorMessage: {
                value: "FILTER", 
                error: "Filter canot empty !"
            }
        }
    }
}

export const valueValidetionSchema = {
    value: {
        notEmpty: { 
            errorMessage: {
                value: "VALUE", 
                error: "Value canot empty !"
            }
        }
    }
}

export const limitValidetionSchema = {
    limit: {
        isInt: {
            errorMessage: {
                value: "LIMITE", 
                error: "Limit must be int !"
            }
        },
        notEmpty: { 
            errorMessage: {
                value: "LIMITE", 
                error: "Limit canot empty !"
            }
        }
    }
}