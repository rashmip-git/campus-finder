import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import ItemContextProvider from './Context/ItemContext'


createRoot(document.getElementById('root')).render(
   
    //<ItemContextProvider>

        <StrictMode>
    <App />
  </StrictMode>
    //</ItemContextProvider>
 
);
