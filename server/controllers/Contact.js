const Contact = require("../model/Contact")
const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.createContact = async (req,res) => {
    try{
        const { firstname,lastname,email,phonenumber,countrycode,message } = req.body;
    
        if(!firstname || !email || !phonenumber || !countrycode || !message){
            return res.status(400).json({
                success:false,
                message:"Fill The Detail All"
            })
        }   
        const emailRes = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(email, firstname, lastname, message, countrycode)
        )
        
        const createData = await Contact.create({
            firstname,
            lastname,
            email,
            countrycode,
            phonenumber,
            message
        })

        return res.status(200).json({
            success:true,
            message:"Data To Save Successfully"
        })
    }
    catch(error){
        console.log("error :  " , error)
        return res.status(500).json({
            success:false,
            message:"Data Not Save In Successfully",error
        })
    }
}
