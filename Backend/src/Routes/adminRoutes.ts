import express from 'express' ;
import Admin from '../Controllers/Admin';
import { AuthMe } from '../Middlewares/AuthMiddleware';
import { requireCSRF } from '../Middlewares/CsrfMiddleware';
import { CheckForAdmin } from '../Middlewares/AdminMiddleware';
const router = express.Router(); 

router.get('/getadmindata' , requireCSRF , AuthMe , CheckForAdmin , Admin.GetAdminDashboardData); 
router.post('/addcomponent', requireCSRF , AuthMe , CheckForAdmin , Admin.AddComponents); 
router.post('/deletecomponent/:id', requireCSRF , AuthMe , CheckForAdmin , Admin.DeleteComponent);
router.post('/updatecomponent/:id', requireCSRF , AuthMe , CheckForAdmin , Admin.UpdateComponent);
router.post('/deleteuser/:id', requireCSRF , AuthMe , CheckForAdmin , Admin.DeleteUser);

export default router ; 
