const checkinQueryKeys = {
    all: ["packages"],
    details: () => [...checkinQueryKeys.all, "detail"],
    detail: (id) => [...checkinQueryKeys.details(), id],
    pagination: (page) => [...checkinQueryKeys.all, "pagination", page],
};

export default checkinQueryKeys;