import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import theme from './theme/theme.tsx'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './AuthProvider.tsx'

console.log(theme.config.initialColorMode)
{localStorage.setItem('chakra-ui-color-mode', theme.config.initialColorMode)}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId='17469560107-vh52b7titgb2uoef1b84ngp4q8d5d7cv.apps.googleusercontent.com'>
    <AuthProvider>
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App/>}/>
    </Routes>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
  </AuthProvider>
  </GoogleOAuthProvider>,
)
