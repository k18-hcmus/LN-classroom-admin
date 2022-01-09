import { createTheme } from "@mui/material";
import { DEFAULT_SPACING } from "../shared/styles";
import colors from "./colors";
import fontSizes from "./font-size";

const theme = createTheme({
    spacing: DEFAULT_SPACING,
    colors,
    fontSizes
});

export default theme;