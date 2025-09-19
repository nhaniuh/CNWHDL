const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    gender: {type: String, required: true},
    role:{type: String, enum:['user','admin'],default: "user"},
    cart:{type:Array},
    orders:{type:Array}
},{timestamps:true})

const User = mongoose.model('user',userSchema)

const bookSchema = new mongoose.Schema({
    name:{type: String, required: true},
    author:{type: String, required: true},
    price:{type: String, required: true},
    description:{type: String, required: true},
    img:{type:String, required: true}
})
const Book = mongoose.model('book',bookSchema)
module.exports = {User, Book}