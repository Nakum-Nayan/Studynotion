import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { IoIosMenu } from "react-icons/io";
import useOnClickOutside from "../hooks/useOnClickOutside";

const Dashboard = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    useOnClickOutside(ref, () => setOpen(false))

    const { loading: authLoading } = useSelector((state) => state.auth)
    const { loading: profileLoading } = useSelector((state) => state.profile)

    if (authLoading || profileLoading) {
        <div className="text-white mt-20">
            Loading........
        </div>
    }

    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <div className={`relative flex min-h-[calc(100vh-3.5rem)] backdrop-blur-none`}>
            <div className={`md:block hidden w-[15%]`}>
                <Sidebar />
            </div>

            <div ref={ref} className="sm:block md:hidden" onClick={() => setIsVisible((prev) => !prev)}>
                <div className="flex justify-end text-richblack-400 text-3xl">
                    {!open && (
                        <IoIosMenu onClick={() => setOpen(true)} className="cursor-pointer " />
                    )}
                    {open && (<Sidebar closeMenu={closeMenu} />)}
                </div>
            </div>

            <div className={`h-[calc(100vh-3.5rem)] w-screen overflow-auto ${isVisible ? "hidden" : "block"
                }`}>
                <div className={`mx-auto w-8/12 max-w-[900px] py-10`} >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard