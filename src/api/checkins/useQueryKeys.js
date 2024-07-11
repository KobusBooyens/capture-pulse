const checkinQueryKeys = {
    all: ["checkins"],
    details: () => [...checkinQueryKeys.all, "detail"],
    detail: (id, type) => [...checkinQueryKeys.details(), id, type],
    pagination: (page) => [...checkinQueryKeys.all, "pagination", page],
};

export default checkinQueryKeys;