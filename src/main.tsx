
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CountersContextProvider } from './Contexts/CountersContext.tsx'

createRoot(document.getElementById('root')!).render(
  <CountersContextProvider>
    <App />
  </CountersContextProvider>,
)
