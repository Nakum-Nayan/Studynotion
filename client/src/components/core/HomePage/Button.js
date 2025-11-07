import React from "react";
import { Link } from "react-router-dom";

function Button ({children , action ,linkto}){
    return(
        <Link to={linkto}>
            <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
                ${action? "bg-yellow-50 text-black" : "bg-richblack-800 text-white" }
                hover:scale-95 transition-all duration-200 text-xl`}>
                {children}
            </div>
        </Link>
    )
}
export default Button
