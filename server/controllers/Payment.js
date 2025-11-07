const mongoose = require("mongoose");
const  { instance } = require("../config/razorpay");
const Course = require("../model/Course");
const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../model/CourseProgress");

exports.capturePayment = async (req,res) =>{
    
        const { courseId } = req.body
        const { courses } = req.body
        const  userId  = req.user.id

        if(!courses ){
            return res.json({
                success:false,
                message:'Course Id Not Found'
            })
        }
    
        let course;
        try{
               course = await Course.findById(courses)
                if(!course){
                    return res.json({
                        success:false,
                        message:'Not Course Existing'
                    })
                }
                const uid = new mongoose.Types.ObjectId(userId)
                if(course.studentsEnrolled.includes(uid)){
                    return res.status(200).json({
                        success:true,
                        message:'User To AllReady Existing'
                    })  
                }
                
        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
        let amount = course.price;
        let currency = "INR";
        const options = {
            amount : amount * 100,
            currency,
             receipt: Math.random(Date.now()).toString(),
            notes:{
                courses:courses,
                userId
            }
        };
       
    try{
        const paymentResponse = await instance.orders.create(options);
        console.log("Payment Responce Data: ",paymentResponse)
        
        return res.status(200).json({
                success:true,
                data : paymentResponse,
                key_id : process.env.RAZORPAY_KEY
        });
    }
    catch(error){
      console.log("Erorr ro find",error);
         res.status(500).json({
            success:false,
            message:'Payment Not SuccessFully'
        })
    }
}

exports.verifySignature = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")

    console.log("expresred sigmnuter L; : a",expectedSignature);

    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courses, userId, res)
      return res.status(200).json({ success: true, message: "Payment Verified" })
    }

    return res.status(200).json({ success: false, message: "Payment Failed" })
  }
   

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id
 

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      )
 
      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [], 
      })
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}

