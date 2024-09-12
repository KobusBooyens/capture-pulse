import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { TableContainer } from "@mui/material";
import Box from "../../../components/Box/Box.jsx";
import SearchInput from "../../Inputs/SearchInput.jsx";

const DataTableGrid = ({
    table,
    totalRecords,
    isDataLoading,
    paginationModel,
    onPaginationModelChange,
    searchModel,
    onSearchModelChange,
    onSortModelChange,
    TableHeaderComponent
}) => {
    const pageSizeOptions = [10, 30, 50, 70, 100];
    const columns = useMemo(() => table.columns, [table]);
    const rows = useMemo(() => table.rows, [table]);

    return (
        <TableContainer>
            {searchModel && searchModel.enabled &&
              <Box display="flex"
                  justifyContent={TableHeaderComponent ? "space-between" : "flex-end"}
                  alignItems="center"
                  p={2}
                  width="100%" >
                  {TableHeaderComponent && 
                    <Box display="flex" justifyContent="flex-start">
                        <TableHeaderComponent />
                    </Box>
                  }
                  <Box display="flex" justifyContent="flex-end">
                      <SearchInput
                          label={searchModel.label}
                          placeholder={searchModel.placeholder}
                          onChange={onSearchModelChange}
                      />
                  </Box>
              </Box>

            }

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
    totalRecords: PropTypes.number,
    isDataLoading: PropTypes.bool,
    paginationModel: PropTypes.shape({
        page: PropTypes.number,
        perPage: PropTypes.number,
    }),
    onPaginationModelChange: PropTypes.func,
    TableHeaderComponent: PropTypes.node,
    table: PropTypes.shape({
        columns: PropTypes.array.isRequired,
        rows: PropTypes.array.isRequired,
    }).isRequired,
    searchModel: PropTypes.shape({
        enabled: PropTypes.bool,
        label: PropTypes.string,
        placeholder: PropTypes.string
    }),
    onSearchModelChange: PropTypes.func,
    onSortModelChange: PropTypes.func
};

export default DataTableGrid;
