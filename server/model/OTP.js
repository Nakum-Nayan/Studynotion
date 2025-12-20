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
        expirer: 300
    }
});

async function sendVerificationEmail(email,otp){
    try{
        console.log("email :::::::",email,"otp::::::::::",otp);
        let mailResponse = await mailSender(email,"Verification Email",emailTemplate(otp));


        if (!mailResponse) {
            throw new Error("Mail sender returned no response");
        }


        console.log("Email Send Successfully",mailResponse.response);
        return true;
    }catch(error){                             
        console.log("error occured while sending email",error);
        return false;
    }
}

otpSchema.pre("save", async function (next){
    await sendVerificationEmail(this.email,this.otp);
    next(); 
})

module.exports = mongoose.model("OTP", otpSchema);


