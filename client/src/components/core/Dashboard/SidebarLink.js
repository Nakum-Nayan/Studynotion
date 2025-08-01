import React from "react";
import * as Icons from "react-icons/vsc"
import { matchPath, NavLink, useLocation } from "react-router-dom";


const SidebarLink = ({link,IconsName}) => {

    const Icon = Icons[IconsName]
    const location = useLocation()
    
    const matchRouth = (route) =>{
        return matchPath({path:route},location.pathname)
    }

    return(
       <NavLink
        to={link.path}
        className={`relative px-8 py-3  font-medium ${matchRouth(link.path) ? "bg-yellow-300 text-richblack-700" : "bg-opacity-0"}`}
       >
        <span className={`absolute left-0 top-0 h-full  w-[0.2rem] bg-yellow-25 ${matchRouth(link.path) ? "opacity-100" : "opacity-0"}`}>
        </span>
        <div className="flex items-center gap-x-3">
            <Icon className="text-2xl"/>
            <span>{link.name}</span>
        </div>
       </NavLink>
    )
}

export default SidebarLink