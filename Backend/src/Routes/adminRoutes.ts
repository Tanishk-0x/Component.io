import express from 'express' ;
import GetAdminData from '../Controllers/Admin';
const router = express.Router(); 

router.get('/getadmindata' , GetAdminData); 

export default router ; 
