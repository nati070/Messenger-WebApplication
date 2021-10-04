const mongoose = require('mongoose')
exports.connect = ()=>{
    const DB_USER = 'nati070';
    const PASSWORD = encodeURIComponent('986532Nati'); 
    return mongoose.createConnection(`mongodb+srv://${DB_USER}:${PASSWORD}@chatapp.t2h9v.mongodb.net/ChatsDB?retryWrites=true&w=majority'` , { useFindAndModify: false })
}
console.log('Connect to ChatsDB')