const ecc256 = require('../utils/ecc256')

const testEcc = async () => {
    const pems = await ecc256.generatePemKeyPair()

    expect(decoded.payload.username).to.equal(claims.username)
    expect(verify).to.equal(true)
    debugJWT(`ES256 Web Token: ${webToken}`)
}




module.exports = {
    testEcc
}