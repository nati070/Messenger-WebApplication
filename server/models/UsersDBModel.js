const mongoose = require('mongoose')
const Schema = mongoose.Schema
const conn = require('../configs/usersDB').connect()



const userSchema = Schema({
    firstname : String , 
    lastname : String , 
    password : String,
    email : String,
    username : String,
    
})

module.exports = conn.model('users' , userSchema)
