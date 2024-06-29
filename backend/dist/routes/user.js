"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var express_1 = __importDefault(require("express"));
var rolePermission_1 = __importDefault(require("../middlewares/rolePermission"));
var userRouter = express_1.default.Router();
var prisma = new client_1.PrismaClient();
//get user's posts
userRouter.post("/posts", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, posts, postsBySection, searchedPosts, paginatedPosts, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.user;
                body = req.body;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.post.findMany({
                        where: { userId: user === null || user === void 0 ? void 0 : user.id },
                        orderBy: { createdAt: "desc" },
                        include: {
                            user: true,
                            likes: true,
                            comments: { include: { user: true } },
                        },
                    })];
            case 2:
                posts = _b.sent();
                postsBySection = void 0, searchedPosts = void 0;
                switch (body.section) {
                    case "materials":
                    case "courses":
                    case "seminars":
                    case "laboratory":
                        postsBySection = posts.filter(function (post) { return post.classSection === body.section; });
                        break;
                    default:
                        postsBySection = posts;
                        break;
                }
                if (body.search) {
                    searchedPosts = postsBySection.filter(function (post) { var _a, _b, _c; return (_a = post.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes((_c = (_b = body.search) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : ""); });
                }
                else
                    searchedPosts = postsBySection;
                paginatedPosts = searchedPosts.slice((_a = body.skip) !== null && _a !== void 0 ? _a : 0, body.skip ? body.skip + 10 : 10);
                return [2 /*return*/, res.json({ posts: paginatedPosts })];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.sendStatus(500)];
            case 4: return [2 /*return*/];
        }
    });
}); });
userRouter.put("/update-profile-image", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, imageUrl, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                imageUrl = req.body.url;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.update({
                        where: { id: user === null || user === void 0 ? void 0 : user.id },
                        data: { profileImage: imageUrl },
                    })];
            case 2:
                _a.sent();
                res.sendStatus(200);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.sendStatus(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//change a user's role
userRouter.put("/change-role/:role/:userId", (0, rolePermission_1.default)(["admin"]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newRole, oldUser, newUsersArray, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newRole = req.params.role;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, prisma.user.findFirst({
                        where: { id: req.params.userId },
                    })];
            case 2:
                oldUser = _a.sent();
                return [4 /*yield*/, prisma.user.update({
                        where: { id: req.params.userId },
                        data: { role: newRole },
                    })];
            case 3:
                _a.sent();
                if (!((oldUser === null || oldUser === void 0 ? void 0 : oldUser.role) === "teacher")) return [3 /*break*/, 5];
                return [4 /*yield*/, prisma.teacher.delete({ where: { userId: oldUser.id } })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!(newRole === "teacher")) return [3 /*break*/, 7];
                return [4 /*yield*/, prisma.teacher.create({ data: { userId: oldUser === null || oldUser === void 0 ? void 0 : oldUser.id } })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [4 /*yield*/, prisma.user.findMany()];
            case 8:
                newUsersArray = _a.sent();
                return [2 /*return*/, res.json(newUsersArray)];
            case 9:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.sendStatus(500)];
            case 10: return [2 /*return*/];
        }
    });
}); });
userRouter.post("/new", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, createdUser, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.body.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma.user.create({
                        data: __assign({ fullName: user.email.split("@")[0] }, user),
                    })];
            case 2:
                createdUser = _a.sent();
                if (!(user.role === "teacher")) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.teacher.create({
                        data: {
                            userId: createdUser.id,
                        },
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                res.sendStatus(200);
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                console.log(error_4);
                res.sendStatus(500);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
userRouter.get("/all", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.user.findMany()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.sendStatus(500)];
            case 3: return [2 /*return*/];
        }
    });
}); });
userRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userDetails, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findFirst({
                        where: { id: userId },
                        include: {
                            posts: { include: { user: true, likes: true, comments: true } },
                        },
                    })];
            case 2:
                userDetails = _a.sent();
                return [2 /*return*/, res.json(userDetails)];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                return [2 /*return*/, res.sendStatus(500)];
            case 4: return [2 /*return*/];
        }
    });
}); });
userRouter.delete("/delete/:id", (0, rolePermission_1.default)(["admin"]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.user.delete({ where: { id: req.params.id } })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                return [2 /*return*/, res.sendStatus(500)];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = userRouter;
//# sourceMappingURL=user.js.map