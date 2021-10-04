const mongoos = require("mongoose");

exports.connect = ()=>{
   const DB_USER = 'nati070';
   const PASSWORD = encodeURIComponent('986532Nati'); 
   return  mongoos.createConnection(`mongodb+srv://${DB_USER}:${PASSWORD}@chatapp.t2h9v.mongodb.net/UsersDB?retryWrites=true&w=majority`);
} 
console.log("Connect to UserDB");

