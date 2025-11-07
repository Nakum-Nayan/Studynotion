import React from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { SiFreelancermap } from "react-icons/si";
import { IoIosCall } from "react-icons/io";
import ContactUsFrom from "../components/ContactPage/ContactUsFrom";
import Footer from "../components/comman/Footer";


const Contact = () => {
   return (
    <div className="text-richblack-5 mx-4">
        <div className=" flex md:flex-row flex-col md:my-10  w-[100%] gap-10">
            <div className="md:w-[45%]">
                <div className="flex justify-center items-center md:justify-end">
                    <div>
                        <div className="flex items-center gap-4 my-5">
                            <div className="text-richblack-300 text-3xl">
                                <HiMiniChatBubbleLeftRight />
                            </div>
                            <div className="flex flex-col">
                                <h1>Chat on us</h1>
                                <div className="text-richblack-400">
                                    <p>our friendley team is here to help.</p>
                                    <p>@mail address</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 my-5">
                            <div className="text-richblack-300 text-3xl">
                                <SiFreelancermap />
                            </div>
                            <div className="flex flex-col">
                                <h1>visit us</h1>
                                <div className="text-richblack-400">
                                    <p>come add say hello at our office HQ.</p>
                                    <p>Akshya Nagar 1st Block Cross Savita Nagar.</p>
                                    <p>Rajkot-351974</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-richblack-300 text-3xl">
                                <IoIosCall />
                            </div>
                            <div className="flex flex-col">
                                <h1>Call us</h1>
                                <div className="text-richblack-400">
                                    <p> Mon - Fri From 8am to 5pm </p>
                                    <p>+5748621535</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h1 className="text-3xl">Got a Idea? We've got the skills.</h1>
                    <h1 className="text-3xl">Let's team up</h1>
                    <p className="text-richblack-400 text-sm mt-2">Tell as more yourself and what you're got mind</p>
                    <div>
                        <ContactUsFrom />
                    </div> 
                </div>
            </div>
        </div>
        <Footer />
    </div>
)}

export default Contact
