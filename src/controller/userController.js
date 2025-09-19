const { User, Book } = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
function home(req, res) {
    res.render('home')
}
function login(req, res) {
    res.render('login')
}
function register(req, res) {
    res.render('register')
}
async function postRegister(req, res) {
    try {
        const { name, email, password, gender } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            gender: gender,
            role: 'user'
        })
        res.json({ message: true })
    } catch (err) {
        res.status(500).send("Không tạo được user trong postRegister")
    }
}
async function checkEmail(req, res) {
    try {
        const user = await User.find()
        res.json({ user })
    } catch (err) {
        res.status(500).send('Function checkEmail bị lỗi' + err)
    }
}
async function data(req, res) {
    res.render('data')
}
async function getData(req, res) {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(500).send('Không lấy được dữ liệu data : ' + err)
    }
}
async function removeData(req, res) {
    try {
        const id = req.params._id
        await User.findOneAndDelete({ _id: id })
        res.json({ message: true })
    } catch (err) {
        res.status(500).send('Không thể xóa data', +err)
    }
}
async function postLogin(req, res) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: false })
        }
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) {
            return res.json({ message: false })
        } else {
            const payload = { id: user._id, role: user.role }
            const token = jwt.sign(payload, '12345', { expiresIn: '1h' })
            return res.json({ message: true, token: token, id: user._id })
        }
    } catch (err) {
        res.status(500).send('Lỗi khôgn login được: postLogin:' + err)
    }
}
async function checkLogin(req, res) {
    if (!req.user) {
        return res.json(null)
    }
    try {
        const { id, role } = req.user
        const user = await User.findById({ _id: id })
        let cardBook = []
        let total = 0
        let total2 = 0
        if (user.cart.length > 0) {
            for (const element of user.cart) {
                const book = await Book.findById(element.id_book)
                const book2 = book.toObject()
                book2.price = parseFloat(book2.price.split(' ')[0])
                total = total + element.quantity * book2.price
                total2 = element.quantity + total2
                cardBook.push({ ...book.toObject(), quantity: element.quantity })
            }
        }
        if (!user) {
            return res.json({ status: false })
        }
        res.json({ status: true, user, book: cardBook, total, total2 })
    } catch (err) {
        res.status(500).send('Lỗi trong việc checkLogin' + err)
    }
}
async function profile(req, res) {
    res.render('infor')
}
async function getProfile(req, res) {
    try {
        const id = req.params._id
        const user = await User.find({ _id: id })
        res.json(user)
    } catch (err) {
        res.status(500).send('Không thể lấy được dữ liệu của getProfile' + err)
    }
}
function getCard(req, res) {
    res.render('card')
}
async function addCart(req, res) {
    try {
        const { id_book, id_user, quantity } = req.body
        const quty = parseInt(quantity, 10)
        const result = await User.updateOne({ _id: id_user, "cart.id_book": id_book.trim() }, { $inc: { 'cart.$.quantity': quty } })
        console.log(result.matchedCount)
        if (result.matchedCount === 0) {
            await User.updateOne({ _id: id_user }, { $push: { cart: { id_book: id_book.trim(), quantity: quty } } })
        }
        res.json({ message: true })
    } catch (err) {
        res.status(500).send('Lỗi không thể update giỏ hàng addCart', err)
    }
}
async function removeCardBook(req,res){
    try{
        const {id_book,id_user} = req.body
        const user = await User.updateOne({_id:id_user},{$pull: {cart: {id_book}}})
        if(user){
            return res.json({status:true})
        }
        return res.json({status:false})
    }catch(err){
        res.status(500).send('Lỗi không thể xóa book tại hàm removeCardBook',err)
    }
}
function payment(req, res) {
    res.render('payment')
}
async function order(req,res){
    try{
        const {id_book,name_book,payment,quantity,totalPrice,address,id_user,day} = req.body
        const user = await User.findById({_id:id_user})
        const book = await Book.findById({_id:id_book})
        const orderObject = user.orders.toObject()
        const order = {id_book,name_book,quantity,payment,totalPrice,address,day,img:book.img}
        orderObject.push(order)
        const user2 = await User.updateOne({_id:id_user},{$set:{orders:orderObject}})
        res.json({status:true})
    }catch(err){
        res.status(500).send('Lỗi',err)
    }
}
async function getOrder(req,res) {
    res.render('order')
}
module.exports = { home, login, register, postRegister, checkEmail, data, getData, removeData, postLogin, checkLogin, profile, getProfile, getCard, addCart, payment,removeCardBook,order,getOrder }