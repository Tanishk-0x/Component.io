import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MainContext from './Context/MainContext.tsx'
import AuthContext from './Context/AuthContext.tsx'
import OtpContext from './Context/OtpContext.tsx'
import CompContext from './Context/CompContext.tsx'
import PublishContext from './Context/PublishContext.tsx'
import AdminContext from './Context/AdminContext.tsx'
import PricingContext from './Context/PricingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainContext>
        <AuthContext>
          <OtpContext>
            <CompContext>
                <AdminContext>
                  <PublishContext>
                  <PricingContext>
                    <App />   
                  </PricingContext> 
                  </PublishContext>
                </AdminContext>   
            </CompContext>
          </OtpContext>
        </AuthContext>
    </MainContext>
  </StrictMode>,
)
