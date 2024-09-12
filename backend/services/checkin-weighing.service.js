const db = require("../models");
const { formatResponse } = require("../controllers/checkins/_shared");
const { formatClientResponse } = require("../controllers/utils");

exports.getAll = async (payload) => {
    const pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
    const page = payload.page ? Number(payload.page) : 1;

    let queryFilter = { };

    if (payload.searchText) {
        queryFilter["$or"] = [
            { date: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
            { mood: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
        ];
    }

    let sortFilter = { latestWeighingDate: 1, firstName: 1, lastName: 1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "client") {
            sortFilter = { firstName: sortDirection, lastName: sortDirection };
        } else if (payload.sortColumn === "joined") {
            sortFilter = { "joiningDate": sortDirection };
        } else if (payload.sortColumn === "latestWeighingDate") {
            sortFilter = { latestWeighingDate: sortDirection };
        }
    }

    const [ data, recordCount ] = await Promise.all([
        db.Client.find(queryFilter)
            .populate({
                path: "clientPackage",
                populate: "package"
            })
            .sort(sortFilter)
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .lean(),
        db.Client.countDocuments(queryFilter)
    ]);

    return {
        records: data && data?.length ? await formatClientResponse(data) : [],
        recordCount: recordCount
    };
};

exports.get = async (clientId, payload) => {
    const pageSize = payload.pageSize ? Number(payload.pageSize) : 10;
    const page = payload.page ? Number(payload.page) : 1;

    let queryFilter = { client: clientId };

    if (payload.searchText) {
        queryFilter["$or"] = [
            { date: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, },
            { weight: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
        ];
    }

    let sortFilter = { date: -1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "date") {
            sortFilter = { date: sortDirection };
        } else if (payload.sortColumn === "weight") {
            sortFilter = { "weight": sortDirection };
        }
    }

    const [ data, recordCount ] = await Promise.all([
        db.WeighingCheckins.find(queryFilter)
            .populate("client")
            .sort(sortFilter)
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .lean(),
        db.WeighingCheckins.countDocuments(queryFilter)
    ]);

    if (recordCount > 0) {
        return {
            records: data && data?.length ? formatResponse(data) : [],
            recordCount: recordCount
        };
    }
    const client = await db.Client.findOne({ _id: clientId })
        .select("firstName lastName contactNumber")
        .lean();

    return {
        records: { client },
        recordCount: recordCount
    };
};

exports.create = async(payload) => {
    const handleCheckinRecord = async (item) => {
        const newCheckin = new db.WeighingCheckins(item);
        const savedCheckin = await newCheckin.save();

        await db.Client.findOneAndUpdate(
            { _id: savedCheckin.client },
            { $max: { latestWeighingDate: savedCheckin.date } }
        );

        return savedCheckin;
    };

    if (Array.isArray(payload)) {
        return await Promise.all(payload.map(handleCheckinRecord));
    }

    return await handleCheckinRecord(payload);
};

exports.edit = async (id, payload) => {
    const updateLatestCheckinDate = async (originalCheckin) => {
        if (payload.date && new Date(payload.date).getTime() !== originalCheckin.date.getTime()) {
            const latestWeighing = await db.WeighingCheckins
                .find({ client: originalCheckin.client })
                .sort({ date: -1 })
                .limit(1);

            const latestWeighingDate = latestWeighing.length > 0 ? latestWeighing[0].date : null;
            await db.Client.findOneAndUpdate(
                { _id: originalCheckin.client },
                { $set: { latestWeighingDate } }
            );

        }
    };

    const originalCheckin = await db.WeighingCheckins.findById(id);

    const updatedCheckin = await db.WeighingCheckins.updateOne({ _id: id },
        { ...payload });

    await updateLatestCheckinDate(originalCheckin);

    return updatedCheckin;
};

exports.deleteItem = async (id) => {
    const updateLatestCheckinDate = async (originalCheckin) => {
        const latestWeighing = await db.WeighingCheckins
            .find({ client: originalCheckin.client })
            .sort({ date: -1 })
            .limit(1);

        const latestWeighingDate = latestWeighing.length > 0 ? latestWeighing[0].date : null;
        await db.Client.findOneAndUpdate(
            { _id: originalCheckin.client },
            { $set: { latestWeighingDate } }
        );
    };

    const originalCheckin = await db.WeighingCheckins.findById(id);
    await db.WeighingCheckins.delete({ _id: id });
    await updateLatestCheckinDate(originalCheckin);
    return originalCheckin;
};