import RenderSteps from "./RenderSteps";


export default function AddCourse(){
    return(
        <>
            <div className="text-white flex flex-row gap-10">
                <div className="md:w-[80%] w-full flex flex-col gap-4 mx-4">
                    <h1 className="text-2xl">Add Course</h1>
                    <div>
                        <RenderSteps />
                    </div>
                </div>
                <div className="text-xs h-fit md:block hidden bg-richblack-800 px-7 py-5 rounded-md">
                    <p className="text-lg py-1">Code Uplode Tips</p> 
                    <ul className="list-disc">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024×576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify students of important updates.</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>       
                </div>
            </div>
        </>
    )
}