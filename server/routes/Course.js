const express = require("express") 
const router = express.Router()

const { 
    createCourse, 
    getAllCourse,
    getCourseDetails,
    editCourse,
    getFullCourseDetails,
    getInstructorCourses,
    deleteCourse
} = require("../controllers/Coures")

const {
        showAllCategory,
        createCategory,
        categoryPageDetails   
} = require("../controllers/Category")

const {
        createSection,
        updateSection,
        deleteSection
} = require("../controllers/Section")           

const {
        createSubSection,
        updateSubSection,
        deleteSubSection,
} = require("../controllers/SubSection")

const {
        createRating, 
        getAverageRating, 
        getAllRating,
} = require("../controllers/RatingAndReview")

const {
        updateCourseProgress,
} = require("../controllers/CourseProgress");

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/editCourse",auth,isInstructor,editCourse)
router.get("/getInstructorCourses",auth, isInstructor,getInstructorCourses)
router.post("/getFullCourseDetails",auth,getFullCourseDetails)
router.delete("/deleteCourse", deleteCourse)
router.post("/addSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection) 
router.post("/deleteSection", auth, isInstructor, deleteSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection) 
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection) 
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.get('/getAllCourses', auth, isStudent, getAllCourse); 
router.post('/getCourseDetails', getCourseDetails);  

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

router.post("/createCategory", auth,isInstructor,createCategory) 
router.get("/showAllCategories", showAllCategory)   
router.post("/getCategoryPageDetails", categoryPageDetails)

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)
    
module.exports = router      