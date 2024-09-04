exports.formatResponse = (data) => {
    if (!data || data.length === 0) {
        return {
            client: null,
            records: []
        };
    }

    return {
        client: {
            _id: data[0].client._id,
            firstName: data[0].client.firstName,
            lastName: data[0].client.lastName,
            contactNumber: data[0].client.contactNumber,
        },
        records: data.map(r => ({
            _id: r._id,
            date: r.date,
            mood: r?.mood,
            weight: r?.weight,
            feedback: r.feedback
        }))
    };
};