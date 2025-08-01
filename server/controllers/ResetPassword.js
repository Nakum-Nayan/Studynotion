const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const crypto = require("crypto")

exports.resetPasswordToken = async (req,res) =>{
    try{
        const email = req.body.email;

        const user = await User.findOne({email:email});  

        if(!user){
            return res.status(400).json({
                success:false,
                massage:'email cannot registered with us'
            })
        }
        let token = crypto.randomUUID();
        const updateDetails = await User.findOneAndUpdate(
                                                        {email:email},
                                                        {
                                                            token:token,
                                                            resetPasswordExpires:Date.now() + 5*60*5000
                                                        },  
                                                        {new:true})

        let url = `http://localhost:3000/update-password/${token}`;
        await mailSender(email,'Password Reset link',`Your Link for email verification is ${url}. Please click this url to reset your password`)
       return res.status(200).json({
            success:true,
            massage:"email sent Successfully,please check email and change pwd"
       })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Valid To ResetpasseordToken To Erro'
        })
    }
}

exports.resetPassword = async (req,res) =>{
    try{
        const {password,confirmPassword,token} =req.body;
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password Not Match'
            })
        }

        if(!token){
            return res.status(400).json({
                success:false,
                message:'Token Not A Fetch In Franted'
            })
        }

        const userDatail = await User.findOne({token:token}); 
        if(!userDatail){
            return res.status(400).json({
                success:false,
                message:'token not a match'
            })
        }
        
        if(userDatail.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success:false,
                message:'TIme To Expired ,please regenret link'
            })
        }
        const hashPassword = await bcrypt.hash(password ,10)

        await User.findOneAndUpdate(
            {token:token},
            {password:hashPassword},
            {new:true},
        );
        return res.status(200).json({
            success:true,
            message:"Successfully Password To Reset"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Valid To Resetpasseord To Erro'
        })
    }
} 


