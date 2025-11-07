import React from "react";
import navlogo from "../../assets/logo/nav-logo.svg"
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { RiGithubFill } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";



const Footer  = () => {
  return (
       <div>
            <footer className="bg-richblack-800 text-gray-300 py-12 px-8 text-richblack-400">
            <div className="grid  sm:grid-cols-2 grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-8">
                <div>
                    <div>
                        <img src={navlogo} alt="StudyNotion Logo" className="h-10 mb-4 "/>
                    </div>
                    <h2 className="text-white text-lg font-semibold">Company</h2>
                    <ul className="mt-4 space-y-2">
                        <li>About</li>
                        <li>Careers</li>
                            <li>Affiliates</li>
                    </ul>
                    <div className="flex flex-row space-x-4 mt-4 text-3xl">
                        <a href="https://www.linkedin.com/in/nayan-nakum-10674b374"> <span><CiLinkedin /></span></a>
                        <a href="https://x.com/NayanAhir94?t=zCiRU5VLANqWVYsZ0DkWYg&s=09"> <span><FaTwitter /></span></a>
                        <a href="https://www.instagram.com/nayan._____7?igsh=MXJxNWphb3EwaXduMA=="> <span><FaInstagram /></span></a>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-white text-lg font-semibold">Contact Us</h2>
                    <ul className="mt-4 space-y-2">
                        <div className="flex gap-3 justify-centerus items-center text-lg">
                            <IoCallOutline />
                            <li>(+91) 9574395293</li>  
                        </div>
                        <div className="flex gap-3 justify-centerus items-center text-lg ">
                            <MdOutlineEmail />
                            <li>nayannakum08@gmail.com</li>
                       </div>
                    </ul>
                    <h2 className="text-white text-lg mt-6 font-semibold">Community</h2>
                    <ul>
                        <li>Forums</li>
                        <li>Chapters</li>
                        <li>Events</li>
                    </ul>
                </div>
                <div >
                    <h2 className="text-white text-lg font-semibold">Resources</h2>
                    <ul className="mt-4 space-y-2">
                        <li>Articles</li>
                        <li>Blog</li>
                        <li>Chart Sheet</li>
                        <li>Code Challenges</li>
                        <li>Docs</li>
                        <li>Projects</li>
                        <li>Videos</li>
                        <li>Workspaces</li>
                    </ul>
                    <h2 className="text-white text-lg mt-6 font-semibold">Support</h2>
                    <ul>
                        <li>Help Center</li>
                    </ul>
                </div>
                <div className="hidden lg:block">
                    <h2 className="text-white text-lg font-semibold">Subjects</h2>
                    <ul className="mt-4 space-y-2">
                        <li>AI</li>
                        <li>Cloud Computing</li>
                        <li>Cybersecurity</li>
                        <li>Code Foundations</li>
                        <li>Computer Science</li>
                        <li>Data Science</li>
                        <li>DevOps</li>
                        <li>Game Development</li>
                        <li>IT</li>
                        <li>Web Design</li>
                        <li>Cybersecurity</li>
                        <li>Data Analytics</li>
                        <li>Data Visualization</li>
                        <li>Developer Tool</li>
                        <li>Machine Learning</li>
                        <li>Mobile Developmen</li>
                    </ul>
                </div>
                <div className="hidden md:block">
                    <h2 className="text-white text-lg font-semibold">language</h2>
                    <ul className="mt-4 space-y-2">
                        <li>Bash</li>
                        <li>C</li>
                        <li>C#</li>
                        <li>Go</li>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>Java</li>
                        <li>JavaScript</li>
                        <li>PHP</li>
                        <li>Python</li>
                        <li>R</li>
                        <li>Ruby</li>
                        <li>SQL</li>
                        <li>Swift</li>
                    </ul>
                </div>
                <div className="hidden lg:block">
                    <h2 className="text-white text-lg  font-semibold">Career Building</h2>
                    <ul className="mt-4 space-y-2">
                        <li>Career Paths</li>
                        <li>Career Services</li>
                        <li>Interview Prep</li>
                        <li>Professional Certification</li>
                        <li>-</li>
                        <li>Full Catalog</li>
                        <li>Beta Content</li>
                    </ul>
                </div>
            </div>
            <hr className="border-t-2 mt-10 text-richblack-700"></hr>
                <div className="flex flex-row justify-between my-10">
                    <p>Privacy Policy | Cookie Policy | Terms</p>
                    <p>Made With Nayan @ 2025 StudyNotion</p>
                </div>
            </footer>
       </div>
  )
}

export default Footer; 