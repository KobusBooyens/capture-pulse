// import React from "react";
// import { useTableQuery } from "../../context/TableQueryProvider.jsx";
// import { usePaginatedMembership } from "../../api/memberships/useMembershipFetch.js";
// import Typography from "../../components/Typography/Typography.jsx";
// import ViewClientsPage from "../clients/pages/ViewClientsPage.jsx";
// import ViewMembershipsPage from "./pages/ViewMembershipsPage.jsx";
//
// const MembershipMain = () => {
//     const {
//         page,
//         pageSize,
//         searchText,
//         sortColumn,
//         sortDirection,
//         updatePagination,
//         updateSearchText,
//         updateSort,
//     } = useTableQuery();
//
//     const { isLoading, error, data } = usePaginatedMembership({
//         page,
//         pageSize,
//         searchText,
//         sortColumn,
//         sortDirection
//     });
//
//     return (
//         <>
//             {/*{isLoading && <DataTableSkeleton/>}*/}
//             {error && <Typography>An error has occurred {error}</Typography>}
//             {!error && <ViewMembershipsPage
//                 data={data}
//                 isLoading={isLoading}
//                 paginationModel={{ page, pageSize }}
//                 onPaginationModelChange={(model) => updatePagination(model.page, model.pageSize)}
//                 onSearchModelChange={updateSearchText}
//                 onSortModelChange={updateSort}
//             />}
//         </>
//     );
// };
// export default MembershipMain;
