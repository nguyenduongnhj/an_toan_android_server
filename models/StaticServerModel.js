const { UUID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const StaticCollecitonName = 'sys_static_server'

const StaticSchema = Schema({
    serverId: Number,
    countryId: Number,
    countryName: String,
    iso2: String,
    iso3: String,
    latitude: String,
    longitude: String,
    flag: String,
    x: Number,
    y: Number,
    cityName: String,
    serverNumber: Number,
    currentLoad: Number
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: StaticCollecitonName });

module.exports = {
    StaticModel: mongoose.model(StaticCollecitonName, StaticSchema),
    StaticCollecitonName: StaticCollecitonName
}