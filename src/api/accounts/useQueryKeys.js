const queryKeys = {
    all: ["accounts"],
    details: () => [...queryKeys.all, "detail"],
    detail: (id, type) => [...queryKeys.details(), id, type],
    pagination: (page) => [...queryKeys.all, "pagination", page],
};

export default queryKeys;