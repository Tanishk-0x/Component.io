import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MainContext from './Context/MainContext.tsx'
import AuthContext from './Context/AuthContext.tsx'
import OtpContext from './Context/OtpContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainContext>
        <AuthContext>
          <OtpContext>
            <App />
          </OtpContext>
        </AuthContext>
    </MainContext>
  </StrictMode>,
)
