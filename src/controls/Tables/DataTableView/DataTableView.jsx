import React from "react";
import PropTypes from "prop-types";
import DataTableCards from "../DataTableCards/DataTableCards.jsx";
import DataTableGrid from "../DataTableGrid/DataTableGrid.jsx";
import Typography from "../../../components/Typography/Typography.jsx";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Icon from "@mui/material/Icon";
import Box from "../../../components/Box/Box.jsx";
import SearchInput from "../../Inputs/SearchInput.jsx";
import TableContainer from "@mui/material/TableContainer";

const DataTableView = ({
    rowsView,
    gridView,
    totalRecords,
    isDataLoading,
    paginationModel,
    onPaginationModelChange,
    searchModel,
    onSearchModelChange,
    onSortModelChange,
    TableHeaderComponent
}) => {
    const [view, setView] = React.useState("rows");

    const handleChange = (event, newView) => {
        setView(newView);
    };

    return (
        <>
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

                      <Box display="flex" justifyContent="flex-end" gap={2}>
                          <Box display={"flex"} gap={1} alignItems={"center"} >
                              <Typography variant={"body2"} fontWeight={"light"}>View</Typography>
                              <ToggleButtonGroup
                                  color={"primary"}
                                  value={view}
                                  exclusive
                                  onChange={handleChange}
                                  aria-label={"data-view"}
                              >
                                  <ToggleButton value="grid" >
                                      <Icon>grid_view</Icon>
                                  </ToggleButton>
                                  <ToggleButton value="rows">
                                      <Icon>table_rows</Icon>
                                  </ToggleButton>,
                              </ToggleButtonGroup>
                          </Box>
                          <SearchInput
                              label={searchModel.label}
                              placeholder={searchModel.placeholder}
                              onChange={onSearchModelChange}
                          />
                      </Box>
                  </Box>
                }

                {view === "grid" &&
              <DataTableCards
                  data={gridView}
                  totalRecords={totalRecords}
                  isDataLoading={isDataLoading}
                  paginationModel={paginationModel}
                  onPaginationModelChange={onPaginationModelChange}
                  searchModel={searchModel}
                  onSearchModelChange={onSearchModelChange}
                  onSortModelChange={onSortModelChange}
              />
                }
                {view === "rows" &&
              <DataTableGrid
                  table={rowsView}
                  totalRecords={totalRecords}
                  isDataLoading={isDataLoading}
                  paginationModel={paginationModel}
                  onPaginationModelChange={onPaginationModelChange}
                  searchModel={searchModel}
                  onSearchModelChange={onSearchModelChange}
                  onSortModelChange={onSortModelChange}
              />}
            </TableContainer>
        </>
    );
};

DataTableView.propTypes = {
    totalRecords: PropTypes.number,
    isDataLoading: PropTypes.bool,
    paginationModel: PropTypes.shape({
        page: PropTypes.number,
        perPage: PropTypes.number,
    }),
    onPaginationModelChange: PropTypes.func,
    TableHeaderComponent: PropTypes.node,
    rowsView: PropTypes.shape({
        columns: PropTypes.array.isRequired,
        rows: PropTypes.array.isRequired,
    }).isRequired,
    gridView: PropTypes.node.isRequired,
    searchModel: PropTypes.shape({
        enabled: PropTypes.bool,
        label: PropTypes.string,
        placeholder: PropTypes.string
    }),
    onSearchModelChange: PropTypes.func,
    onSortModelChange: PropTypes.func
};

export default DataTableView;
