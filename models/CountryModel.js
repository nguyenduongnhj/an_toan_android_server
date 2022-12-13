const { UUID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CountryCollecitonName = 'sys_country'

const CountrySchema = Schema({
    id: Number,
    name: String,
    iso2: String,
    iso3: String,
    region: String,
    subRegion: String,
    latitude: String,
    longitude: String,
    flag: String,
    x: Number,
    y: Number,
    city: {
        type: [{
            id: Number,
            countryId: Number,
            name: String,
            latitude: String,
            longitude: String,
            x: Number,
            y: Number
        }]
    }


}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: CountryCollecitonName });

module.exports = {
    CountryModel: mongoose.model(CountryCollecitonName, CountrySchema),
    CountryCollecitonName: CountryCollecitonName
}