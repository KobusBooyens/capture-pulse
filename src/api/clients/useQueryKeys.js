const clientQueryKeys = {
    all: ["clients"],
    details: () => [...clientQueryKeys.all, "detail"],
    detail: (id) => [...clientQueryKeys.details(), id],
    pagination: (page) => [...clientQueryKeys.all, "pagination", page],
};

export default clientQueryKeys;