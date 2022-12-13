

const router = require('express').Router();
const { requestCert } = require("../middleware/ServerMidleware")
const { jwtMiddleWare } = require("../services/jwt.service")

router.post("/request_cert", requestCert)


module.exports = router;