const validateAndRespond = require("../utils/zodValidation");
const AuthService = require("../services/auth.service");
const { z } = require("zod");

const signInSchema = z.object({
    email: z.string({ required_error: "email is required" }),
    password: z.string({ required_error: "password is required" }),
});

const signIn = async(req, res) => {
    try {
        const { payload, error } = validateAndRespond(signInSchema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await AuthService.signIn(payload);
        res.status(response.status).send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { signIn };