const nodemailer = require("nodemailer");

const mailSender = async (email,title,body) =>{
    try{
        let trascater = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await trascater.sendMail({
            from: `"StudyNotaion || CodeHelp - by nayan" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`   
        })
        console.log(info);
        return info;
    }
    catch(error) {
        console.log("error to otp zenret issu",error)
    }   
}

module.exports = mailSender;