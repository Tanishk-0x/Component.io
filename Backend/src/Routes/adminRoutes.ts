import express from 'express' ;
import Admin from '../Controllers/Admin';
import { AuthMe } from '../Middlewares/AuthMiddleware';
import { requireCSRF } from '../Middlewares/CsrfMiddleware';
const router = express.Router(); 

router.get('/getadmindata' , Admin.GetAdminDashboardData); 
router.post('/addcomponent', requireCSRF , AuthMe , Admin.AddComponents); 

export default router ; 
