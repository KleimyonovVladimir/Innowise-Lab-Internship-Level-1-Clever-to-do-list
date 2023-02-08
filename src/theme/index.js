import { createTheme } from '@mui/material'

// import colors from 'styles/variables/_colors.module.scss'

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 14
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          borderRadius: 6,
          textTransform: 'initial',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.1s ease',

          '&:hover': {
            boxShadow: 'none'
          },
          contained: {
            '&:hover': {
              opacity: 0.8
            }
          },
          text: {
            '&:hover': {
              background: 'transparent',
              opacity: 0.6
            }
          },
          sizeSmall: {
            padding: '8px 16px'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    }
  }
})
