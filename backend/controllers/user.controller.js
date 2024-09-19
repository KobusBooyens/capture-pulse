const UserService = require("../services/user.service");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");

const schema = z.object({
    firstName: z.string({ required_error: "firstName is required" }),
    lastName: z.string({ required_error: "lastName is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
    email: z.string({ required_error: "email is required" }),
    password: z.string({ required_error: "password is required" }),
    subscriptionCode: z.string({ required_error: "subscriptionCode is required" }),
    isSubscriptionOwner: z.boolean().optional(),
    activateSubscription: z.boolean().optional()

});

const basicSchema = z.object({
    page: z.string({ required_error: "page is required" }),
    pageSize: z.string({ required_error: "pageSize is required" }),
    searchText: z.string().optional(),
    sortColumn: z.string().optional(),
    sortDirection: z.string().optional(),
});

const createUser = async(req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await UserService.createUser(payload);
        res.status(response.status).send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicSchema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await UserService.getAllUsers(req.subscriptionId, payload);
        res.status(response.status).send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getUserById = async(req, res) => {
    try {
        res.status(200).send("getUserById");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const updateUser = async(req, res) => {
    try {
        res.status(200).send("updateUser");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteUser = async(req, res) => {
    try {
        res.status(200).send("deleteUser");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { getUserById, getAllUsers, createUser, updateUser, deleteUser };
