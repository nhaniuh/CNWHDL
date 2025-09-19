const {Book} = require('../model/userModel')

async function detail(req,res){
    try{
        const id = req.params.id
        const book = await Book.findOne({_id:id})
        res.render('detail',{book})
    }catch(err){
        res.status(500).send('Không lấy được dữ liệu của id sách')
    }
}
async function showBook(req,res){
    try{
        const books = await Book.find()
        res.json(books)
    }catch(err){
        res.status(500).send('Không thể nhận được dữ liệu getFetch showBook')
    }
}
async function dataBook(req,res) {
    try{
        const books = await Book.find()
        res.json(books)
    }catch(err){
        res.status(500).send('Không thể nhận được dữ liệu dataBook')
    }
}
async function personPayment(req,res){
    try{
        const {id,quantity} = req.query
        const book = await Book.findOne({_id:id.trim()})
        const total = parseFloat(quantity)*parseFloat(book.price.split(' ')[0])
        res.render('personPayment',{book,quantity,total:total.toLocaleString('de-DE')})
    }catch(err){
        res.status(500).send('Lỗi không thể lấy được book trong function personPayment',err)
    }
}
module.exports = {detail,showBook,dataBook,personPayment}