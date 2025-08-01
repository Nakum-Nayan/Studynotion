import React, { useState } from "react";
import { sidebarLinks} from "../../../data/dashboard-links"
import {logout}  from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../comman/ConfirmationModal";

 
const Sidebar = () =>{

    const {user,loading : profileLoading} = useSelector((state) => state.profile)
    const {loading: authLoading} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [confirmationsModal,setConfirmationModal] = useState(null)

    if(authLoading || profileLoading){
        <div className="text-white mt-20">
            Loading........
        </div>
    }
    return(
        <div className="text-richblack-300  h-screen bg-richblack-800">  
            <div>
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link,id) => {
                            if(link.type && user.accountType !== link.type) return null
                            return(
                                <SidebarLink key={id}  link={link} IconsName={link.icon}/>
                            )
                        })
                    }
                </div>
                <div className="border border-richblack-600"></div>
                <div  className="flex w-full">  
                    <div className="flex items-center flex-col justify-center gap-3 ">
                        <div className="flex flex-row mt-1">
                            <SidebarLink 
                                link={{name:"Settings",path:"dashboard/settings" }}
                                IconsName="VscSettingsGear"
                            />      
                        </div> 
                        <button 
                           onClick = {() =>{
                            setConfirmationModal({
                                text1 : "Are You Sure ?",
                                text2 : "You will be logged out of your Account",
                                btn1Text : "Logout",
                                btn2Text : "Cancel",
                                btn1Handler: ()=> dispatch(logout(navigate)),
                                btn2Handler : () => setConfirmationModal(null),
                            })
                        }}
                           className="font-medium"
                        >
                            <div className="flex flex-row items-center gap-x-3">
                                 <VscSignOut  className="text-2xl"/>
                                    <span>Logout</span>
                            </div>
                        </button>
                    </div>     
                </div>              
            </div>
            {confirmationsModal && <ConfirmationModal  modalData={confirmationsModal} />}
        </div>
    )
}

export default Sidebar 