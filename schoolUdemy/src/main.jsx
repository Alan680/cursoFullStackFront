import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App.jsx';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'


const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)


//Como se que no rompí el browserRouter??
//ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
//    <BrowserRouter>
//     <App />
//    </BrowserRouter>
//  </React.StrictMode>,
//)
