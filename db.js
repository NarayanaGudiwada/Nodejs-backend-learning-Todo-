const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String
}, {timestamps: true})

const Todo = new Schema({
    title: String,
    done: {
        type: Boolean,
        default: false
    },
    tobeDoneBy : Date,
    userId:{
        type: ObjectId,
        ref: 'Users'
    } 
}, {timestamps: true})

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('Todos', Todo);

module.exports = {
    UserModel,
    TodoModel
}