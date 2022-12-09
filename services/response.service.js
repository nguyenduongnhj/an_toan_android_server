
const successResponse = (data, message = "success") => {
    return {
        error: false,
        message: message,
        result: data
    }
}

const errorResponse = (message = "error", data = null) => {
    return {
        error: true,
        message: message,
        result: data
    }
}

const basicResponse = (data, message, error) => {
    return {
        error: error,
        message: message,
        result: data
    }
}

module.exports = {
    basicResponse,
    errorResponse,
    successResponse
}