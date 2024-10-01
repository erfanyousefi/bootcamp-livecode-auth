const {compareSync} = require("bcrypt");
const usersModel = require("./db");
const jwt = require("jsonwebtoken");
const {TokensSecretKey} = require("./constant");
const createHttpError = require("http-errors");
const router = require("express").Router();

router.post("/login", (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = usersModel.find(user => user.username === username);
        if (!user) throw new createHttpError(401, "username or password is incorrect");
        if (!compareSync(password, user.password)) {
            throw new createHttpError(401, "password or username is incorrect");
        }
        const token = jwt.sign({id: user.id}, TokensSecretKey, {
            expiresIn: "1d"
        });
        return res.json({
            message: "your loggedIn successfuly",
            token
        });
    } catch (error) {
        next(error);
    }
});
module.exports = {
    authRouter: router
};