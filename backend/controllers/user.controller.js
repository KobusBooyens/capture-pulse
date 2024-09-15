const deleteUser = async(req, res) => {
    try {
        res.status(200).send("deleteUser");
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

const createUser = async(req, res) => {
    try {
        res.status(200).send("createUser");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const getUser = async(req, res) => {
    try {
        res.status(200).send("getUser");
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

module.exports = { getUserById, getUser, createUser, updateUser, deleteUser };
