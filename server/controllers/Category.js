const Category = require("../model/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
exports.createCategory = async(req,res)=>{
   try{
          const {name,description} = req.body;

          if(!name){
                return res.status(400).json({
                   success:false,
                   message:'All Fiend are Required'
               })
          }
        
          const  CategorysDetails = await Category.create({
                 name:name,
                 description:description   
          });
          // console.log(CategorysDetails);
   
          return res.status(200).json({
                success:true,
                message:"Categorys Create Successfully"
          })
   }
   catch(error){
    console.log("error:",error)
    return res.status(500).json({
        success:false,
        message:"create Category error:",error
    })
   }
}

exports.showAllCategory = async (req,res)=>{
   try{
        const categories = await Category.find({},{name:true, description:true,courses:true});
        return res.status(200).json({
            success:true,
            data:categories,
            message:'All Tags returned successfully'
        }) 
   } catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })  
   }
}

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
        console.log("data",categoryId)
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      console.log("SELECTED COURSE", selectedCategory)
     
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      console.log()
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate:{
            path:"instructor"
          }
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
  
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}
