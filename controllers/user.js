"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthanticated = exports.signout = exports.signin = exports.signup = void 0;
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var prisma_1 = require("../prisma");
/* UserSignup */
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, hash, user, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hash = _b.sent();
                return [4 /*yield*/, prisma_1.default.user.create({
                        data: {
                            email: email,
                            password: hash,
                        },
                    })];
            case 3:
                user = _b.sent();
                return [2 /*return*/, res.status(200).json({ user: user })];
            case 4:
                e_1 = _b.sent();
                /* code: P2002 is when field is unique
                and you try to put same thing in it */
                if (e_1.code === "P2002")
                    return [2 /*return*/, res
                            .status(400)
                            .json({ error: e_1, message: "account with email allready exist" })];
                // Default response for error
                return [2 /*return*/, res.status(400).json({
                        error: e_1,
                        message: "Coud not create user,error code ".concat(e_1.code),
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
/* User Sign in */
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, token, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1.default.user.findFirst({
                        where: {
                            email: email,
                        },
                    })];
            case 2:
                user = _b.sent();
                // there is no user with email
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: "User with email doesnot exist" })];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 3:
                // Comparing password
                if (!(_b.sent()))
                    res.status(400).json({ message: "email and password do not match" });
                token = jsonwebtoken_1.default.sign({ id: user.id }, "saket", {
                    expiresIn: "24h",
                });
                res.cookie("token", token, {
                    expires: new Date(1000 * 60 * 60 * 24 + Date.now()),
                });
                return [2 /*return*/, res.status(200).json({
                        id: user.id,
                        token: token,
                    })];
            case 4:
                e_2 = _b.sent();
                res.status(400).json({ error: e_2, message: "cant find user in database" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
exports.signout = {};
/* MIDDLEWARE */
var isAuthanticated = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bearerToken;
    return __generator(this, function (_a) {
        bearerToken = req.cookies;
        if (!bearerToken["token"]) {
            return [2 /*return*/, res.status(400).json({
                    message: "Token not available , pleas login again",
                    bearerToken: bearerToken,
                })];
        }
        try {
            req.auth = jsonwebtoken_1.default.verify(bearerToken["token"], "saket");
            next();
        }
        catch (e) {
            return [2 /*return*/, res.status(400).json({ message: e.message })];
        }
        return [2 /*return*/];
    });
}); };
exports.isAuthanticated = isAuthanticated;
