const userRouter = require("./user.router");
const countryRouter = require("./country.router");
const middlewareRouter = require("./middleware.router");

function Routes(app) {
    app.use("/v1/auth", userRouter);
    app.use("/v1/country", countryRouter);
    app.use("/v1/vpn", middlewareRouter)
}

module.exports = Routes;