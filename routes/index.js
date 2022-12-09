const userRouter = require("./user.router");

function Routes(app) {
    app.use("/v1/auth", userRouter);
}
module.exports = Routes;