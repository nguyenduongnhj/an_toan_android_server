var https = require('https');
var http = require('http');
var path = require("path");
var cors = require('cors')
const fs = require(`fs`);
const express = require('express');
const Routes = require("./routes");
const ENV = require('./env');

const connectDB = require("./db")

const app = express();
const PORT = ENV.get("PORT", 3000);

var server = null;

connectDB()
if (process.env.HTTPS) {
    var options = {
        key: fs.readFileSync(process.env.SSLKEY),
        cert: fs.readFileSync(process.env.SSLCERT)
    };
    server = https.createServer(options, app)

} else {
    server = http.createServer(app);
}

app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


Routes(app);
/*
app.listen(PORT,function (){
    console.log(" server listening on port " + PORT);
});*/

server.setTimeout(300000)
setTimeout(() => {
    server.listen(PORT, () => {
        console.log(" server listening on port " + PORT);

    });

}, 3000)
module.exports = app;

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', function (err) {
        console.log('Caught exception: ' + err);
    })

