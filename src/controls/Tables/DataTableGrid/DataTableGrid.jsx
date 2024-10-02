import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { TableContainer } from "@mui/material";

const DataTableGrid = ({
    table,
    pageSizeOptions= [10, 30, 50, 70, 100],
    totalRecords,
    isDataLoading,
    paginationModel,
    onPaginationModelChange,
    onSortModelChange,
}) => {
    const columns = useMemo(() => table.columns, [table]);
    const rows = useMemo(() => table.rows, [table]);

    return (
        <TableContainer>
            <DataGrid 
                autoHeight
                columns={columns}
                rows={rows}
                rowHeight={60}
                rowCount={totalRecords}
                loading={isDataLoading}
                pageSizeOptions={pageSizeOptions}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}
                onSortModelChange={onSortModelChange}
                paginationMode={"server"}
                sortingMode={"server"}
                hideFooterSelectedRowCount
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnMenu
            />

        </TableContainer>
    );
};

DataTableGrid.propTypes = {
    table: PropTypes.shape({
        columns: PropTypes.array.isRequired,
        rows: PropTypes.array.isRequired,
    }).isRequired,
    totalRecords: PropTypes.number,
    pageSizeOptions: PropTypes.array,
    paginationModel: PropTypes.shape({
        page: PropTypes.number,
        pageSize: PropTypes.number,
    }),
    onPaginationModelChange: PropTypes.func
};

export default DataTableGrid;
