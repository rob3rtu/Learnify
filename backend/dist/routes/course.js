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
var courseRouter = express_1.default.Router();
var prisma = new client_1.PrismaClient();
//get all courses
courseRouter.get("/all", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, courses, teacher, hisClassesIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                return [4 /*yield*/, prisma.class.findMany()];
            case 1:
                courses = _a.sent();
                if ((user === null || user === void 0 ? void 0 : user.role) !== "teacher")
                    return [2 /*return*/, res.json({
                            courses: courses,
                        })];
                return [4 /*yield*/, prisma.teacher.findFirst({
                        where: { userId: user.id },
                        include: { classTeachers: true },
                    })];
            case 2:
                teacher = _a.sent();
                hisClassesIds = teacher === null || teacher === void 0 ? void 0 : teacher.classTeachers.map(function (record) { return record.classId; });
                return [2 /*return*/, res.json({
                        courses: courses.filter(function (course) { return hisClassesIds === null || hisClassesIds === void 0 ? void 0 : hisClassesIds.includes(course.id); }),
                    })];
        }
    });
}); });
//create new course
courseRouter.post("/new", (0, rolePermission_1.default)(["admin"]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var course, createdCourse, newCourses, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                course = req.body.course;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma.class.create({ data: course })];
            case 2:
                createdCourse = _a.sent();
                return [4 /*yield*/, prisma.class.findMany()];
            case 3:
                newCourses = _a.sent();
                return [4 /*yield*/, prisma.forum.create({
                        data: {
                            classId: createdCourse.id,
                        },
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.json({ courses: newCourses })];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.sendStatus(500)];
            case 6: return [2 /*return*/];
        }
    });
}); });
//get course by id
courseRouter.post("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, course, posts, postsBySection, filteredPosts, searchedPosts, sortedPosts, paginatedPosts, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = req.body;
                user = req.user;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.class.findFirst({
                        where: { id: req.params.id },
                        include: {
                            posts: {
                                orderBy: { createdAt: "desc" },
                                include: {
                                    user: true,
                                    likes: true,
                                    comments: { include: { user: true } },
                                },
                            },
                        },
                    })];
            case 2:
                course = _b.sent();
                if (course === null) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                posts = course.posts;
                postsBySection = void 0, filteredPosts = void 0, searchedPosts = void 0, sortedPosts = void 0, paginatedPosts = void 0;
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
                switch (body.filterBy) {
                    case "myposts":
                        filteredPosts = postsBySection.filter(function (post) { return post.userId === (user === null || user === void 0 ? void 0 : user.id); });
                        break;
                    case "postsi'veliked":
                        filteredPosts = postsBySection.filter(function (post) {
                            var _a;
                            return post.likes.map(function (like) { return like.userId; }).includes((_a = user === null || user === void 0 ? void 0 : user.id) !== null && _a !== void 0 ? _a : "");
                        });
                        break;
                    default:
                        filteredPosts = postsBySection;
                        break;
                }
                if (body.search) {
                    searchedPosts = filteredPosts.filter(function (post) { var _a, _b, _c; return (_a = post.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes((_c = (_b = body.search) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : ""); });
                }
                else
                    searchedPosts = filteredPosts;
                switch (body.sortBy) {
                    case "newest":
                        sortedPosts = searchedPosts.sort(function (a, b) {
                            var aDate = new Date(a.createdAt);
                            var bDate = new Date(b.createdAt);
                            return aDate > bDate ? -1 : 1;
                        });
                        break;
                    case "oldest":
                        sortedPosts = searchedPosts.sort(function (a, b) {
                            var aDate = new Date(a.createdAt);
                            var bDate = new Date(b.createdAt);
                            return aDate < bDate ? -1 : 1;
                        });
                        break;
                    case "mostlikes":
                        sortedPosts = searchedPosts.sort(function (a, b) {
                            return b.likes.length - a.likes.length;
                        });
                        break;
                    case "leastlikes":
                        sortedPosts = searchedPosts.sort(function (a, b) {
                            return a.likes.length - b.likes.length;
                        });
                        break;
                    default:
                        sortedPosts = searchedPosts;
                        break;
                }
                paginatedPosts = sortedPosts.slice((_a = body.skip) !== null && _a !== void 0 ? _a : 0, body.skip ? body.skip + 10 : 10);
                if (body.skip)
                    return [2 /*return*/, res.json({ posts: paginatedPosts })];
                return [2 /*return*/, res.json(__assign(__assign({}, course), { posts: paginatedPosts }))];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.sendStatus(500)];
            case 4: return [2 /*return*/];
        }
    });
}); });
//get class teachers
courseRouter.get("/teachers/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var classId, classTeachers_1, allTeachers, restOfTeachers, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                classId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.classTeachers.findMany({
                        where: {
                            classId: classId,
                        },
                        include: {
                            teacher: { include: { user: true } },
                        },
                    })];
            case 2:
                classTeachers_1 = _a.sent();
                return [4 /*yield*/, prisma.teacher.findMany({
                        include: {
                            user: true,
                        },
                    })];
            case 3:
                allTeachers = _a.sent();
                restOfTeachers = allTeachers.filter(function (teacher) {
                    return !classTeachers_1.map(function (tch) { var _a; return (_a = tch.teacher) === null || _a === void 0 ? void 0 : _a.id; }).includes(teacher.id);
                });
                return [2 /*return*/, res.json({ classTeachers: classTeachers_1, restOfTeachers: restOfTeachers })];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.sendStatus(500)];
            case 5: return [2 /*return*/];
        }
    });
}); });
//add teacher to class
courseRouter.post("/teachers/new", (0, rolePermission_1.default)(["teacher", "admin"]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newTeacher, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newTeacher = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.classTeachers.create({ data: newTeacher })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.sendStatus(500)];
            case 4: return [2 /*return*/];
        }
    });
}); });
//delete teacher from class
courseRouter.delete("/teachers/delete/:id", (0, rolePermission_1.default)(["teacher", "admin"]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recordId, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                recordId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.classTeachers.delete({ where: { id: recordId } })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.sendStatus(500)];
            case 4: return [2 /*return*/];
        }
    });
}); });
//delete class
courseRouter.delete("/delete/:id", (0, rolePermission_1.default)(["admin"]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.class.delete({ where: { id: id } })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                return [2 /*return*/, res.sendStatus(500)];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = courseRouter;
//# sourceMappingURL=course.js.map