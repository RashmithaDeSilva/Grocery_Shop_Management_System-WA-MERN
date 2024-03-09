export const usernameValidetionSchema = {
    username: {
        notEmpty: { 
            errorMessage: {
                value: "USERNAME", 
                error: "User name canot empty !"
            }
        },
        isString: {
            errorMessage: {
                value: "USERNAME", 
                error: "User name is not string !"
            }
        },
        isLength: {
            options: {
                min: 3,
                max: 15
            },
            errorMessage: {
                value: "USERNAME", 
                error: "User name must be at least 3 - 15 characters !"
            }
        }
    }
};

export const passwordValidetionSchema = {
    password: {
        notEmpty: { 
            errorMessage: {
                value: "PASSWORD", 
                error: "Password canot empty !"
            }
        },
        isString: {
            errorMessage: {
                value: "PASSWORD", 
                error: "Password is not string !"
            }
        },
        isLength: {
            options: {
                min: 5
            },
            errorMessage: {
                value: "PASSWORD", 
                error: "Password must be at least 5 characters !"
            }
        }
    }
};

export const contactnuberValidetionSchema = {
    contactnuber: {
        isInt: {
            errorMessage: {
                value: "CONTACTNUMBER", 
                error: "Contactnuber is not int !"
            }
        },
        isLength: {
            options: {
                min: 10,
                max: 11
            },
            errorMessage: {
                value: "CONTACTNUMBER", 
                error: "Contactnuber ust be at least 10 - 11 numbers !"
            }
        }
    }
};

export const emailValidetionSchema = {
    email: {
        isString: {
            errorMessage: {
                value: "EMAIL", 
                error: "Email is not string !"
            }
        },
        isLength: {
            options: {
                min: 10,
                max: 50
            },
            errorMessage: {
                value: "EMAIL", 
                error: "Email must be at least 10 - 50 characters !"
            }
        }
    }
};

export const titleValidetionSchema = {
    title: {
        notEmpty: { 
            errorMessage: {
                value: "TITLE", 
                error: "Title canot empty !"
            }
        },
        isInt: {
            errorMessage: {
                value: "TITLE", 
                error: "Title is not int !"
            }
        },
        isLength: {
            options: {
                min: 0,
                max: 4
            },
            errorMessage: {
                value: "TITLE", 
                error: "Title ust be at least 0 - 4 numbers !"
            }
        }
    }
};

export const bandedValidetionSchema = {
    banded: {
        notEmpty: { 
            errorMessage: {
                value: "BANDED", 
                error: "Banded canot empty !"
            }
        },
        isBoolean: {
            errorMessage: {
                value: "BANDED", 
                error: "Banded is not boolean !"
            }
        }
    }
};

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