const db = require("../models");

exports.getAllTaskReminders = async (subscriptionId, userId) => {
    const taskReminders = await db.TaskReminders.find({ subscription: subscriptionId }).lean();
    console.log(subscriptionId, userId);

    const { teamTaskReminders, myTaskReminders } = taskReminders.reduce((acc, taskReminder) => {
        if (taskReminder.teamTaskReminder) {
            acc.teamTaskReminders.push(taskReminder);
        }
        if (taskReminder.user.toString() === userId.toString() && !taskReminder.teamTaskReminder) {
            acc.myTaskReminders.push(taskReminder);
        }
        return acc;
    }, { teamTaskReminders: [], myTaskReminders: [] });

    return {
        teamTaskReminders,
        myTaskReminders,
    };
};

exports.createTaskReminder = async (subscriptionId, userId, payload) => {
    const taskReminder = new db.TaskReminders({
        ...payload,
        subscription: subscriptionId,
        user: userId
    });

    return await taskReminder.save();
};

exports.updateTaskReminder = async (id, payload) => {
    return db.TaskReminders.findOneAndUpdate({ _id: id }, { $set: { ...payload } });
};

exports.deleteTaskReminder = async (id) => {
    return db.TaskReminders.delete({ _id: id });
};