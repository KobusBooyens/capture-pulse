import PropTypes from "prop-types";
import Box from "../../../components/Box/Box.jsx";

function DataTableBodyCell({ noBorder, align, children }) {
    return (
        <Box
            component="td"
            textAlign={align}
            py={1.5}
            px={3}
            sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }) => ({
                fontSize: size.sm,
                borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`,
            })}
        >
            <Box
                display="inline-block"
                width="max-content"
                color="text"
                sx={{ verticalAlign: "middle" }}
            >
                {children}
            </Box>
        </Box>
    );
}

DataTableBodyCell.defaultProps = {
    noBorder: false,
    align: "left",
};

DataTableBodyCell.propTypes = {
    children: PropTypes.node.isRequired,
    noBorder: PropTypes.bool,
    align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableBodyCell;
