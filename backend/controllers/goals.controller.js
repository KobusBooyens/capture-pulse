const GoalService = require("../services/goal.service");
const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");

const schema = z.object({
    name: z.string({ required_error: "name is required" }),
});

const getAllGoals = async (req, res) => {
    try {
        const data = await GoalService.getAllGoals(req.subscriptionId);
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getGoal = async (req, res) => {
    try {
        const data = await GoalService.getGoal(req.params.id);
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const createGoal = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const data = await GoalService.createGoal(req.subscriptionId, payload);
        res.status(201).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteGoal = async (req, res) => {
    try {
        await GoalService.deleteGoal(req.params.id);

        res.status(200).send("Goal deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { getAllGoals, getGoal, createGoal, deleteGoal };
