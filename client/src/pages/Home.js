import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAbutton from "../components/core/HomePage/Button"
import homepage from "../assets/images/homepage.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Leadership from "../assets/images/image9.jpg"
import multipage from "../assets/images/image10.png"
import home from "../assets/images/home.png"
import { IoMdPeople } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useState } from "react";import { PiMedalLight } from "react-icons/pi";
import { RiGraduationCapFill } from "react-icons/ri";
import { IoDiamondSharp } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Footer from "../components/comman/Footer";

function Home (){
    const [activeTab, setActiveTab] = useState("Free");
    const tabs = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];
    return (
        <div>
                <div className="mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between"> 
                    <Link to={"/signup"}>
                        <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 
                            group-hover:bg-richblack-900">
                                <p>Become an Instructor</p>
                                <FaArrowRight />
                            </div>
                        </div>
                     </Link> 

                    <div className="text-center text-4xl font-semibold mt-7">
                        Empower Your Future with 
                        <HighlightText text={"Coding Skill"} />
                    </div> 
                    <div className="mt-4 w-[80%] text-center text-lg font-bold text-richblack-300">
                        With Over Online coding Course, youcan learn at your own pace, from anywhere in the world and get access to a wealth of resourse,includind hands-on project,quizzes,and personalization feedback from instructors.
                    </div>         
                    <div className="flex flex-row gap-7 mt-8">
                        <CTAbutton action={true} linkto={"/signup"}>
                            Learn More
                        </CTAbutton> 

                        <CTAbutton action={false} linkto={"/login"}>
                            Book a Demo
                        </CTAbutton>    
                    </div>
                    <div className="mx-3 my-14 border-r-[13px] border-b-[13px] border-white rounded-2xl drop-shadow-[-15px_-15px_30px_rgba(59,130,246,0.2)]">
                        <video muted loop autoPlay>
                            <source src={homepage} type="video/mp4"></source>
                        </video>
                    </div>
                    <div> 
                        <CodeBlocks
                            position={"flex-col md:flex-row"}
                            heading={
                                <div className="text-4xl font-semibold">
                                    Unlock Your 
                                    <HighlightText text={"Coding Potential "} />
                                    With Our Online Courses
                                </div>
                            }
                            subheadind={
                                "Our Courses are designed and taught by industry experst who have years of experienc in codeing and passionate about sharing their knowledge with you"
                            }
                            ctabtn1={
                                {
                                  btntext : "try it yourself",
                                  linkto : "/signup",
                                  action : true
                                }
                              }
                              ctabtn2={
                                {
                                  btntext : "Learn more",
                                  linkto : "/login",
                                  action : false
                                }
                              }

                              codeblock={`<!DOCTYPE html>
                                <html lang="en">
                                <head>
                                <title>Example</title>
                                <link rel="stylesheet" href="style.css">
                                </head>
                                <body>
                                <h1><a href="/">header</a>
                                </h1>
                                <nav><a href="one/">one</a>
                                </nav>
                                </body>
                                </html>`}
                                codeColor={"text-yellow-5"}
                        />
                    </div>
                    <div>
                        <CodeBlocks
                            position={"flex-col md:flex-row-reverse"}
                            heading={
                                <div className="text-4xl font-semibold">
                                    Start 
                                    <HighlightText text={"Coding in Seconds "} />
                                </div>
                            }
                            subheadind={
                                "Gp ahead, give it a try. our hands-on learing enviroment means you'll ne write real code from your very first lesson"
                            }
                            ctabtn1={
                                {
                                  btntext : "Continue Lesson    ",
                                  linkto : "/signup",
                                  action : true
                                }
                              }
                              ctabtn2={
                                {
                                  btntext : "Learn more",
                                  linkto : "/login",
                                  action : false
                                }
                              }

                              codeblock={`<!DOCTYPE html>
                                <html lang="en">
                                <head>
                                <title>Example</title>
                                <link rel="stylesheet" href="style.css">
                                </head>
                                <body>
                                <h1><a href="/">header</a>
                                </h1>
                                <nav><a href="one/">one</a>
                                </nav>
                                </body>
                                </html>`}
                                codeColor={"text-blue-25"}
                        />
                    </div>
                    <div className="mt-20">
                   
                            <div className="font-bold text-3xl">
                                Unlock the 
                                <HighlightText text={"Power of Code"} />
                            </div>
                            <div className="flex justify-center mt-2">
                                Learn to Build Anything You Can imagine
                            </div>
                    </div>
                    <div className="flex space-x-1 bg-richblack-800 my-5 text-[8px] lg:text-lg rounded-full w-fit justify-center items-center">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-4 py-2 rounded-full text-richblack-200 transition-all duration-300 ${
                                        activeTab === tab ? "bg-pure-greys-600" : "bg-pure-greys-900 hover:bg-gray-700"
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                    >
                                    {tab}
                                </button>
                            ))}
                    </div>
                    <div className="flex gap-5 justify-center flex-col lg:flex-row">
                        <div className="flex flex-col w-[100%] lg:w-[25%]  mt-8 bg-richblack-800 text-richblack-500">
                            <div className="my-5 mx-5">
                                <p className="font-semibold text-white">Learn HTML</p>
                                <p className="mt-3">This code cover to bacis concepts of HTML includind creating  and structuring web pages, adding text, links, image and more</p>
                            </div>
                            <div className="flex flex-row  justify-around mt-10">
                                <div className="flex felx-row gap-2 items-center">
                                    <span><IoMdPeople /></span>
                                    <p>Beginner</p>
                                </div>
                                <div className="flex felx-row gap-2 items-center">
                                    <span><MdOutlineManageAccounts /></span>
                                    <p>6 Lessons</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-[100%] lg:w-[25%] mt-8  bg-white text-richblack-500">
                            <div className="my-5 mx-5">
                                <p className="font-semibold text-black">Learn CSS</p>
                                <p className="mt-3">This code explore advanced topic in HTML5 and CSS3, includind animation, transition and layout techniques</p>
                            </div>
                            <div className="flex flex-row justify-around mt-10 ">
                                <div className="flex felx-row gap-2 items-center">
                                    <span><IoMdPeople /></span>
                                    <p>Beginner</p>
                                </div>
                                <div className="flex felx-row gap-2 items-center">
                                    <span><MdOutlineManageAccounts /></span>
                                    <p>6 Lessons</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-[100%] lg:w-[25%] mt-8 bg-richblack-800 text-richblack-500">
                            <div className="my-5 mx-5">
                                <p className="font-semibold text-white">Responsive Web design</p>
                                <p className="mt-3">This code teaches responsive web design techniques, allowing web pages to adable to different devices and screen sizes</p>
                            </div>
                            <div className="flex flex-row  justify-around mt-10">
                                <div className="flex felx-row gap-2 items-center">
                                    <span><IoMdPeople /></span>
                                    <p>Beginner</p>
                                </div>
                                <div className="flex felx-row gap-2 items-center">
                                    <span><MdOutlineManageAccounts /></span>
                                    <p> 6 Lessons</p>
                                </div>
                            </div>
                        </div>
                    </div>           
                </div>  
                <div className="bg-white w-full mt-8 py-5">
                        <div className="flex gap-5 flex-row justify-center mx-1 my-10">
                            <CTAbutton action={true} linkto={"/signup"}>
                                Explore Full Catalog
                            </CTAbutton>
                            <CTAbutton action={false} linkto={"/login"}>
                                Learn More
                            </CTAbutton>
                        </div>    
                        <div className="flex flex-col  md:flex-row md:items-start items-center justify-center gap-5 mt-16">
                            <div className="md:w-[30%] w-[70%]  md:text-3xl">
                                Get the Skill you need for a 
                                <HighlightText text={"job that is in demand."} />
                            </div>
                            <div className="md:w-[30%] w-[70%]">
                               <div className="text-sm">
                                    THe mordern StudyNotion the dictates its own terms. Today to be a competitive specialist requires more than Professionalskills.
                               </div>
                               <div className="w-fit mt-10"> 
                                    <CTAbutton action={true} linkto={"/login"}>
                                        Learn More
                                    </CTAbutton>
                               </div>
                            </div> 
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col xl:flex-row my-12 w-[80%]">
                               <div className="xl:w-[50%] w-[100%] flex justify-center mb-10">
                                    <div>
                                        <div className="flex felx-row items-center gap-5">
                                            <span className="text-[40px]"><PiMedalLight /></span>
                                            <div>
                                                <p>Leadership</p>
                                                <p>Fully committed to the success Company</p>
                                            </div>
                                        </div>
                                        <div className="flex felx-row items-center gap-5 mt-16">
                                            <span className="text-[40px]"><RiGraduationCapFill/></span>
                                            <div>
                                                <p>Responsive</p>
                                                <p>Students will always be our top priority</p>
                                            </div>
                                        </div>
                                        <div className="flex felx-row items-center gap-5 mt-16">
                                            <span className="text-[40px]"><IoDiamondSharp /></span>
                                            <div>
                                                <p>Flexibility</p>
                                                <p>The ability to switch is an important skills</p>
                                            </div>
                                        </div>
                                        <div className="flex felx-row items-center gap-5 mt-16">
                                            <span className="text-[40px]"><IoEyeOutline /></span>
                                            <div>
                                                <p>Solve the problem</p>
                                                <p>Code you way to a solution</p>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                                <div className="xl:w-[50%] w-[100%] relative">
                                    <div>
                                        <img src={Leadership} alt="Leadership"/>
                                        <div className="hidden md:block">
                                            <div className="flex items-center justify-center">
                                                <div className="absolute flex flex-row bg-caribbeangreen-700 items-center">
                                                    <div className="flex flex-row my-5 mx-5 gap-4 items-center">
                                                        <p className="text-white text-[40px]">10</p>
                                                        <div className="text-richblack-500">
                                                            <p>YEARS</p>
                                                            <p>EXPERIENCES</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row  my-5 mx-5 gap-4 items-center">
                                                        <p className="text-white text-[40px]">250</p>
                                                        <div className="text-richblack-500">
                                                            <p>TYPES OF</p>
                                                            <p>COURSES</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className="flex flex-col  items-center mt-10 mx-3">
                            <div className="text-xl md:text-3xl">
                                Your Swift Knife for <HighlightText text={"learning any language"} />
                            </div>
                            <div className="text-sm text-center mt-5">
                               <p> Using spin making learning multiple langugae easy. with 20+ language realistic voice-over</p>
                               <p> progress traking, custom schedule and more.</p> 
                            </div>
                        </div>
                        <div className="flex justify-center my-5 mx-5">
                            <img src={multipage} alt={"multipage"} />
                        </div>
                        <div className="flex justify-center items-center">
                           <CTAbutton action={true} linkto={"/login"}>
                                Learn More
                           </CTAbutton>
                        </div>    
                </div>              
                <div className="bg-black w-full mx-3 my-5">
                        <div className="flex sm:flex-row flex-col items-center my-16 justify-center">
                            <div className="w-[80%] sm:w-[50%] mb-5 mr-5">
                                <img src={home} alt="home" className="border-l-[15px] border-t-[15px] border-white rounded-2xl"/>
                            </div>
                            <div className="flex flex-col w-[80%] sm:w-[30%]">
                                <p className="text-3xl text-white">Become an</p>
                                <p className="text-3xl"> <HighlightText text={"instructor"} /></p>
                                <p className="text-richblack-200">instructor from around the world teach milions of student on StudyNotion. we provide the tools and skills to teach what you love.</p>
                            </div>
                        </div>
                        <div className="text-white text-3xl flex justify-center">
                            Reviews from other learners
                        </div>
                </div>
                <Footer />
        </div>
    )
}

export default Home;   