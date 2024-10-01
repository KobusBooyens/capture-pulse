import React, { useMemo } from "react";
import PropTypes from "prop-types";
import SearchInput from "../../Inputs/SearchInput.jsx";
import Box from "../../../components/Box/Box.jsx";
import { CardContent, Grid, TableContainer, TablePagination } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "../../../components/Typography/Typography.jsx";

const DataTableCards = ({
    data,
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
    // const columns = useMemo(() => table.columns, [table]);
    // const rows = useMemo(() => table.rows, [table]);
  
    return (
        <TableContainer>
            {searchModel && searchModel.enabled && 
          <Box
              display="flex"
              justifyContent={TableHeaderComponent ? "space-between" : "flex-end"}
              alignItems="center"
              p={2}
              width="100%"
          >
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

            <Grid container spacing={2} px={2}>
                {data?.map((item, key) =>
                    <Grid item xs={12} sm={12} md={12} lg={4} key={key}>
                        <Box shadow={2} variant={"gradient"} borderRadius="lg" coloredShadow="dark" >
                            <CardContent>
                                {item}
                            </CardContent>
                        </Box>
                    </Grid>
                )}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
                <TablePagination
                    component={"div"}
                    rowsPerPageOptions={pageSizeOptions}
                    count={Math.ceil(totalRecords / paginationModel.pageSize)}
                    page={paginationModel.page + 1}
                    onPageChange={(event, value) => onPaginationModelChange({
                        ...paginationModel,
                        page: value - 1
                    })}
                    rowsPerPage={paginationModel.pageSize}
                    onRowsPerPageChange={(event ) => onPaginationModelChange({
                        ...paginationModel,
                        pageSize: event.target.value
                    })}
                />
            </Box>
        </TableContainer>
    );
};

DataTableCards.propTypes = {
    totalRecords: PropTypes.number,
    isDataLoading: PropTypes.bool,
    paginationModel: PropTypes.shape({
        page: PropTypes.number,
        pageSize: PropTypes.number,
    }),
    onPaginationModelChange: PropTypes.func,
    TableHeaderComponent: PropTypes.node,
    data: PropTypes.node.isRequired,
    searchModel: PropTypes.shape({
        enabled: PropTypes.bool,
        label: PropTypes.string,
        placeholder: PropTypes.string,
    }),
    onSearchModelChange: PropTypes.func,
    onSortModelChange: PropTypes.func,
};

export default DataTableCards;
