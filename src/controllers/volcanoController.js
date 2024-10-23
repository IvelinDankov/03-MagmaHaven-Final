import { Router } from "express";
import volcanoService from "../services/volcanoService.js";


const router = Router();

router.get('/create', (req, res) => {
   res.render('volcano/create', {title: ""})
});

router.post('/create',async(req, res) => {
   const volcanoData = req.body;
   const userId = req.user._id;

   const volcano = await volcanoService.create(volcanoData, userId);
   
   
   res.redirect('/volcano')
});

export default router;
