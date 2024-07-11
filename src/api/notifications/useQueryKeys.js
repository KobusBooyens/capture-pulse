const userQueryKeys = {
    all: ["notifications"],
    details: () => [...userQueryKeys.all, "detail"],
    detail: (id) => [...userQueryKeys.details(), id],
    pagination: (page) => [...userQueryKeys.all, "pagination", page],
};

export default userQueryKeys;