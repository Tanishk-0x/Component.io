import express from 'express' ;
import Admin from '../Controllers/Admin';
import { AuthMe } from '../Middlewares/AuthMiddleware';
import { requireCSRF } from '../Middlewares/CsrfMiddleware';
const router = express.Router(); 

router.get('/getadmindata' , Admin.GetAdminDashboardData); 
router.post('/addcomponent', requireCSRF , AuthMe , Admin.AddComponents); 
router.post('/deletecomponent/:id', requireCSRF , AuthMe , Admin.DeleteComponent);
router.post('/updatecomponent/:id', requireCSRF , AuthMe , Admin.UpdateComponent);

export default router ; 
