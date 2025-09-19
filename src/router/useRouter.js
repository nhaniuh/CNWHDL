const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userMiddleware = require('../middleware/userMiddleaware')
const bookController = require('../controller/bookController')
router.get('/',userController.home)

router.get('/login',userController.login)

router.get('/register',userController.register)
router.post('/register',userController.postRegister)
router.get('/checkEmail',userController.checkEmail)

router.get('/data',userController.data)
router.get('/getData',userController.getData)
router.delete('/removeData/:_id',userController.removeData)

router.post('/postLogin',userController.postLogin)
router.get('/checkLogin',userMiddleware.verify,userController.checkLogin)
router.get('/profile',userController.profile)
router.get('/getProfile/:_id',userController.getProfile)

router.get('/detail/:id',bookController.detail)
router.get('/showBook',bookController.showBook)
router.get('/dataBook',bookController.dataBook)

router.get('/cart',userController.getCard)
router.put('/addCart',userController.addCart)
router.delete('/removeCardBook',userController.removeCardBook)

router.get('/payment',userController.payment)
router.get('/person-Payment',bookController.personPayment)
router.post('/order',userController.order)
router.get('/order',userController.getOrder)
module.exports = router