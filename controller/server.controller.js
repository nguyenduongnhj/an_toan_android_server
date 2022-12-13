
const request = require("async-request")
const { successResponse, errorResponse } = require("../services/response.service")
const serverService = require("../services/server.service")


const getListServer = async (req, res) => {
    try {
        let listCountry = await serverService.getListCountry()
        console.log("SERVER: ", listCountry)
        let listStatic = await serverService.getListStaticServer()
        console.log("STATIC: ", listStatic)

        return res.json(
            successResponse({
                availableCountries: listCountry,
                staticServers: listStatic
            })
        )

    } catch (e) {
        console.log(e)
        res.json(errorResponse("GET_LIST_SERVER_FAIL"))
    }
}

module.exports = {
    getListServer
}