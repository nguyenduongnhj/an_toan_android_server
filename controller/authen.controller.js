
const { generateAccessToken, getRefreshToken, getAccessTokenPayload } = require("../services/jwt.service")
const request = require("async-request")
const { successResponse, errorResponse } = require("../services/response.service")
const authService = require("../services/authen.service")

const { requestData } = require("../utils/requestServer")

const onLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let data = await authService.onLogin(email, password)

        if (data != null) {

            const appAccessToken = generateAccessToken({ id: data._id, deviceId: data.email })
            const refreshToken = getRefreshToken(appAccessToken)

            return res.json(
                successResponse({
                    user: {
                        ...data,
                        id: data._id
                    },
                    tokens: {
                        access: {
                            token: appAccessToken
                        },
                        refresh: {
                            token: refreshToken
                        }
                    }
                })
            )
        }
        return res.json(errorResponse("error"))

    } catch (e) {
        console.log(e)
        res.json(errorResponse("error"))
    }
}

const onRegister = async (req, res) => {
    const { email, password } = req.body;

    try {
        let data = await authService.register(email, password)
        if (data != null) {
            return res.json(
                successResponse({
                    user: {
                        ...data._doc,
                        id: data._id
                    }
                })
            )
        }
        return res.json(errorResponse("User conflict"))

    } catch (e) {
        console.log("123" + e)
        res.json(errorResponse("User conflict"))
    }
}

const getToken = async () => {
    try {

        let email = "test@gmail.com"
        let password = "X12345678"
        let body = {
            email: email,
            password: password,
            deviceInfo:
                JSON.stringify({
                    userIp: "27.72.101.208",
                    userCity: "VN",
                    userCountryCode: "VN",
                    "deviceId": "device_id_1_2", "deviceOs": "Android", "appVersion": "1", "appBundleId": "com.ilg.sysvpn", "isEmulator": 0, "isTablet": 0
                })
        }

        let data = await requestData("https://api.sysvpnconnect.com/shared/module_auth/v1/login", body)
        let token = data.tokens.access.token
        return token
    } catch (e) {
        return null
    }
}

module.exports = {
    onLogin,
    onRegister,
    getToken
}