const { validationResult } = require('express-validator');

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
        res.status(422).send({ errors: schemaValidation.array() });
        return;
    }
    return next();
}

module.exports = checkSchemaErrors;