module.exports = {

    urlEncode: (text) => {
        return new Promise((resolve, reject) => {
            let encoded

            if (Buffer.isBuffer(text)) {
                encoded = text.toString('base64')
            } else {
                encoded = Buffer.from(text, 'utf8').toString('base64')
            }

            encoded = encoded.replace('+', '-').replace('/', '_').replace(/=+$/, '')

            return resolve(encoded)
        })
    },

    urlDecode: (encodedText) => {
        return new Promise((resolve, reject) => {
            let encoded

            if (typeof encodedText === 'string') {
                encodedText += Array(5 - encodedText.length % 4).join('=')
                encoded = encodedText.replace('-', '+').replace('_', '/')

                return resolve(Buffer.from(encoded, 'base64'))
            } else {
                return reject(new TypeError(
                    `Cannot decode non-string value. Found '${typeof encodedText}'.`))
            }
        })
    }
}