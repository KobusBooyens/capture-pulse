const validateAndRespond = (schema, data) => {
    if (Array.isArray(data)) {
        const result = data.map(item => schema.safeParse(item));
        const errors = result.filter(r => !r.success).map(r => r.error.errors);

        if (errors.length > 0) {
            return { error: errors.flat() };
        }

        return { payload: result.map(r => r.data) };
    }
    const result = schema.safeParse(data);
    if (!result.success) {
        return { error: result.error.errors };
    }
    return { payload: result.data };

};

module.exports = validateAndRespond;