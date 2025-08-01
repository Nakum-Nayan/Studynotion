import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";

const Dashboard = () =>{

    const [sidebarhide,setSidebarHide] = useState(false)
   
    const {loading: authLoading} = useSelector((state) => state.auth)
    const {loading : profileLoading} = useSelector((state) => state.profile)

    if(authLoading || profileLoading){
        <div className="text-white mt-20">
            Loading........
        </div>
    }

    return(
        <div className={`relative flex min-h-[calc(100vh-3.5rem)] backdrop-blur-none`}> 
            <div className={`md:block hidden w-[15%]`}>
              <Sidebar  />
             </div>
           
             <div className="block md:hidden">
                    <div className="flex justify-end text-richblack-400 text-3xl">
                                    {sidebarhide ? (
                                        <IoCloseSharp onClick={() => setSidebarHide(false)}className="cursor-pointer" />
                                    ) : (
                                        <IoIosMenu onClick={() => setSidebarHide(true)} className="cursor-pointer " />
                                    )}
                                    {sidebarhide && <Sidebar />}
                    </div>
            </div>

            <div className="h-[calc(100vh-3.5rem)] w-screen overflow-auto">
                <div className={`mx-auto w-8/12 max-w-[900px] py-10`} >
                    <Outlet />
                </div>  
            </div>
        </div>  
    )
}

export default Dashboard