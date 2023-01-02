
const request = require("async-request")
const { successResponse, errorResponse } = require("../services/response.service")
const serverService = require("../services/server.service")


const getListServer = async (req, res) => {
    try {
        let listCountry = await serverService.getListCountry() 
        let listStatic = await serverService.getListStaticServer() 

        return res.ecc(
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