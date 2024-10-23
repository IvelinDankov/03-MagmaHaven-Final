import { Router } from 'express';
import homeController from './controllers/homeController.js';
const router = Router()

router.use('/', homeController);
router.use('*', (req, res) => {
    res.render("home/404", { title: "404 Page" });
})

export default router