import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import DataContext from './Context/DataProvider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
   <DataContext>
    <App />
    <Toaster></Toaster>
    </DataContext>
    </BrowserRouter>
 
)
