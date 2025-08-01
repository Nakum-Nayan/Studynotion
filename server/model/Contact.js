const mongooes = require("mongoose")

const contactSchema = new mongooes.Schema({
        firstname:{
            type:String,
            trim:true
        },
        lastname:{
            type:String,    
            trim:true
        },
        email:{
            type:String,
            trim:true
        },
        message:{
            type:String,
        },
        phonenumber:{
            type:Number,
        },
        countrycode:{
            type:Number,
        }
})

module.exports = mongooes.model("Contact",contactSchema)