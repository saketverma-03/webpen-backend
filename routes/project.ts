import { Router } from "express";
import {
  createOneProject,
  deleteOneProject,
  getProjectById,
  listAllProjects,
  updateOneCode,
} from "../controllers/Projects";
import { isAuthanticated } from "../controllers/user";

const router = Router();

// router.get("/", isAuthanticated, getProjectsList);
router.get("/getAll", isAuthanticated, listAllProjects);
router.get("/getOne/:projectid", isAuthanticated, getProjectById);

router.post("/createOne", isAuthanticated, createOneProject);

router.put("/updateOne/code/:projectid", isAuthanticated, updateOneCode);
// router.put("/updateOne/info/:projectid",isAuthanticated)

router.delete("/deleteOne/:id", isAuthanticated, deleteOneProject);

export default router;
