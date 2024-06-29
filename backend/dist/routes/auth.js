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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var mail_1 = __importDefault(require("@sendgrid/mail"));
var jsonwebtoken_1 = require("jsonwebtoken");
var authRouter = express_1.default.Router();
mail_1.default.setApiKey((_a = process.env.SENDGRID_API_KEY) !== null && _a !== void 0 ? _a : "");
var prisma = new client_1.PrismaClient();
var loginHtml = function (redirectUrl) {
    return "\n  <html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Register</title>\n  </head>\n  <body style=\"background-color: white\">\n    <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n      <tr>\n        <td align=\"center\" style=\"padding-top: 20px\">\n          <img\n            src=\"https://firebasestorage.googleapis.com/v0/b/licenta-fmi.appspot.com/o/diverse%2Flogo.png?alt=media&token=6fe3f1c4-1c28-40a7-880b-06aa2be6fdff\"\n            alt=\"logo\"\n            title=\"logo\"\n            style=\"display: block\"\n            width=\"362\"\n            height=\"88\"\n          />\n        </td>\n      </tr>\n      <tr>\n        <td align=\"center\" style=\"padding-top: 20px\">\n          <p style=\"margin-top: 40px; margin-bottom: 100px; font-size: 20px\">\n            Welcome! Now you can safely follow this\n            <span><a href=\"".concat(redirectUrl, "\">link</a></span> to enter the app.\n          </p>\n        </td>\n      </tr>\n      <tr>\n        <td align=\"center\" style=\"padding-top: 20px\">\n          <img\n            src=\"https://firebasestorage.googleapis.com/v0/b/licenta-fmi.appspot.com/o/diverse%2Fbottom.png?alt=media&token=1baffc8d-10ac-4bf7-8e16-3ac13b0c0198\"\n            alt=\"bottom\"\n            title=\"bottom\"\n            style=\"display: block\"\n            width=\"199\"\n            height=\"110\"\n          />\n        </td>\n      </tr>\n    </table>\n  </body>\n</html>\n\n");
};
authRouter.get("/verify-token/:token", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, user, fullUser, fullUser, token_1, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = req.params.token;
                user = (0, jsonwebtoken_1.decode)(token);
                if (user === null) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                if (!user.id) return [3 /*break*/, 2];
                return [4 /*yield*/, prisma.user.findFirst({ where: { id: user.id } })];
            case 1:
                fullUser = _b.sent();
                return [2 /*return*/, res.json({ fullUser: fullUser })];
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            //@ts-ignore
                            email: user.email,
                            //@ts-ignore
                            fullName: user.email.split("@")[0],
                            role: client_1.enum_Users_role.student,
                        },
                    })];
            case 3:
                fullUser = _b.sent();
                token_1 = (0, jsonwebtoken_1.sign)({
                    id: fullUser.id,
                    fullName: fullUser.fullName,
                    email: fullUser.email,
                    role: fullUser.role,
                    profileImage: fullUser.profileImage,
                }, (_a = process.env.JWT_KEY) !== null && _a !== void 0 ? _a : "", { expiresIn: "1h" });
                return [2 /*return*/, res.json({ fullUser: fullUser, token: token_1 })];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500)];
            case 5: return [2 /*return*/];
        }
    });
}); });
authRouter.post("/login/:email", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                email = req.params.email;
                if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
                    !email.endsWith("unibuc.ro")) {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid email address." })];
                }
                return [4 /*yield*/, prisma.user.findFirst({ where: { email: email } })];
            case 1:
                user = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                token = (0, jsonwebtoken_1.sign)(user === null
                    ? {
                        email: email,
                    }
                    : {
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        role: user.role,
                        profileImage: user.profileImage,
                    }, (_a = process.env.JWT_KEY) !== null && _a !== void 0 ? _a : "", { expiresIn: "1h" });
                return [4 /*yield*/, mail_1.default.send({
                        to: email,
                        from: (_b = process.env.SENDGRID_EMAIL) !== null && _b !== void 0 ? _b : "",
                        subject: "Log in to LERNIFY",
                        html: loginHtml("".concat(process.env.FRONTEND_HOST, "/confirm-email?token=").concat(token)),
                    })];
            case 3:
                _c.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _c.sent();
                return [2 /*return*/, res.status(500).json({ error: "Email not sent." })];
            case 5: return [2 /*return*/, res.sendStatus(200)];
        }
    });
}); });
exports.default = authRouter;
//# sourceMappingURL=auth.js.map