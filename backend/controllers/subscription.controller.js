const createSubscription = async (req, res) => {
    try {
        res.status(200).send("createSubscription");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

const verifySubscription = async (req, res) => {
    try {
        res.status(200).send("verifySubscription");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};

module.exports = { createSubscription, verifySubscription };