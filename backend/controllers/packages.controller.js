const PackageService = require("../services/package.service");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");

const schema = z.object({
    name: z.string({ required_error: "name is required" }),
    amount: z.number({ required_error: "amount is required" }),
});

const getAllPackages = async (req, res) => {
    try {
        const data = await PackageService.getAllPackages(req.subscriptionId);
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getPackage = async (req, res) => {
    try {
        const data = await PackageService.getPackage(req.params.id);
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const createPackage = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const data = await PackageService.createPackage(req.subscriptionId, payload);
        res.status(201).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const updatePackage = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const data = await PackageService.updatePackage(req.params.id, payload);
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deletePackage = async (req, res) => {
    try {
        await PackageService.deletePackage(req.params.id);
        
        res.status(200).send("Package deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { getAllPackages, getPackage, createPackage, updatePackage, deletePackage };
