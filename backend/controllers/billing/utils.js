const db = require("../../models");

exports.formatClientBillingResponse = (data) => {
    const client = data[0]?.client;
    const records = data.map(d => {
        const resp = {
            ...d
        };
        delete resp?.client;
        return resp;
    });

    return {
        client, records
    };

};
exports.formatClientResponse = async (data) => {
    const clientPackageList = await getClientPackageList();
    return data.map(d => {
        const resp = {
            ...d,
            clientId: d?._id,
            package: d?.clientPackage?.package._id,
            packageName: d?.clientPackage?.package.name,
            amount: d?.clientPackage?.amount,
            packagePartners:
        clientPackageList[d?.clientPackage?._id] ?? undefined
        };

        delete resp.clientPackage;
        return resp;
    });
};

const getClientPackageList = async () => {
    const data = await db.Packages.aggregate([
        { $match: { name: "Couples" } },
        {
            $lookup: {
                from: "clientPackage",
                localField: "_id",
                foreignField: "package",
                as: "clientPackage"
            }
        },
        { $unwind: "$clientPackage" },
        {
            $lookup: {
                from: "clients",
                localField: "clientPackage._id",
                foreignField: "clientPackage",
                as: "clients"
            }
        },
        { $unwind: "$clients" },
        {
            $group: {
                _id: "$clientPackage._id",
                clients: {
                    $push: {
                        id: "$clients._id",
                        firstName: "$clients.firstName",
                        lastName: "$clients.lastName"
                    }
                }
            }
        },
        {
            $project: {
                clientPackageId: "$_id",
                _id: 0,
                clients: 1
            }
        }
    ]);

    return data ? data?.reduce((acc, record) => {
        acc[record.clientPackageId] = record.clients.map(client => ({
            id: client.id,
            name: `${client.firstName} ${client.lastName}`,
        }));
        return acc;
    }, {}) : undefined;
};
