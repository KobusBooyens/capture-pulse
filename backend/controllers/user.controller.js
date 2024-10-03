const UserService = require("../services/user.service");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");

const schema = z.object({
    firstName: z.string({ required_error: "firstName is required" }),
    lastName: z.string({ required_error: "lastName is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
    email: z.string({ required_error: "email is required" }),
    password: z.string().optional(),
    subscriptionCode: z.string({ required_error: "subscriptionCode is required" }),
    role: z.string().optional(),
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
        const response = await UserService.getAllUsers(req.subscriptionId);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getPaginatedUsers = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicSchema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await UserService.getPaginatedUsers(req.subscriptionId, payload);
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
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await UserService.editUser(req.params.id, payload);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteUser = async(req, res) => {
    try {
        await UserService.deleteUser(req.params.id);
        res.status(200).send("User deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { getUserById, getPaginatedUsers, getAllUsers, createUser, updateUser, deleteUser };
