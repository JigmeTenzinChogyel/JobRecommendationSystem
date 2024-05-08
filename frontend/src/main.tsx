import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './shared/theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider 
      theme={theme}
      toastOptions={{ defaultOptions: { position: 'bottom-right', duration: 3000, isClosable: true } }}>        
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
