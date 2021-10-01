const mongoos = require("mongoose");

exports.connect = ()=>{
   return  mongoos.createConnection("mongodb://localhost:27017/UsersDB");
} 
console.log("Connect to UserDB");

