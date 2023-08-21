"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Projects_1 = require("../controllers/Projects");
var user_1 = require("../controllers/user");
var router = (0, express_1.Router)();
// router.get("/", isAuthanticated, getProjectsList);
router.get("/getAll", user_1.isAuthanticated, Projects_1.listAllProjects);
router.get("/getOne/:projectid", user_1.isAuthanticated, Projects_1.getProjectById);
router.post("/createOne", user_1.isAuthanticated, Projects_1.createOneProject);
router.put("/updateOne/code/:projectid", user_1.isAuthanticated, Projects_1.updateOneCode);
// router.put("/updateOne/info/:projectid",isAuthanticated)
router.delete("/deleteOne/:id", user_1.isAuthanticated, Projects_1.deleteOneProject);
exports.default = router;
