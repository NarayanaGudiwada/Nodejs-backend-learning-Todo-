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
})

const Todo = new Schema({
    title: String,
    done: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: () => { Math.floor(Date.now()/1000)}
    },
    tobeDoneBy : Number,
    userId: ObjectId
})

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('Todos', Todo);

module.exports = {
    UserModel,
    TodoModel
}