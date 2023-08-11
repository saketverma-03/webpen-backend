import { Router } from "express";
import { createOneProject, getProjectsList } from "../controllers/Projects";
import { isAuthanticated } from "../controllers/user";

const router = Router();

// router.get("/", isAuthanticated, getProjectsList);
router.get("/:userId", isAuthanticated, getProjectsList);
router.post("/createOne", isAuthanticated, createOneProject);

export default router;
