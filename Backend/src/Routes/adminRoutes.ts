import express from 'express' ;
import GetAdminDashboardData from '../Controllers/Admin';
const router = express.Router(); 

router.get('/getadmindata' , GetAdminDashboardData); 

export default router ; 
