const ecc256 = require('../utils/ecc256')
const { promisify } = require("util")
const fs = require('fs');
const crypto = require('crypto');
const ecKeyUtils = require('eckey-utils');
const { json } = require('express');
const { urlDecode } = require('ecc-crypto-helper/base64');

const readAsyc = promisify(fs.readFile)
const writeAsync = promisify(fs.writeFile)
const iv = '1234567881011121';
let BEGIN_PKEY = "-----BEGIN PUBLIC KEY-----\n"
let END_PKEY = "\n-----END PUBLIC KEY-----"

var serverKey = null

const generatorKey = async () => {
    var eccPrivateEy = await readAsyc("./ec_private_key.key", "utf8")

    return ecKeyUtils.parsePem(eccPrivateEy.trim())
}

const setupKey = async () => {
    serverKey = await generatorKey()
}

const getServerPublicKey = async () => {
    let result = ecKeyUtils.generatePem(serverKey)
    return result.publicKey
}

const testEcc = async () => {

    var eccPubKey = await readAsyc("./demo_public_key.key", "utf8")
    var eccPrivateEy = await readAsyc("./ec_private_key.key", "utf8")

    /*const pems = await ecc256.generatePemKeyPair()
    expect(decoded.payload.username).to.equal(claims.username)
    expect(verify).to.equal(true)
    debugJWT(`ES256 Web Token: ${webToken}`)*/


    var output = await ecc256.computeSecret(eccPrivateEy.trim(), eccPubKey.trim())
    console.log(output.toString("hex"))

    let output2 = await encryptData({
        params: eccPubKey,
        data: "1"
    });

    // let result = await  generatorKey();

    let output3 = await decryptData({
        params: eccPubKey,
        data: Buffer.from(output2, "base64")
    })
    console.log("ut : " + output3)
    console.log("u2 : " + output2)
}

const generateSeckey = async (private, public) => {
    var eccPubKey = public.trim()
    var eccPrivateEy = private

    if (typeof eccPrivateEy === 'string') {
        eccPrivateEy = eccPrivateEy.trim()
        var output = await ecc256.computeSecret(eccPrivateEy, eccPubKey)
        return output;
    }
    else {
        var output = await ecc256.computeSecretRaw(eccPrivateEy, eccPubKey)
        return output;
    }
}

const encryptData = async (pack, userSeckey = null) => {

    let eccPrivateKey = serverKey.privateKey

    let key = pack.params
    let data = pack.data
    let seckey = userSeckey
    if (userSeckey == null) {
        seckey = await generateSeckey(eccPrivateKey, key)
    }

    let output = await aesEncrypt(data, seckey, iv)
    return output.toString("base64")
}

const decryptData = async (pack, userSeckey = null) => {
    let eccPrivateKey = serverKey.privateKey

    let key = pack.params
    let data = pack.data

    let seckey = userSeckey
    if (userSeckey == null) {
        seckey = await generateSeckey(eccPrivateKey, key)
    }

    let output = await aesDecrypt(data, seckey, iv)
    return output.toString()
}

const aesEncrypt = async (data, password, initIV) => {
    var algorithm = 'aes-256-cbc';
    var iv = new Buffer(initIV);   //(null) iv 
    var buffer = data
    var cipher = crypto.createCipheriv(algorithm, password, iv)
    cipher.setAutoPadding(true)
    var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return crypted;
}

const aesDecrypt = async (data, password, initIV) => {
    var algorithm = 'aes-256-cbc';
    var iv = new Buffer(initIV);
    var buffer = data
    var cipher = crypto.createDecipheriv(algorithm, password, iv)
    cipher.setAutoPadding(true)
    var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return crypted;
}

const main = async () => {
    await setupKey()
    //   await testEcc()
    //  let result = await getServerPublicKey();
    //  console.log(result)
}

main()

const eccMiddleware = async (req, res, next) => {
    const { params, data } = req.body;

    if (params == null) {
        next()
        return
    }


    res.ecc = async (data) => {

        let output = await encryptData({
            params: BEGIN_PKEY + params + END_PKEY,
            data: JSON.stringify(data)
        })

        return res.json({
            params: (await getServerPublicKey()).replace(BEGIN_PKEY, "").replace(END_PKEY, ""),
            data: output
        })
    }

    try {
        if (data != null && data != "") {

            let output = await decryptData({
                params: BEGIN_PKEY + params + END_PKEY,
                data: Buffer.from(data, 'base64')
            })
            console.log("PARAM: ", output)

            req.body = JSON.parse(output)
        }

        next()
    } catch (e) {
        console.log(e)
        next()
        return
    }

}



module.exports = {
    eccMiddleware
}