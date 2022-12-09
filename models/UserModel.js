const { UUID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserCollecitonName = 'sys_user'
const UserSchema = Schema({
    avatar: String,
    email: {
        type: String,
        required: true,
    },
    name: String,
    password: String,
    is_deleted: Number

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = {
    UserModel: mongoose.model(UserCollecitonName, UserSchema),
    UserCollecitonName: UserCollecitonName
}