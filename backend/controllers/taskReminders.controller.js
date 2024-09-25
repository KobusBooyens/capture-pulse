const { z } = require("zod");
const validateAndRespond = require("../utils/zodValidation");
const TaskReminderService = require("../services/taskReminders.service");

const schema = z.object({
    title: z.string({ required_error: "title is required" }),
    description: z.string().optional(),
    dateTime: z.string().optional(),
    teamTaskReminder: z.boolean().optional()
});

const getAllTaskReminders = async (req, res) => {
    try {
        const response = await TaskReminderService.getAllTaskReminders(req.subscriptionId, req.userId);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const createTaskReminder = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }

        const response = await TaskReminderService.createTaskReminder(req.subscriptionId, req.userId, payload);
        res.status(201).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const updateTaskReminder = async (req, res) => {
    try {
        const { payload, error } = validateAndRespond(schema, req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed.", errors: error });
        }
        const response = await TaskReminderService.updateTaskReminder(req.params.id, payload);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteTaskReminder = async (req, res) => {
    try {
        const response = await TaskReminderService.deleteTaskReminder(req.params.id);
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = {
    getAllTaskReminders, createTaskReminder, updateTaskReminder, deleteTaskReminder
};