export const filterValidetionSchema = {
    filter: {
        isString: {
            errorMessage: {
                value: "FILTER", 
                error: "Filter is not string !"
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
                error: "Limit is not int !"
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