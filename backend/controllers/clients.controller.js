const db = require("../models");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");

const clientDetail = {
    firstName: z.string({ required_error: "firstName is required" }),
    lastName: z.string({ required_error: "lastName is required" }),
    dob: z.string({ required_error: "dob is required" }),
    gender: z.enum(["Male", "Female"], { required_error: "gender is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
    weight: z.string({ required_error: "weight is required" }),
    length: z.string({ required_error: "length is required" }),
    goal: z.string({ required_error: "goal is required" }),
};
const partnerDetail = z.object(clientDetail);

const schema = z.object({
    ...clientDetail,
    joiningDate: z.string({ required_error: "joiningDate is required" }),
    package: z.string({ required_error: "package is required" }),
    amount: z.string({ required_error: "amount is required" }),
    partner: partnerDetail.optional(),
}).refine(data => {
    if (data.package === "Couple") {
        return partnerDetail.safeParse(data.partner).success;
    }
    return true;
}, {
    message: "Partner details are required for Couple package",
    path: ["partner"],
});

const getAll = async (req, res) => {
    try {
        const data = await db.Client.find({})
            .populate("package")
            .lean();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const get = async (req, res) => {
    try {
        const data = await db.Client.findById(req.params.id)
            .populate("package")
            .lean();
        if (!data) {
            return res.status(404).send("Client not found");
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const create = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        console.log(payload);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const saveClients = (item) => {
            const bulkOps = [];
            const clientData = { ...item };
            delete clientData.partner;
            bulkOps.push({ insertOne: { document: clientData } });

            if (item.partner) {
                bulkOps.push({ insertOne: {
                    document: {
                        ...item.partner,
                        package: item.package,
                        amount: item.amount,
                        joiningDate: item.joiningDate } }
                });
            }
            return bulkOps;
        };

        const insertOperations = Array.isArray(payload) ?
            payload.forEach(saveClients) :
            saveClients(payload);

        const result = await db.Client.bulkWrite(insertOperations);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const edit = async (req, res) => {
    try {
        const data = await db.Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).send("Client not found");
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteItem = async (req, res) => {
    try {
        const data = await db.Client.delete({ _id: req.params.id });
        if (!data) {
            return res.status(404).send("Client not found");
        }
        res.send("Client deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { getAll, get, create, edit, deleteItem };
