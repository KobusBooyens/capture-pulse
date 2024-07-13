import React from "react";
import { Skeleton, TableCell, TableHead } from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Box from "../../../components/Box/Box.jsx";
import DataTableHeadCell from "../DataTable/DataTableHeadCell.jsx";
import DataTableBodyCell from "../DataTable/DataTableBodyCell.jsx";

const DataTableSkeleton = () => {
    const skeletonRows = 5;
    const skeletonCols = 7;

    return (
    // <Box className={"flex flex-col gap-5 px-20"}>
    //   <Box className={"flex flex-row justify-between"}>
    //     <Skeleton variant="rectangular" width={300} height={40} animation={"pulse"}/>
    //     <Skeleton variant="rectangular" width={150} height={40} animation={"pulse"}/>
    //   </Box>

        <TableContainer sx={{ boxShadow: "none" }}>
            <Table size="small">
                <Box component="thead">
                    <TableRow>
                        {Array(skeletonCols).fill().map((_, index) =>
                            <DataTableHeadCell key={index}>
                                <Skeleton variant="text" width="80%" animation={"pulse"}/>
                            </DataTableHeadCell>
                        )}
                    </TableRow>
                </Box>
                <TableBody>
                    {Array(skeletonRows).fill().map((_, rowIndex) =>
                        <TableRow key={rowIndex}>
                            {Array(skeletonCols).fill().map((_, colIndex) =>
                                <DataTableBodyCell key={colIndex} align={"left"} noBorder={true}>
                                    <Skeleton variant="text" width={100} animation={"pulse"} />
                                </DataTableBodyCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>

    //   <Box className={"flex flex-row justify-between"}>
    //     <Skeleton variant="text" width={100}/>
    //     <Skeleton variant="rectangular" width={200} height={40}/>
    //   </Box>
    // </Box>
    );
};

export default DataTableSkeleton;
