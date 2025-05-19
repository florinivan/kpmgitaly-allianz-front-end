import { createTheme, PaletteOptions, Theme } from '@mui/material/styles';

// Define the branding colors object for easy access across the app
export const brandColors = {
  primary: '#4285F4',  // Google Blue
  primaryDark: '#3367d6', // Darker shade for hover states
  primaryLight: '#83a9f7', // Lighter shade for backgrounds
  secondary: '#00338d', // KPMG dark blue
  kpmgBlue: '#005eb8', // Original KPMG blue
  background: {
    light: '#f5f5f5',
    dark: '#121212',
    paper: {
      light: '#ffffff',
      dark: '#1e1e1e'
    }
  },
  text: {
    light: '#202124', // Dark gray for light mode
    dark: '#e8eaed'   // Light gray for dark mode
  }
};

// Function to create palette options based on mode
const createPalette = (mode: 'light' | 'dark'): PaletteOptions => {
  return {
    mode,
    primary: {
      main: brandColors.primary,
      dark: brandColors.primaryDark,
      light: brandColors.primaryLight,
      contrastText: '#ffffff'
    },
    secondary: {
      main: brandColors.secondary,
    },
    background: {
      default: mode === 'light' ? brandColors.background.light : brandColors.background.dark,
      paper: mode === 'light' ? brandColors.background.paper.light : brandColors.background.paper.dark,
    },
    text: {
      primary: mode === 'light' ? brandColors.text.light : brandColors.text.dark,
    }
  };
};

// Create theme based on mode
export const createAppTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: createPalette(mode),
    typography: {
      fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 500,
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 600,
            '&.MuiButton-containedPrimary': {
              backgroundColor: brandColors.primary,
              '&:hover': {
                backgroundColor: brandColors.primaryDark,
              },
            }
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? brandColors.primary : brandColors.background.dark,
          }
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: brandColors.primary,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          elevation1: {
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
          }
        }
      }
    },
  });
};

// Export common style patterns for reuse
export const commonStyles = {
  card: {
    borderRadius: '8px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  },
  container: {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '0 16px',
  },
  formField: {
    marginBottom: '16px',
  },
  button: {
    primary: {
      backgroundColor: brandColors.primary,
      color: '#ffffff',
      '&:hover': {
        backgroundColor: brandColors.primaryDark,
      },
    },
  },
};