const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("DataBase Connection SuccessFully")})
    .catch((error)=>{
        console.log("database Connection Failed");
        console.log('Error',error);
        process.exit(1); 
    })
}