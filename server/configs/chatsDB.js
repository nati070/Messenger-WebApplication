const mongoose = require('mongoose')
exports.connect = ()=>{
    return mongoose.createConnection('mongodb://localhost:27017/ChatsDB' , { useFindAndModify: false })
}
console.log('Connect to ChatsDB')