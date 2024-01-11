import { extendTheme } from "@mui/joy/styles";

export const theme = extendTheme({
  fontFamily: {
    body: "Roboto, Helvetica, Arial, sans-serif",
    display: "Roboto, Helvetica, Arial, sans-serif",
    fallback: "Roboto, Helvetica, Arial, sans-serif",
  },
  colorSchemes: {
    light: {
      palette: {
        success: {
          headerBg: "#006D43",
        },
      },
    },
    dark: {
      palette: {
        success: {
          headerBg: "var(--joy-pallette-common-black, #000)",
        },
      },
    },
  },
});

declare module "@mui/joy/styles" {
  interface Palette {
    success: {
      headerBg: string;
    };
  }
}
