const express = require('express')
const app = express()
const path = require('path')
const router = require('./src/router/useRouter')
const connect = require('./src/config/db')
const expressLayouts = require('express-ejs-layouts')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'src/view'))

// app.use(expressLayouts)\
app.use(express.static(path.join(__dirname,'src/public')))

app.use('/',router)

connect()

app.listen(3000,()=>{
    console.log('Đã chạy được cổng localhost://3000')
})