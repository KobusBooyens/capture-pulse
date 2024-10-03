const MembershipService = require("../services/membership.service");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");

const paginationSchema = z.object({
    page: z.string({ required_error: "page is required" }),
    pageSize: z.string({ required_error: "pageSize is required" }),
    searchText: z.string().optional(),
    sortColumn: z.string().optional(),
    sortDirection: z.string().optional(),
});

const membershipSchema = z.object({
    client: z.string({ required_error: "client is required" }),
    joiningDate: z.string({ required_error: "joiningDate is required" }),
    paymentDay: z.string({ required_error: "paymentDay is required" }),
    goal: z.string({ required_error: "goal is required" }),
    clientPackage: z.string({ required_error: "clientPackage is required" }),
    weight: z.string({ required_error: "weight is required" }),
    height: z.string({ required_error: "height is required" })
});

const getPaginatedMembership = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(paginationSchema, req.query);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await MembershipService.getPaginatedMembership(req.subscriptionId, payload);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getMembershipByClient = async (req, res) => {
    try {
        const response = await MembershipService.getMembershipByClient(req.params.clientId);

        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const createMembership = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(membershipSchema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await MembershipService.createMembership(payload);
        res.status(201).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const updateMembership = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(membershipSchema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await MembershipService.updateMembership(req.params.id, payload);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteMembership = async (req, res) => {
    try {
        await MembershipService.deleteMembership(req.params.id);
        res.status(200).send("Record deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    getPaginatedMembership,
    updateMembership,
    getMembershipByClient,
    createMembership,
    deleteMembership
};