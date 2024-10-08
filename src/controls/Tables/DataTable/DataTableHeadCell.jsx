import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import Box from "../../../components/Box/Box.jsx";
import { useUISettingsController } from "../../../context/UISettingsProvider.jsx";

function DataTableHeadCell({ width, children, sorted, align, ...rest }) {
    const [controller] = useUISettingsController();
    const { darkMode } = controller;

    return (
        <Box
            component="th"
            width={width}
            py={1.5}
            px={3}
            sx={({ palette: { light }, borders: { borderWidth } }) => ({
                borderBottom: `${borderWidth[1]} solid ${light.main}`,
            })}
        >
            <Box
                {...rest}
                position="relative"
                textAlign={align}
                color={darkMode ? "white" : "secondary"}
                opacity={0.7}
                sx={({ typography: { size, fontWeightBold } }) => ({
                    fontSize: size.xxs,
                    fontWeight: fontWeightBold,
                    textTransform: "uppercase",
                    cursor: sorted && "pointer",
                    userSelect: sorted && "none",
                })}
            >
                {children}
                {sorted && 
          <Box
              position="absolute"
              top={0}
              right={align !== "right" ? "16px" : 0}
              left={align === "right" ? "-5px" : "unset"}
              sx={({ typography: { size } }) => ({
                  fontSize: size.lg,
              })}
          >
              <Box
                  position="absolute"
                  top={-6}
                  color={sorted === "asc" ? "text" : "secondary"}
                  opacity={sorted === "asc" ? 1 : 0.5}
              >
                  <Icon>arrow_drop_up</Icon>
              </Box>
              <Box
                  position="absolute"
                  top={0}
                  color={sorted === "desc" ? "text" : "secondary"}
                  opacity={sorted === "desc" ? 1 : 0.5}
              >
                  <Icon>arrow_drop_down</Icon>
              </Box>
          </Box>
                }
            </Box>
        </Box>
    );
}

DataTableHeadCell.defaultProps = {
    width: "auto",
    sorted: "none",
    align: "left",
};

DataTableHeadCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
    sorted: PropTypes.oneOf([false, "none", "asc", "desc"]),
    align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableHeadCell;
