const request = require("request")
const { UserModel } = require("../models/UserModel")
const bcrypt = require("bcrypt");
const saltRounds = 10;

const onLogin = async (email, password) => {
    let user = await UserModel.findOne({ email: email }).lean();
    if (bcrypt.compareSync(password, user.password)) {
        return user
    }
    return null
}

const register = async (email, password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    let user = new UserModel({
        name: email,
        email: email,
        password: hash,
        is_deleted: 0
    })
    return await user.save();
}


module.exports = {
    onLogin,
    register,
}