

const router = require('express').Router();
const { onLogin, onRegister, getToken, onChangePassword } = require("../controller/authen.controller")
const { jwtMiddleWare } = require("../services/jwt.service")

router.post("/login", onLogin)
router.post("/register", onRegister)
router.post("/change_password", jwtMiddleWare, onChangePassword)

router.get("/test", getToken)

module.exports = router;