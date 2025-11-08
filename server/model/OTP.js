const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
   email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },  
    createdAt:{
        type:Date,
        default:Date.now,
        expires: 300
    }
});

async function sendVerificationEmail(email,otp){
    try{
        let mailResponse = await mailSender(email,"Verification Email",emailTemplate(otp));
        console.log("Email Send Successfully",mailResponse.response);
    }catch(error){
        console.log("error occured while sending email",error);
    }
}

otpSchema.pre("save", async function (next){
    await sendVerificationEmail(this.email,this.otp);
    next(); 
})

module.exports = mongoose.model("OTP", otpSchema);


