const express = require("express");
const {authRouter} = require("./auth");
const {AuthMiddleware} = require("./auth.middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/", AuthMiddleware, (req, res, next) => {
    res.send("Hello Guys!");
});
app.use("/auth", authRouter);
app.use((req, res, next) => {
    return res.status(404).json({
        message: "not-found url"
    });
});
app.use((err, req, res, next) => {
    console.log(err);

    let status = err?.status ?? 500;
    let message = err?.message ?? "internal server error";
    return res.status(status).json({
        message
    });
});
app.listen(3500, () => {
    console.log("run: http://localhost:3500");
});