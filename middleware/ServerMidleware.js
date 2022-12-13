
const { getToken } = require("../controller/authen.controller")
const request = require("async-request")
const { successResponse, errorResponse } = require("../services/response.service")
const { requestData, requestQueryData } = require("../utils/requestServer")
const e = require("cors")

const requestCert = async (req, res) => {
    const { proto, dev, type, cybersec, tech, idServer } = req.body

    try {
        let token = await getToken()
        console.log("TOKEN:", token)
        let body = {
            proto: proto,
            dev: dev,
            isHop: 0,
            tech: tech,
            cybersec: cybersec
        }
        if (type == "country") {
            body["countryId"] = idServer
        } else if (type == "server") {
            body["serverId"] = idServer
        } else {
            body["cityId"] = idServer
        }
        let data = await requestQueryData("https://api.sysvpnconnect.com/app/module_server/v1/vpn/request_certificate", body, "GET", token)
        console.log("DATA:", data)
        return res.json(successResponse(data))
    } catch (e) {
        return res.json(errorResponse())
    }

}

module.exports = {
    requestCert
}