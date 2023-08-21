"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../controllers/user");
var router = express_1.default.Router();
router.post("/signup", user_1.signup);
router.post("/signin", user_1.signin);
// router.("/signout")
// router.("/resetpassword")
exports.default = router;
