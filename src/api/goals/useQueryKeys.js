const queryKeys = {
    all: ["goals"],
    details: () => [...queryKeys.all, "detail"],
    detail: (id) => [...queryKeys.details(), id],
    pagination: (page) => [...queryKeys.all, "pagination", page],
};

export default queryKeys;