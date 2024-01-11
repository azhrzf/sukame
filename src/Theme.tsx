import { extendTheme } from "@mui/joy/styles";

export const theme = extendTheme({
<<<<<<< HEAD
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
=======
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
>>>>>>> 221170b5289e0ef6288570ff99d37396fbf2185e
}
