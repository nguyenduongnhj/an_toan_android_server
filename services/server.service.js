const request = require("request")
const { CountryModel } = require("../models/CountryModel")
const { StaticModel } = require("../models/StaticServerModel")


const getListCountry = async () => {
    let country = await CountryModel.find().lean();
    return country
}

const getListStaticServer = async () => {
    let country = await StaticModel.find().lean();
    return country
}

module.exports = {
    getListCountry,
    getListStaticServer
}