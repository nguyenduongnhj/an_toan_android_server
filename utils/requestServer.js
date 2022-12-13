const request = require("async-request")

const requestData = async (url, body, method = "POST", token = null) => {
    try {
        let header = {
            "Content-Type": 'application/x-www-form-urlencoded',
            "x-device-info": JSON.stringify({ "isActive": 1, "userCountryCode": "VN", "userCountryName": "Viet Nam", "userCity": "Ha Noi", "userIp": "14.226.14.242" })
        }
        if (token != null) {
            header["authorization"] = "Bearer " + token
        }
        let response = await request(url, {
            method: method,
            data: body,
            headers: header,
        })


        let result = JSON.parse(response.body)
        if (result.success) {
            return result.result
        }
        return null
    } catch (e) {
        return null
    }
}

const requestQueryData = async (url, body, method = "POST", token = null) => {
    try {
        let header = {
            "Content-Type": 'application/x-www-form-urlencoded',
            "x-device-info": JSON.stringify({ "deviceId": "device_id_1_7", "isActive": 1, "userCountryCode": "VN", "userCountryName": "Viet Nam", "userCity": "Ha Noi", "userIp": "14.226.14.242" })
        }
        if (token != null) {
            header["authorization"] = "Bearer " + token
        }
        var url2 = url
        let index = 0
        for (var item in body) {

            url2 += (index == 0 ? "?" : "&") + item + "=" + body[item]
            index++
        }

        console.log(url2)

        let response = await request(url2, {
            method: method,
            data: null,
            headers: header,
        })

        let result = JSON.parse(response.body)
        console.log("RESULT:", result)

        if (result.success) {
            return result.result
        }
        return null
    } catch (e) {
        return null
    }
}

module.exports = {
    requestData,
    requestQueryData
}