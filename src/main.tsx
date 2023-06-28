import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, ColorMode, ColorModeScript, ThemeConfig, extendTheme } from '@chakra-ui/react'
import theme from './theme/theme.tsx'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

console.log(theme.config.initialColorMode)
{localStorage.setItem('chakra-ui-color-mode', theme.config.initialColorMode)}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId='17469560107-vh52b7titgb2uoef1b84ngp4q8d5d7cv.apps.googleusercontent.com'>
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>,
)
