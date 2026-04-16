import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MainContext from './Context/MainContext.tsx'
import AuthContext from './Context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainContext>
        <AuthContext>
          <App />
        </AuthContext>
    </MainContext>
  </StrictMode>,
)
