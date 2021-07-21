const { validationResult } = require('express-validator/check');

const errorFormatter = ({ msg, param }) => ({
    code: 'is_invalid',
    target: 'field',
    message: msg,
    source: { field: param },
});

/**
 * Validation Schema Error handler.
 */

function checkSchemaErrors(req, res, next) {
    // Check validation Schema Errors
    const schemaValidation = validationResult(req).formatWith(errorFormatter);
    if (!schemaValidation.isEmpty()) {
        return res.status(422).json({ errors: schemaValidation.array() });
    }
    return next();
}

module.exports = checkSchemaErrors;