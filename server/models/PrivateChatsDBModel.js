const mongoose = require('mongoose')
const Schema = mongoose.Schema
const conn = require('../configs/chatsDB').connect()

const chatsSchema = Schema({
    name : String , 
    participates : Array,
    conversation : [{send : String , msg: String , isRead : Boolean}],
}) 
module.exports = conn.model('privatechats',chatsSchema)

