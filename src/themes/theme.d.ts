import { Colors } from "./colors";
import { FontSizes } from "./font-size";

declare module '@mui/material/styles' {
    interface Theme {
        colors: Colors,
        fontSizes: FontSizes
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        colors?: Colors,
        fontSizes?: FontSizes
    }
}