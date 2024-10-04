exports.clientNotesLookup = {
    $lookup: {
        from: "clientNotes",
        let: { clientId: "$_id" },
        pipeline: [
            { $match: {
                $expr: { $eq: ["$client", "$$clientId"] },
                deleted: { $ne: true }
            } },
            { $project: { note: 1, createdAt: 1 } }
        ],
        as: "clientNotes"
    }
};

exports.clientPackageLookup = {
    $lookup: {
        from: "clientPackage",
        localField: "clientPackage",
        foreignField: "_id",
        as: "clientPackage"
    }
};

exports.packageLookup = {
    $lookup: {
        from: "packages",
        localField: "clientPackage.package",
        foreignField: "_id",
        as: "package"
    }
};

exports.membershipLookup = {
    $lookup: {
        from: "memberships",
        localField: "_id",
        foreignField: "client",
        as: "memberships"
    }
};

exports.membershipPackageLookup = {
    $lookup: {
        from: "packages",
        localField: "memberships.package",
        foreignField: "_id",
        as: "membershipPackages"
    }
};