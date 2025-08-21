import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText"
import about1 from "../assets/images/about1.jpg"
import about2 from "../assets/images/about2.jpg"
import about3 from "../assets/images/about3.jpg"
import aboutmeet from "../assets/images/aboutmeet.jpg"
import Quote from "../components/core/AboutPage/Quote";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Footer from "../components/comman/Footer"
import profile from "../assets/images/profile.jpg";
import { FaHeart } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";


const About = () => {
    return (
        <div className="text-white">
            <section className="bg-richblack-600">
                <div>
                    <header className="flex justify-center items-center flex-col pt-[40px]">
                        <div className="sm:w-full w-[80%] flex flex-col items-center text-center justify-center font-semibold text-2xl sm:text-3xl">
                            Driving Innovation in Online Education for a
                            <HighlightText text={"Brighter Future"} />
                        </div>
                        <p className="sm:w-[53%] w-[80%] text-center sm:text-[16px] text-[10px] text-richblack-400 my-3">Studynotion is at the forefront of driving Innovation in online Education. We're passionate about creating a Brighter future by offering by offering cutting-edge courses, leveraging emering technologies, and nurturing a vibrant learning community</p>
                    </header>
                    <div className="flex gap-x-8 items-center sm:flex-row flex-col justify-center">
                        <img src={about1} alt="about1" className="sm:w-[22%] w-[80%]  mb-5" />
                        <img src={about2} alt="about2" className="sm:w-[22%] w-[80%] mb-5" />
                        <img src={about3} alt="about3" className="sm:w-[22%] w-[80%] mb-5" />
                    </div>
                </div>
            </section>

            <div className="w-full flex justify-center items-center">
                <div className="sm:w-[80%] md:w-[67%] w-[85%] text-center py-16">
                    <Quote />
                </div>
            </div>
            <hr className="text-richblack-700 border-2"></hr>

            <section className="md:block hidden">
                <div className="w-full flex justify-center items-center py-4 sm:py-16 flex-col">
                    <div className="flex justify-center items-center flex-col sm:flex-row sm:gap-20 w-[70%]">
                        <div className=" sm:w-[100%] md:w-[39%]  sm:py-0 py-10">
                            <h1 className="text-red-700 font-semibold text-3xl">Our Founding Story</h1>
                            <p className="text-richblack-400 text-xs my-5">
                                Our e-learning platform was born out of a shared vision and passion for
                                transforming education. It all began with a group of educators, technologists,
                                and lifelong learners who recognized the need for accessible, flexible, and
                                high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p className="text-richblack-400 text-[13px] ">
                                As experienced educators ourselves, we witnessed firsthand the limitations and
                                challenges of traditional education systems. We believed that education should not
                                be confined to the walls of a classroom or restricted by geographical boundaries.
                                We envisioned a platform that could bridge these gaps and empower individuals from
                                all walks of life to unlock their full potential.
                            </p>
                        </div>
                        <img src={aboutmeet} alt="aboutmeet" width="40%" className="sm:w-[35%] sm:hidden md:block w-[100%] sm:mx-0 mx-5 sm:my-0 border-4 border-red-100 rounded-lg" />
                    </div>
                    <div className="flex sm:flex-row items-center justify-center flex-col w-[100%] sm:gap-36 py-6 sm:py-10">
                        <div className="sm:w-[23%] w-[70%] mx-10 sm:mx-0 flex flex-col justify-start">
                            <h1 className="text-yellow-300 font-semibold text-3xl">Our Vision</h1>
                            <p className="text-richblack-400 text-xs mt-5">
                                With this vision in mind, we set out on a journey to create an e-learning
                                platform that would revolutionize the way people learn. Our team of dedicated
                                experts worked tirelessly to develop a robust and intuitive platform that combines
                                cutting-edge technology with engaging content, fostering a dynamic and interactive
                                learning experience.
                            </p>
                        </div>
                        <div className="sm:w-[25%] w-[70%] mx-10 sm:mx-0">
                            <h1 className="text-blue-200 font-semibold text-3xl">Our Mission</h1>
                            <p className="text-richblack-400 text-xs mt-5">
                                Our mission goes beyond just delivering courses online. We wanted to create a
                                vibrant community of learners, where individuals can connect, collaborate, and
                                learn from one another. We believe that knowledge thrives in an environment of
                                sharing and dialogue, and we foster this spirit of collaboration through forums,
                                live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div>
                <StatsComponent />
            </div>

            <section className="flex justify-center  ">
                <div className="w-10/12">
                    <LearningGrid />
                </div>
            </section>

            <div className="flex gap-4 m-10 justify-center items-center sm:flex-row flex-col">
                <div className="w-[50%] flex justify-end">
                    <img
                        src={profile}
                        alt="Network issue"
                        className="lg:w-[550px] lg:h-[550px] md:w-[300px] md:h-[300px]  sm:w-[250px] sm:h-[200px] w-[150px] h-[150px]  rounded-full object-cover"
                    />
                </div>
                <div className="sm:w-[50%] lg:p-16">
                    <div className="flex gap-3 flex-col">
                        <div className="inline-flex items-center py-2 bg-gray-100 rounded-full">
                            <FaHeart className="w-4 h-4 text-red-500 mr-2" fill="currentColor" />
                            <span className="text-md font-medium">Founder & Visionary</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">Nayan Nakum</h2>
                        <p className="text-xl">Creative Director</p>
                    </div>
                    <div className="w-full">
                        <div className="text-lg text-richblack-200 flex flex-col gap-4">
                            <p>
                                StudyNotion is an online study platform built to make learning simple and accessible for everyone. We bring together students and high‑quality courses in one place, so anyone can explore, purchase, and start studying subjects that matter to them.
                            </p>
                            <p className="hidden lg:block">
                                Our goal is to create a space where learning never stops. With a focus on easy access, quality content, and a smooth experience, StudyNotion helps students build skills and achieve their goals at their own pace.
                            </p>
                        </div>
                        <div className="flex flex-row space-x-4 mt-4 md:text-5xl text-3xl">
                            <a href="https://www.linkedin.com/in/nayan-nakum-10674b374"> <span><CiLinkedin /></span></a>
                            <a href="https://x.com/NayanAhir94?t=zCiRU5VLANqWVYsZ0DkWYg&s=09"> <span><FaTwitter /></span></a>
                            <a href="https://www.instagram.com/nayan._____7?igsh=MXJxNWphb3EwaXduMA=="> <span><FaInstagram /></span></a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default About