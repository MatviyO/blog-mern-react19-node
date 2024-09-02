import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  // @ts-ignore
  shadows: ["none"],
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
