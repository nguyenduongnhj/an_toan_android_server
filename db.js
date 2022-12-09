
require('dotenv').config();
const Env = require('./env')
const mongoose = require('mongoose');
const db = process.env.MONGO_URI;
const database = process.env.DBNAME;
var conn = null

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            dbName: database,
            // authSource: database,
            //  useNewUrlParser: true,
            //  useCreateIndex: true,
            // useFindAndModify: false,
            //  useUnifiedTopology: true
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;