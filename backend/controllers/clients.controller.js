const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");
const ClientService = require("../services/client.service");

const clientDetailSchema = {
    firstName: z.string({ required_error: "firstName is required" }),
    lastName: z.string({ required_error: "lastName is required" }),
    gender: z.enum(["Male", "Female"], { required_error: "gender is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
    dob: z.string().optional(),
    email: z.string().optional(),

    // weight: z.string({ required_error: "weight is required" }),
    // length: z.string({ required_error: "length is required" }),
    // goal: z.string({ required_error: "goal is required" }),
};

const paginationSchema = z.object({
    page: z.string({ required_error: "page is required" }),
    pageSize: z.string({ required_error: "pageSize is required" }),
    searchText: z.string().optional(),
    sortColumn: z.string().optional(),
    sortDirection: z.string().optional(),
});

const partnerDetailSchema = z.object(clientDetailSchema);

const schema = z.object({
    ...clientDetailSchema,
    joiningDate: z.string({ required_error: "joiningDate is required" }),
    package: z.string({ required_error: "package is required" }),
    amount: z.string({ required_error: "amount is required" }),
    partner: partnerDetailSchema.optional(),
}).refine(data => {
    if (data.package === "Couple") {
        return partnerDetailSchema.safeParse(data.partner).success;
    }
    return true;
}, {
    message: "Partner details are required for Couple package",
    path: ["partner"],
});

const basicClientSchema = z.object({
    firstName: z.string({ required_error: "firstName is required" }),
    lastName: z.string({ required_error: "lastName is required" }),
    gender: z.enum(["Male", "Female"], { required_error: "gender is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
    dob: z.string().optional(),
    email: z.string().optional(),
});

const getAllClients = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(paginationSchema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await ClientService.getAllClients(req.subscriptionId, payload);
        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getClient = async (req, res) => {
    try {
        const response = await ClientService.getClient(req.params.id);
        return res.status(200).send(response[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const createClient = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicClientSchema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await ClientService.createClient(req.subscriptionId, payload);
        return res.status(201).send(response);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const updateClient = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(basicClientSchema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await ClientService.updateClient(req.params.id, payload);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteClient = async (req, res) => {
    try {
        await ClientService.deleteClient(req.params.id);
        res.status(200).send("Client deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const clientNoteSchema = z.object({
    client: z.string({ required_error: "client is required" }),
    note: z.string({ required_error: "note is required" }),
});

const createClientNote = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(clientNoteSchema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await ClientService.createClientNote(payload);
        return res.status(201).send(response);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteClientNote = async (req, res) => {
    try {
        await ClientService.deleteClientNote(req.params.id);
        return res.status(200).send("Client Note deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    getAllClients, getClient, createClient, updateClient, deleteClient,
    createClientNote, deleteClientNote
};
