const request = require("async-request")

const requestData = async (url, body, method = "POST") => {
    try {
        let response = await request(url, {
            method: method,
            data: body,
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
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

module.exports = {
    requestData
}