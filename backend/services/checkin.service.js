const validateAndRespond = require("../utils/zodValidation");
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

    let sortFilter = { latestCheckinDate: 1, firstName: 1, lastName: 1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "client") {
            sortFilter = { firstName: sortDirection, lastName: sortDirection };
        } else if (payload.sortColumn === "joined") {
            sortFilter = { "joiningDate": sortDirection };
        } else if (payload.sortColumn === "latestCheckinDate") {
            sortFilter = { latestCheckinDate: sortDirection };
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
            { mood: { $regex: ".*" + payload.searchText + ".*", $options: "i", }, }
        ];
    }

    let sortFilter = { date: -1 };
    if (payload.sortColumn && payload.sortDirection) {
        const sortDirection = payload.sortDirection === "asc" ? 1 : -1;

        if (payload.sortColumn === "date") {
            sortFilter = { date: sortDirection };
        } else if (payload.sortColumn === "mood") {
            sortFilter = { "mood": sortDirection };
        }
    }

    const [ data, recordCount ] = await Promise.all([
        db.GeneralCheckins.find(queryFilter)
            .populate("client")
            .sort(sortFilter)
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .lean(),
        db.GeneralCheckins.countDocuments(queryFilter)
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

exports.create = async (payload) => {
    const handleCheckinRecord = async (item) => {
        const newCheckin = new db.GeneralCheckins(item);
        const savedCheckin = await newCheckin.save();

        await db.Client.findOneAndUpdate(
            { _id: savedCheckin.client },
            { $max: { latestCheckinDate: savedCheckin.date } }
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
            const latestCheckin = await db.GeneralCheckins
                .find({ client: originalCheckin.client })
                .sort({ date: -1 })
                .limit(1);

            const latestCheckinDate = latestCheckin.length > 0 ? latestCheckin[0].date : null;
            await db.Client.findOneAndUpdate(
                { _id: originalCheckin.client },
                { $set: { latestCheckinDate } }
            );

        }
    };

    const originalCheckin = await db.GeneralCheckins.findById(id);

    const updatedCheckin = await db.GeneralCheckins.updateOne({ _id: id },
        { ...payload });

    await updateLatestCheckinDate(originalCheckin);

    return updatedCheckin;
};

exports.deleteItem = async (id) => {
    const updateLatestCheckinDate = async (originalCheckin) => {
        const latestCheckin = await db.GeneralCheckins
            .find({ client: originalCheckin.client })
            .sort({ date: -1 })
            .limit(1);

        const latestCheckinDate = latestCheckin.length > 0 ? latestCheckin[0].date : null;
        await db.Client.findOneAndUpdate(
            { _id: originalCheckin.client },
            { $set: { latestCheckinDate } }
        );
    };

    const originalCheckin = await db.GeneralCheckins.findById(id);
    await db.GeneralCheckins.delete({ _id: id });
    await updateLatestCheckinDate(originalCheckin);
    return originalCheckin;
};