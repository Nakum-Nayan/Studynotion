const mongoose = require("mongoose")
const User = require("../model/User")
const Profile = require("../model/Profile")
const Course = require("../model/Course");
const CourseProgress = require("../model/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.updateProfile = async (req,res) =>{
    try{
            const {dateOfBirth,about="",gender,contactNumber,firstName,lastName} =req.body
        
            const {id} = req.body
            console.log("sc:",dateOfBirth)
       
            if(!gender || !contactNumber || !id){
                return res.status(403).json({
                    success:false,
                    message:'File To Proper Fill'
                })
            } 
        
            const userDetails = await User.findById(id);
            const  profileId = await userDetails.additionalDetails
            const profileDetails = await Profile.findById(profileId)
    
                profileDetails.dateOfBirth=dateOfBirth;
                profileDetails.about=about;
                profileDetails.gender = gender;
                profileDetails.contactNumber = contactNumber;
                userDetails.firstName = firstName;
                userDetails.lastName = lastName;
            await profileDetails.save();
            await userDetails.save()
      
            return res.status(200).json({
                success:true,
                message:'Profile Update Succeesfylly '
            })
    }catch(error){
        console.log("error :::",error)
        return res.status(500).json({
            success:true,
            message:'Profile Not Create,',error
        })
    }
}

exports.deleteAccount = async (req,res)=>{
    try{
       
            const id = req.user.id;
  
            const userDetail = await User.findById({_id:id})
            if(!userDetail) {
                return res.status(400).json({
                    success:false,
                    message:'User Is Not Existeing'
                })
            }
            await Profile.findByIdAndDelete({_id:userDetail.additionalDetails});
            await User.findByIdAndDelete({_id:id})
        
        return res.status(200).json({
            success:true,
            message:'User Is Successfully Delete'
        })
    }catch(error){
        console.log("error :::",error)
        return res.status(500).json({
            success:false,
            message:'User Is Not A Delete',error
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
      const id = req.user.id
      const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
      console.log(userDetails)
      res.status(200).json({
        success: true,
        message: "User Data fetched successfully",
        data: userDetails,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        console.log(image);

        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        );

        res.send({
            success: true,
            message: "Image Updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[
                j
            ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
                totalDurationInSeconds
            )
            SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courses[i]._id,
            userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length

      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }
    if (!userDetails) {
        return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
        })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          price : course.price,
          courseDescription: course.courseDescription,
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error("dadaada",error)
      res.status(500).json(
        { 
            message: "Server Error" 
        })
    }
}