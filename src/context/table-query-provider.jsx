import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const initialContextState = {
    page: 0,
    pageSize: 10,
    searchText: "",
    sortColumn: "",
    sortDirection: "",
};

const TableQueryContext = createContext(initialContextState);

export const TableQueryProvider = ({ children }) => {

    const [page, setPage] = useState(initialContextState.page);
    const [pageSize, setPageSize] = useState(initialContextState.pageSize);
    const [searchText, setSearchText] = useState(initialContextState.searchText);
    const [sortColumn, setSortColumn] = useState(initialContextState.sortColumn);
    const [sortDirection, setSortDirection] = useState(initialContextState.sortDirection);

    const updatePagination = (newPage, newPageSize) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    updatePagination.propTypes = {
        newPage: PropTypes.number,
        newPageSize: PropTypes.number,

    };

    const updateSearchText = (newSearchText) => {
        setSearchText(newSearchText);
    };

    updateSearchText.propTypes = {
        newSearchText: PropTypes.string,
    };

    const updateSort = (sortParams) => {
        console.log("updateSort", sortParams[0]);
        setSortColumn(sortParams && sortParams.length > 0 ? sortParams[0].field : "");
        setSortDirection(sortParams && sortParams.length > 0 ? sortParams[0].sort : "");
    };

    updateSort.propTypes = {
        newSortColumn: PropTypes.string,
        newSortDirection: PropTypes.oneOf(["asc", "desc"])
    };

    return (
        <TableQueryContext.Provider
            value={{
                page,
                pageSize,
                searchText,
                sortColumn,
                sortDirection,
                updatePagination,
                updateSearchText,
                updateSort
            }}>
            {children}
        </TableQueryContext.Provider>
    );
};

export const useTableQuery = () => {
    const context = useContext(TableQueryContext);

    if (!context) {
        throw new Error("useTableQuery must be used within a TableQueryProvider");
    }

    return context;
};

TableQueryProvider.propTypes = {
    children: PropTypes.node
};

export default TableQueryProvider;
