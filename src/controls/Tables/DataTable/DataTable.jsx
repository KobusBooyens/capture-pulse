import { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import {
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Box,
    Typography,
    TextField
} from "@mui/material";
import DataTableHeadCell from "./DataTableHeadCell.jsx";
import DataTableBodyCell from "./DataTableBodyCell.jsx";
import IconButton from "@mui/material/IconButton";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

function DataTable({
    canSearch,
    searchPlaceHolderText,
    entriesPerPage,
    showTotalEntries,
    totalRecordCount,
    table,
    isSorted,
    paginationStateChange
}) {
    const columns = useMemo(() => table.columns, [table]);
    const data = useMemo(() => table.rows, [table]);

    const tableInstance = useTable(
        { columns, data, initialState: { pageIndex: 0 } },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const goToNextPage = () => {
        tableInstance.nextPage();
    };

    const goToPreviousPage = () => {
        tableInstance.previousPage();
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter },
    } = tableInstance;

    const handleSearchChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
        paginationStateChange({ searchText: value });
    }, 500);

    return (
        <TableContainer>
            {canSearch ?
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    {canSearch && <Box width="12rem" ml="auto">
                        <TextField
                            placeholder={searchPlaceHolderText}
                            value={globalFilter || ""}
                            size="small"
                            fullWidth
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </Box>}
                </Box>
                : null}

            <Table {...getTableProps()}>
                <Box component="thead">
                    {headerGroups.map((headerGroup, key) =>
                        <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, idx) =>
                                <DataTableHeadCell
                                    key={idx}
                                    {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                                    width={column.width ? column.width : "auto"}
                                    align={column.align ? column.align : "left"}
                                >
                                    {column.render("Header")}
                                </DataTableHeadCell>
                            )}
                        </TableRow>
                    )}
                </Box>
                <TableBody {...getTableBodyProps()}>
                    {page.map((row, key) => {
                        prepareRow(row);
                        return (
                            <TableRow key={key} {...row.getRowProps()}>
                                {row.cells.map((cell, idx) =>
                                    <DataTableBodyCell
                                        key={idx}
                                        align={cell.column.align ? cell.column.align : "left"}
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render("Cell")}
                                    </DataTableBodyCell>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <Box display="flex" alignItems="center" p={2}>
                <IconButton
                    onClick={goToPreviousPage}
                    disabled={!tableInstance.canPreviousPage}
                >
                    <ArrowBackIos />
                </IconButton>
                <Typography variant="caption">
                  Page {pageIndex + 1} of {tableInstance.pageOptions.length}
                </Typography>
                {showTotalEntries &&
                  <Box display="flex" alignItems="center" p={2}>
                      <Typography variant="caption">
                          Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, totalRecordCount)} of {totalRecordCount} entries
                      </Typography>
                  </Box>
                }
                <IconButton
                    onClick={goToNextPage}
                    disabled={!tableInstance.canNextPage}
                >
                    <ArrowForwardIos />
                </IconButton>
            </Box>

        </TableContainer>
    );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
    canSearch: false,
    searchPlaceHolderText: "Search...",
    showTotalEntries: true,
    pagination: { variant: "gradient", color: "info" },
    isSorted: true,
    noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
    canSearch: PropTypes.bool,
    searchPlaceHolderText: PropTypes.string,
    showTotalEntries: PropTypes.bool,
    totalRecordCount: PropTypes.number,
    table: PropTypes.shape({
        columns: PropTypes.array.isRequired,
        rows: PropTypes.array.isRequired,
    }).isRequired,
    pagination: PropTypes.shape({
        variant: PropTypes.oneOf(["contained", "gradient"]),
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "dark",
            "light",
        ]),
    }),
    isSorted: PropTypes.bool,
    noEndBorder: PropTypes.bool,
    paginationStateChange: PropTypes.func.isRequired,
};

export default DataTable;
