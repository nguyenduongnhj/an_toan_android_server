const router = require('express').Router();
const { getListServer } = require("../controller/server.controller")

router.post("/get_list", getListServer)

module.exports = router;