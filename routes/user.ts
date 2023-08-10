import express from "express";
import { isAuthanticated, signin, signup } from "../controllers/user";
const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);
// router.("/signout")
// router.("/resetpassword")

router.get("/test", isAuthanticated);

export default router;
