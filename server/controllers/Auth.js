const User = require("../model/User");
const OTP = require("../model/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs")
const Profile = require("../model/Profile")
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate")
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
dotenv.config()
const  JWT_SECRET  = process.env.JWT_SECRET; 
const secretKeyDB = process.env.secretKey;

exports.sendOTP = async (req,res)=>{
    try{

        const {email} = req.body;
        const checkUserPresent = await User.findOne({email}); 
        
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'User allready registered'
            });
        }

        let otp;
        let result;

        do {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp });
        } while (result);

        const otpPayload = {email,otp};

        const otpBody = await OTP.create(otpPayload);
        console.log("OTP BODY :",otpBody);

        res.status(200).json({
            success:true,
            message:'OTP Successfully Generate'
        })
    }
    catch(error){
        console.log("error to OTP Generate : ",error)
    }
}   

exports.signup = async (req,res) => {
   try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            secretkey,
            accountType,
            contactNumber,  
            otp 
        } = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message: "Please provide all required fields."
            })
        }
        console.log("data :",secretkey);

          if(accountType == "Instructor"){
            if(secretKeyDB != secretkey){
                return res.status(500).json({
                    success:false,
                    message:"Secret Key Is Not Match"
                })
            }
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password To Dose Not Match, Please try again!"
            })
        }
 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(402).json({
                success:false,
                message:"User is Already registered"
            })
        }

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1); 
        console.log("REsPONCEE OTP :",recentOtp)
   
        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP Not Found"
            });
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        const preofineDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            password : hashPassword,
            accountType,
            additionalDetails:preofineDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?send=${firstName} ${lastName}`
        })
        
        return  res.status(200).json({
            success:true,
            data:user,
            message:"User is Registered Successfully"
        })
    }
   catch(error){
        console.log("Error To SignUp : ",error);
        return res.status(500).json({
            success:false,
            message:"User Can Not SignUp in Successfully"
        })
   }
}


exports.login = async (req,res)=>{
    try
    {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill The Details In Proper"
            });
        }
        let user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not registered, Sing Up In user"
            })
        }
        const payload = {
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }
    
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(payload, 
                                    JWT_SECRET, 
                                    { expiresIn: "2h" });

            user = user.toObject();
            user.token = token; 
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
                httpOnly: true,
            };

            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Successfully Logged In",
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Wrong Password",
            });
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:`Error To Log ${error}`
        })
    }
}

exports.changePassword = async (req, res) => {
    try {
      const userDetails = await User.findById(req.user.id)
  
      const { currentPassword, newPassword } = req.body
      console.log("asda:",currentPassword)
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        userDetails.password
      )
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
  
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
  
      try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          "Password for your account has been updated",
          passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
        )
        console.log("Email sent successfully:", emailResponse.response)
      } catch (error) {
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }
  
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
}