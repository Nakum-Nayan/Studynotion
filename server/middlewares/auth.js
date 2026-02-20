const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req,res,next) => {
    try
    {
        const token = req.body.token 
                        || req.cookies.token 
                        || req.header("Authorisation").replace("Bearer ","")   
        
        if(!token){
            return res.status(500).json({
                success : false,
                massage :'Token, Enter The Value'
            });
        }
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            console.log("error :",error)
            return res.status(500).json({
                success : false,
                massage :'Token is Not a Valid'
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success : false,
            massage :'Something Went Wrong while validating the token',
        });
    }
}

exports.isStudent = (req,res,next) =>{
    try{
        if(req.user.accountType !== 'Student'){
            return res.status(400).json({
                success : false,
                massage :'This is Protext Route for Student only',
           });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success : false,
            massage :'User cannot be Varified ,please try again'
        });
    }
}

exports.isInstructor = (req,res,next) =>{
    try{
        if(req.user.accountType !== 'Instructor'){
            return res.status(400).json({
                success : false,
                massage :'This is Protext Route for Instructor only',
           });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success : false,
            massage :'User cannot be Varified ,please try again'
        });
    }
}

exports.isAdmin = (req,res,next) =>{
    try{            
        if(req.user.accountType !== 'Admin'){
            return res.status(400).json({
                success : false,
                massage :'This is Protext Route for Admin only',
           });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success : false,
            massage :'User cannot be Varified ,please try again'
        });
    }
}