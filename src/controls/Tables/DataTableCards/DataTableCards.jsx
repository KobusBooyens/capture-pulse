import React from "react";
import PropTypes from "prop-types";
import Box from "../../../components/Box/Box.jsx";
import { CardContent, Grid, TableContainer, TablePagination } from "@mui/material";
import DataTableCardsSkeleton from "./DataTableCardsSkeleton.jsx";

const DataTableCards = ({
    data,
    totalRecords,
    isDataLoading,
    pageSizeOptions = [10, 30, 50, 70, 100],
    paginationModel,
    onPaginationModelChange,
}) => {

    return (
        <TableContainer>
            {isDataLoading ?
                <DataTableCardsSkeleton /> :
                <>
                    <Grid container spacing={2} px={2}>
                        {data?.map((item, key) =>
                            <Grid item xs={12} sm={12} md={6} lg={4} key={key}>
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
                            count={totalRecords}
                            page={paginationModel.page}
                            onPageChange={(event, value) => onPaginationModelChange({
                                ...paginationModel,
                                page: value
                            })}
                            rowsPerPage={paginationModel.pageSize}
                            onRowsPerPageChange={(event ) => onPaginationModelChange({
                                ...paginationModel,
                                pageSize: event.target.value
                            })}
                        />
                    </Box>
                </>
            }
        </TableContainer>

    );
};

DataTableCards.propTypes = {
    data: PropTypes.node.isRequired,
    totalRecords: PropTypes.number,
    isDataLoading: PropTypes.bool,
    pageSizeOptions: PropTypes.array,
    paginationModel: PropTypes.shape({
        page: PropTypes.number,
        pageSize: PropTypes.number,
    }),
    onPaginationModelChange: PropTypes.func
};

export default DataTableCards;
