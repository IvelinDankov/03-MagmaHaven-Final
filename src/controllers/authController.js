import { Router } from "express";

const router = Router();

/* ######################
REGISTER
######################### */
router.get('/register', (req, res) => {
   res.render('auth/register', {tittle: "Register Page"})
});

export default router;