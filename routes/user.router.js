

const router = require('express').Router();
const { onLogin, onRegister, getToken } = require("../controller/authen.controller")
const { jwtMiddleWare } = require("../services/jwt.service")

router.post("/login", onLogin)
router.post("/register", onRegister)

router.get("/test", getToken)

module.exports = router;