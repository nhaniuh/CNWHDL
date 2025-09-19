const mongoose = require('mongoose')

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/Eighth_database')
        console.log('Connect Successful')
    }catch(err){
        console.log(err)
    }
} 

module.exports = connect