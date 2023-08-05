import express from "express";
import { signin, signup } from "../controllers/user";
const router = express.Router();

router.post("/signup", signup);

router.get("/signin", signin);
// router.("/signout")
// router.("/resetpassword")

export default router;
