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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_ts_1 = require("http-status-ts");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const user_model_1 = require("../User/user.model");
const auth_utils_1 = __importDefault(require("./auth.utils"));
const config_1 = __importDefault(require("../../config"));
const Login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.NOT_FOUND, 'No user found with this email');
    }
    const is_blocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (is_blocked) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.FORBIDDEN, 'User is blocked');
    }
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'Invalid password');
    }
    if (!user._id) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.INTERNAL_SERVER_ERROR, 'User ID is missing');
    }
    const jwtPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_access_token_expires_in);
    const refreshToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_refresh_token_secret, config_1.default.jwt_refresh_token_expires_in);
    return { accessToken, refreshToken };
});
const Register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.isUserExistByEmail(payload.email);
    if (isUserExists) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.CONFLICT, 'User already exists');
    }
    const user = yield user_model_1.User.create(Object.assign({}, payload));
    const jwtPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_access_token_expires_in);
    const refreshToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_refresh_token_secret, config_1.default.jwt_refresh_token_expires_in);
    return { accessToken, refreshToken };
});
const RefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = auth_utils_1.default.VerifyToken(refreshToken, config_1.default.jwt_refresh_token_secret);
    const user = yield user_model_1.User.findOne({ _id: decoded.id, is_blocked: false });
    if (!user) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.NOT_FOUND, 'No user found');
    }
    const jwtPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_access_token_expires_in);
    return { accessToken };
});
const AuthService = { Login, Register, RefreshToken };
exports.default = AuthService;
