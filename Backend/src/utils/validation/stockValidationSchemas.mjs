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
        }
    }
};

export const quantityValidationSchema = {
    quantity: {
        isInt: {
            errorMessage: {
                value: "QUANTITY", 
                error: "Quantity must be int !"
            }
        },
        notEmpty: { 
            errorMessage: {
                value: "QUANTITY", 
                error: "Quantity canot empty !"
            }
        }
    }
};

export const refillQuantityValidationSchema = {
    refill_quantity: {
        isInt: {
            errorMessage: {
                value: "REFILLQUANTITY", 
                error: "REFILL Quantity must be int !"
            }
        },
        notEmpty: { 
            errorMessage: {
                value: "REFILLQUANTITY", 
                error: "REFILL Quantity canot empty !"
            }
        }
    }
};

export const priceValidationSchema = {
    price: {
        isFloat: {
            errorMessage: {
                value: "PRICE", 
                error: "Price must be a float !"
            }
        },
        notEmpty: { 
            errorMessage: {
                value: "PRICE", 
                error: "Price cannot be empty !"
            }
        }
    }
};

export const sellingPriceValidationSchema = {
    selling_price: {
        isFloat: {
            errorMessage: {
                value: "SELLINGPRICE", 
                error: "Selling Price must be float !"
            }
        },
        notEmpty: { 
            errorMessage: {
                value: "SELLINGPRICE", 
                error: "Selling Price canot empty !"
            }
        }
    }
};

export const stopSellingValidationSchema = {
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

export const filterValidationSchema = {
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

export const valueValidationSchema = {
    value: {
        notEmpty: { 
            errorMessage: {
                value: "VALUE", 
                error: "Value canot empty !"
            }
        }
    }
}

export const limitValidationSchema = {
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