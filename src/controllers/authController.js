import { Router } from "express";
import authService from "../services/authService.js";

const router = Router();

/* ######################
REGISTER
######################### */
router.get("/register", (req, res) => {
  res.render("auth/register", { tittle: "Register Page" });
});

router.post("/register", async (req, res) => {
  const { username, email, password, rePass } = req.body;

  // TODO: pass=rePass

  try {
    await authService.register(username, email, password);
    res.redirect("/auth/login");
  } catch (err) {
      console.log(err.message);
      
    // TODO: Error
    res.render("auth/register", { tittle: "Register Page", username, email });
  }
});

export default router;
