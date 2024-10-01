const jwt = require("jsonwebtoken");
const {TokensSecretKey} = require("./constant");
const usersModel = require("./db");
const createHttpError = require("http-errors");
function AuthMiddleware (req, res, next) {
    try {
        const {authorization} = req.headers;
        if (!authorization) throw new createHttpError(401, "login on your account again");
        const [bearer, token] = authorization?.split(" ") ?? [];
        if (bearer?.toLowerCase() === "bearer" && token) {
            const decodedData = jwt.verify(token, TokensSecretKey);
            req.user = usersModel.find(user => user.id === decodedData?.id);
            if (!req.user) throw new createHttpError(401, "login on your account again");
            return next();
        }
        throw new createHttpError(401, "login on your account again");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    AuthMiddleware
};