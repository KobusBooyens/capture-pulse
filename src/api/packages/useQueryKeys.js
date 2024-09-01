const packagesQueryKeys = {
    all: ["packages"],
    details: () => [...packagesQueryKeys.all, "detail"],
    detail: (id) => [...packagesQueryKeys.details(), id],
    pagination: (page) => [...packagesQueryKeys.all, "pagination", page],
};

export default packagesQueryKeys;