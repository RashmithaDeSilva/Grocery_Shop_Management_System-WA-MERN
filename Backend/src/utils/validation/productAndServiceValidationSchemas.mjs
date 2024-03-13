export const productAndserviceNameValidetionSchema = {
    product_or_service_name: {
        notEmpty: { 
            errorMessage: {
                value: "PRODUCTORSERVICENAME", 
                error: "product or service name canot empty !"
            }
        },
        isString: {
            errorMessage: {
                value: "PRODUCTORSERVICENAME", 
                error: "product or service name must be string !"
            }
        },
        isLength: {
            options: {
                min: 3,
                max: 50
            },
            errorMessage: {
                value: "PRODUCTORSERVICENAME", 
                error: "product or service name must be at least 3 - 50 characters !"
            }
        }
    }
};

export const categoryValidetionSchema = {
    category: {
        notEmpty: { 
            errorMessage: {
                value: "CATEGORY", 
                error: "category canot empty !"
            }
        },
        isInt: {
            value: true,
            errorMessage: {
                value: "CATEGORY", 
                error: "category must be int !"
            }
        },
        isLength: {
            options: {
                min: 0,
                max: 1
            },
            errorMessage: {
                value: "CATEGORY", 
                error: "category ust be at least 0 - 1 numbers !"
            }
        }
    }
};

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