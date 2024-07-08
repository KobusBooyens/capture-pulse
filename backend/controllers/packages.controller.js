const db = require("../models");

const getAll = async (req, res) => {
    try {
        const data = await db.Packages.find({});
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const get = async (req, res) => {
    try {
        const data = await db.Packages.findById(req.params.id);
        if (!data) {
            return res.status(404).send("Setting not found");
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const create = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const data = await Promise.all(req.body.map(async (item) => {
                const newItem = new db.Packages(item);
                return await newItem.save();
            }));
            res.status(201).json(data);
        } else {
            const data = new db.Packages(req.body);
            await data.save();
            res.status(201).json(data);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const edit = async (req, res) => {
    try {
        const data = await db.Packages.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).send("Package not found");
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const deleteItem = async (req, res) => {
    try {
        const data = await db.Packages.delete({ _id: req.params.id });
        if (!data) {
            return res.status(404).send("Package not found");
        }
        res.send("Package deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { getAll, get, create, edit, deleteItem };
