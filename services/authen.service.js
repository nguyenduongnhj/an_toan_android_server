const request = require("request")
const { UserModel } = require("../models/UserModel")
const bcrypt = require("bcrypt");
const saltRounds = 10;

const onLogin = async (email, password) => {
    console.log("login", email, password)
    let user = await UserModel.findOne({ email: email }).lean();
    console.log("USER: ", user)

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

const changePassword = async (email, oldPass, newPass) => {
    let user = await UserModel.findOne({ email: email }).lean();
    if (user != null && bcrypt.compareSync(oldPass, user.password)) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(newPass, salt);
        return await UserModel.updateOne({ email: email }, { password: hash }).exec()
    }
    return null
}


module.exports = {
    onLogin,
    register,
    changePassword
}