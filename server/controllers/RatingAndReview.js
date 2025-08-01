const RatingAndReviews = require("../model/RatingAndRaview");
const Course = require("../model/Course");
const mongoose = require("mongoose");


exports.createRating = async (req,res) =>{
    try{
            const userId = req.user.id;
            const {rating,review,courseId} = req.body;
        
            const courseDetial = await Course.findOne({
                studentsEnrolled: { $elemMatch: { $eq: userId } }
            });

            if(!courseDetial){
                return res.status(403).json({
                    success:false,
                    message:'User Is Not A Enroll In Course',
                })
            }    
            const alreadyReviewed = await RatingAndReviews.findOne({
                user: userId,
                course: courseId,
            });
            if(alreadyReviewed){
                return res.status(403).json({
                    success:false,
                    message:'User Is Already Rating Or Review',
                })
            }
            const ratingAndReviews = await RatingAndReviews.create({
                                                rating,review,
                                                course:courseId,
                                                user:userId
            })
            const updatedCourseDetails =  await Course.findByIdAndUpdate({_id:courseId},
                                        {
                                            $push:{
                                                studentsEnrolled:ratingAndReviews._id,
                                            }
                                        },
                                        {new:true})
                // console.log(updatedCourseDetails)       
            return res.status(200).json({
                success:true,
                message:'Rating And Review Create Successfully',
                ratingAndReviews
            })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Rating And Review Not  Create Succesfully'
        })
    }
}

exports.getAverageRating = async (req,res) =>{
    try{
            const courseId = req.body.courseId;
            const result = await RatingAndReviews.aggregate([
                {
                    $match:{
                        course:new mongoose.Types.ObjectId(courseId)
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating : {$avg:"$rating"},
                    }
                }
            ])
            if(result.length > 0){
                return res.status(200).json({
                    success:true,
                    averageRating : result[0].averageRating
                })
            }
        return res.status(200).json({
            success:true,
            message :'Averagerating Is not a write',
            averageRating :0
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'AverageRating Is Not Succesfully'
        })
    }
}

exports.getAllRating = async (req,res) =>{
    try{
        const allReviews = await RatingAndReviews.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select :"firstName lastName email image"
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName"
                                            })
                                            .exec()
        return res.status(200).json({
            success:true,
            message:'All Rating is Existing',
            data:allReviews
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'GetAll Rating And Review  Is Not Succesfully'
        })
    }
}