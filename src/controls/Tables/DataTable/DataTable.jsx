import { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

import DataTableHeadCell from "./DataTableHeadCell";
import DataTableBodyCell from "./DataTableBodyCell";
import Pagination from "../../../components/Pagination/Pagination.jsx";
import Box from "../../../components/Box/Box.jsx";
import Input from "../../../components/Input/Input.jsx";
import Typography from "../../../components/Typography/Typography.jsx";

function DataTable({
    entriesPerPage,
    canSearch,
    showTotalEntries,
    table,
    pagination,
    isSorted,
    noEndBorder,
}) {
    const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
    const entries = entriesPerPage.entries
        ? entriesPerPage.entries.map((el) => el.toString())
        : ["5", "10", "15", "20", "25"];
    const columns = useMemo(() => table.columns, [table]);
    const data = useMemo(() => table.rows, [table]);

    const tableInstance = useTable(
        { columns, data, initialState: { pageIndex: 0 } },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        page,
        pageOptions,
        canPreviousPage,
        canNextPage,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter },
    } = tableInstance;

    // Set the default value for the entries per page when component mounts
    useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

    // Set the entries per page value based on the select value
    const setEntriesPerPage = (value) => setPageSize(value);

    // Render the paginations
    const renderPagination = pageOptions.map((option) =>
        <Pagination
            item
            key={option}
            onClick={() => gotoPage(Number(option))}
            active={pageIndex === option}
        >
            {option + 1}
        </Pagination>
    );

    // Handler for the input to set the pagination index
    const handleInputPagination = ({ target: { value } }) =>
        value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

    // Customized page options starting from 1
    const customizedPageOptions = pageOptions.map((option) => option + 1);

    // Setting value for the pagination input
    const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

    // Search input value state
    const [search, setSearch] = useState(globalFilter);

    // Search input state handle
    const onSearchChange = useAsyncDebounce((value) => {
        console.log(value);
        setGlobalFilter(value || undefined);
    }, 1000);

    // A function that sets the sorted value for the table
    const setSortedValue = (column) => {
        let sortedValue;

        if (isSorted && column.isSorted) {
            sortedValue = column.isSortedDesc ? "desc" : "asce";
        } else if (isSorted) {
            sortedValue = "none";
        } else {
            sortedValue = false;
        }

        return sortedValue;
    };

    // Setting the entries starting point
    const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

    // Setting the entries ending point
    let entriesEnd;

    if (pageIndex === 0) {
        entriesEnd = pageSize;
    } else if (pageIndex === pageOptions.length - 1) {
        entriesEnd = rows.length;
    } else {
        entriesEnd = pageSize * (pageIndex + 1);
    }

    return (
        <TableContainer sx={{ boxShadow: "none" }}>
            {entriesPerPage || canSearch ?
                <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    {entriesPerPage &&
            <Box display="flex" alignItems="center">
                <Autocomplete
                    disableClearable
                    value={pageSize.toString()}
                    options={entries}
                    onChange={(event, newValue) => {
                        setEntriesPerPage(parseInt(newValue, 10));
                    }}
                    size="small"
                    sx={{ width: "5rem" }}
                    renderInput={(params) => <Input {...params} />}
                />
                <Typography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
                </Typography>
            </Box>
                    }
                    {canSearch &&
            <Box width="12rem" ml="auto">
                <Input
                    placeholder="Search..."
                    value={search}
                    size="small"
                    fullWidth
                    onChange={({ currentTarget }) => {
                        setSearch(search);
                        onSearchChange(currentTarget.value);
                    }}
                />
            </Box>
                    }
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
                                    sorted={setSortedValue(column)}
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
                                        noBorder={noEndBorder && rows.length - 1 === key}
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

            <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
            >
                {showTotalEntries &&
          <Box mb={{ xs: 3, sm: 0 }}>
              <Typography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
              </Typography>
          </Box>
                }
                {pageOptions.length > 1 &&
          <Pagination
              variant={pagination.variant ? pagination.variant : "gradient"}
              color={pagination.color ? pagination.color : "info"}
          >
              {canPreviousPage &&
              <Pagination item onClick={() => previousPage()}>
                  <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </Pagination>
              }
              {renderPagination.length > 6 ?
                  <Box width="5rem" mx={1}>
                      <Input
                          inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                          value={customizedPageOptions[pageIndex]}
                          onChange={(handleInputPagination, handleInputPaginationValue)}
                      />
                  </Box>
                  :
                  renderPagination
              }
              {canNextPage &&
              <Pagination item onClick={() => nextPage()}>
                  <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </Pagination>
              }
          </Pagination>
                }
            </Box>
        </TableContainer>
    );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
    entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
    canSearch: false,
    showTotalEntries: true,
    pagination: { variant: "gradient", color: "info" },
    isSorted: true,
    noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
    entriesPerPage: PropTypes.oneOfType([
        PropTypes.shape({
            defaultValue: PropTypes.number,
            entries: PropTypes.arrayOf(PropTypes.number),
        }),
        PropTypes.bool,
    ]),
    canSearch: PropTypes.bool,
    showTotalEntries: PropTypes.bool,
    table: PropTypes.objectOf(PropTypes.array).isRequired,
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
};

export default DataTable;
