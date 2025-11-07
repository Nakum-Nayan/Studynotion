import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IconBtn from "../../comman/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { apiConnector } from "../../../services/apiconnector";
import { settingsEndpoints } from "../../../services/apis";
import { useEffect, useState } from "react";
const MyProfile = () =>{

    const [additionalDetails,setAdditionalDetails] = useState({})
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const id = user._id ;     
    const getDataFetch = async() => {
        try{
            const responce = await apiConnector("GET", settingsEndpoints.GET_PROFILE_API,{
                id }, {
                    Authorisation: `Bearer ${token}`,
                })
            setAdditionalDetails(responce?.data?.userDetails?.additionalDetails ?? {})
        }
        catch(error){
            console.log("Get Req Not Fetch",error)
        }
    }

    useEffect(()=>{
        getDataFetch()
    },[])

    const initials = 
    (user?.firstName?.[0]?.toUpperCase() || "") + 
    (user?.lastName?.[0]?.toUpperCase() || "K")

    return(
        <div className="text-white flex flex-col gap-7 overflow-hidden">
            <h1 className="text-4xl">My Profile</h1>
            <div className="flex sm:flex-row flex-col gap-3  sm:justify-between items-start sm:items-center bg-richblack-800 py-8 px-8 rounded-md">
                <div className="flex sm:flex-row flex-col items-start sm:items-center gap-4">
                    <div className="flex items-center justify-center p-1 bg-red-300 w-[60px] h-[60px] rounded-full focus:outline-none">
                        <p className="w-8 h-8 flex items-center justify-center text-3xl rounded-full text-white">
                            {initials}
                        </p>
                    </div>
                    <div>
                        <p>{user?.firstName + " " + user?.lastName}</p>
                        <p className="text-richblack-500">{user?.email}</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center text-sm items-center gap-1 bg-yellow-25 rounded-md px-3 font-semibold f py-1 text-black">
                    <Link to={"/dashboard/settings"}>
                        Edit
                    </Link>
                    <RiEditBoxLine />
                </div>     
            </div>
            <div className="flex flex-col gap-5 bg-richblack-800 py-8 px-8 rounded-md">
                <div className="flex flex-row justify-between">
                    <p className="text-xl">About</p>
                    <div className="sm:block hidden">
                        <div className="flex flex-row justify-center text-sm items-center gap-1 bg-yellow-25 rounded-md px-3 font-semibold f py-1 text-black">
                            <Link to={"/dashboard/settings"}>
                                Edit
                            </Link>
                            <RiEditBoxLine />
                        </div>
                   </div>
                </div>
                <p className="text-richblack-500">{additionalDetails?.about ?? "Write Something about Yourself"}</p>
                <div className="sm:hidden block">
                    <div className="flex w-fit flex-row justify-center text-sm items-center gap-1 bg-yellow-25 rounded-md px-3 font-semibold f py-1 text-black">
                            <Link to={"/dashboard/settings"}>
                                Edit
                            </Link>
                            <RiEditBoxLine />
                            <RiEditBoxLine />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 bg-richblack-800 py-8 px-8 rounded-md"> 
                <div className="flex flex-row justify-between">
                    <p className="text-xl">Personal Details</p>
                    <div className="sm:block hidden">
                        <div className="flex flex-row  justify-center text-sm items-center gap-1 bg-yellow-25 rounded-md px-3 font-semibold f py-1 text-black">
                            <Link to={"/dashboard/settings"}>
                                Edit
                            </Link>
                            <RiEditBoxLine />
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                        <div>
                            <p className="text-richblack-300">First Name</p>
                            <p>{user?.firstName}</p>
                        </div>
                        <div>
                            <p className="text-richblack-300">last Name</p>
                            <p>{user?.lastName}</p>
                        </div>
                        <div>
                            <p className="text-richblack-300">Email</p>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-richblack-300">Gender</p>
                            <p>{additionalDetails?.gender ?? "Add Gender"}</p>
                        </div>
                        <div>
                            <p className="text-richblack-300">Phone Number</p>
                            <p>{additionalDetails?.contactNumber ?? "Add Contact Number "}</p>
                        </div>
                        <div>
                            <p className="text-richblack-300">Date of Birth</p>
                            <p>{additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                  
                    </div>
                   <div className="block sm:hidden w-fit">
                        <div className="flex flex-row  justify-center text-sm items-center gap-1 bg-yellow-25 rounded-md px-3 font-semibold f py-1 text-black">
                            <Link to={"/dashboard/settings"}>
                                Edit
                            </Link>
                                <RiEditBoxLine />
                         </div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile 