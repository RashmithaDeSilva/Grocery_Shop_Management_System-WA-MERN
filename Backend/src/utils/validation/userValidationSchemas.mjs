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
                error: "User name must be string !"
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
                error: "Password must be string !"
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
    },
    old_password: {
        notEmpty: { 
            errorMessage: {
                value: "OLDPASSWORD", 
                error: "Old password canot empty !"
            }
        },
        isString: {
            errorMessage: {
                value: "OLDPASSWORD", 
                error: "Old password must be string !"
            }
        },
        isLength: {
            options: {
                min: 5
            },
            errorMessage: {
                value: "OLDPASSWORD", 
                error: "Old password must be at least 5 characters !"
            }
        }
    },
    new_password: {
        notEmpty: { 
            errorMessage: {
                value: "NEWPASSWORD", 
                error: "New password canot empty !"
            }
        },
        isString: {
            errorMessage: {
                value: "NEWPASSWORD", 
                error: "New password must be string !"
            }
        },
        isLength: {
            options: {
                min: 5
            },
            errorMessage: {
                value: "NEWPASSWORD", 
                error: "New password must be at least 5 characters !"
            }
        }
    },
    conform_password: {
        notEmpty: { 
            errorMessage: {
                value: "CONFORMPASSWORD", 
                error: "Conform password canot empty !"
            }
        },
        isString: {
            errorMessage: {
                value: "CONFORMPASSWORD", 
                error: "Conform password must be string !"
            }
        },
        isLength: {
            options: {
                min: 5
            },
            errorMessage: {
                value: "CONFORMPASSWORD", 
                error: "Conform password must be at least 5 characters !"
            }
        }
    }
};

export const contactnuberValidetionSchema = {
    contactnuber: {
        isInt: {
            value: true,
            errorMessage: {
                value: "CONTACTNUMBER", 
                error: "Contactnuber must be int !"
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
                error: "Email must be string !"
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
        },
        isEmail: {
            value: true,
            errorMessage: {
                value: "EMAIL", 
                error: "Invalide email !"
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
            value: true,
            errorMessage: {
                value: "TITLE", 
                error: "Title must be int !"
            }
        },
        isLength: {
            options: {
                min: 0,
                max: 3
            },
            errorMessage: {
                value: "TITLE", 
                error: "Title ust be at least 0 - 3 numbers !"
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
                error: "Banded must be boolean !"
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