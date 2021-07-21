/**
 * POST /api/auth/registration
 */

module.exports.createUserSchema = {
    email: {
        exists: {
            errorMessage: "No email provided"
        },
        isEmail: {
            errorMessage: "Email format invalid"
        }
    },
    firstName: {
        exists: {
            errorMessage: "No first name provided"
        },
        isLength: {
            errorMessage: "First name is too long",
            options: { min: 1, max: 45 },
        },
        custom: {
            options(firstName) {
                // Regex option
                const nameRegex = /^[A-zÀ-ÿ- ]+$/;

                if (firstName.match(nameRegex)) {
                    return true;
                }
                return false;
            },
            errorMessage: "First name should be alphabetic",
        },
    },
    lastName: {
        exists: {
            errorMessage: "No last name provided",
        },
        isLength: {
            errorMessage: "Last name is too long",
            options: { min: 1, max: 45 },
        },
        custom: {
            options(lastName) {
                // Regex option
                const nameRegex = /^[A-zÀ-ÿ- ]+$/;

                if (lastName.match(nameRegex)) {
                    return true;
                }
                return false;
            },
            errorMessage: "Last name should be alphabetic",
        },
    },
    // phoneNumber: {
    //     exists: {
    //         errorMessage: i18n.__('user.validation.required_phone_number'),
    //     },
    //     isMobilePhone: {
    //         errorMessage: i18n.__('user.validation.invalid_phone_number'),
    //     },
    //     isLength: {
    //         errorMessage: i18n.__('user.validation.invalid_phone_number'),
    //         options: { min: 12, max: 12 },
    //     },
    // },
    password: {
        isLength: {
            errorMessage: "Password is too short",
            options: { min: 8 },
        },
    }
};