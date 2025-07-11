"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Create CatchAsync Function
const CatchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};
exports.default = CatchAsync;
