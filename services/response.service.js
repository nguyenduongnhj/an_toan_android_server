
const successResponse = (data, message = "success") => {
    return {
        success: true,
        message: message,
        result: data
    }
}

const errorResponse = (message = "error", data = null) => {
    return {
        success: false,
        message: message,
        errors: data
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