import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { apiConnector } from "../../../../services/apiconnector";
import { settingsEndpoints } from "../../../../services/apis"
import { useSelector } from "react-redux";


export default function UpdatePassword () {

    const [password,setPassword] = useState({
        currentPassword:"",
        newPassword:""
    })
    const[currentShowPassword,setCurrentShowPassword] = useState(false)
    const[newShowPassword,setNewShowPassword] = useState(false)
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const {currentPassword,newPassword} = password
    const id = user._id; 

    const passwordAPI = async () => {
        try{
            const responce = await apiConnector("POST",settingsEndpoints.CHANGE_PASSWORD_API,{
                token,
                id,
                currentPassword,
                newPassword
            })
            toast.success("SuccessFully Password Update")
        }
        catch(error){
            console.log("API CALL CHANGEPASSWORD ERROR :",error)
            toast.error("NOT PASSWORD CHANGE")
        }
    }

    function changeHandler(event){
        const { name, value } = event.target;
        setPassword((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function cancelHandler () {
        setPassword({
            currentPassword:"",
            newPassword:""
        })
    }

    function submitHandler(e){
        e.preventDefault()
        passwordAPI()
        setPassword({
            currentPassword:"",
            newPassword:""
        })
    }


    return(
        <div className="flex flex-col bg-richblack-800 rounded-md px-7 py-6 gap-5">
            <p className="font-semibold text-xl">Password</p>
            <form onSubmit={submitHandler}>
                <div className="flex sm:flex-row flex-col gap-5">
                    <label htmlFor="" className="w-full">
                        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                            Current Password 
                        </p>
                        <div className="relative flex items-center justify-end">
                            <input
                                type={currentShowPassword ? "text" : "password"}
                                placeholder="Enter Current Password"
                                onChange={changeHandler}
                                value={password.currentPassword}
                                name="currentPassword"
                                className="bg-richblack-700 px-2 py-2 rounded-[0.75rem] w-full  text-richblack-5"
                            />               
                            <span onClick={() => setCurrentShowPassword(prev =>  !prev)} className="absolute px-3 text-xl">
                                {
                                    currentShowPassword ?  <FaEye/> : <FaEyeSlash />
                                }
                            </span>
                        </div>
                    </label>
                    <label htmlFor="" className="w-full">
                        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                            New Password 
                        </p>
                        <div className="relative flex items-center justify-end">
                            <input
                                type={newShowPassword ? "text" : "password"}
                                placeholder="Enter New Password"
                                onChange={changeHandler}
                                value={password.newPassword}
                                name="newPassword"
                                className="bg-richblack-700 px-2 py-2 rounded-[0.75rem] w-full  text-richblack-5"
                            />   
                            <span onClick={() => setNewShowPassword(prev =>  !prev)} className="absolute px-3 text-xl">
                                {
                                    newShowPassword ?  <FaEye/> : <FaEyeSlash />
                                }
                            </span> 
                        </div>       
                    </label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <button onClick={cancelHandler} className="text-black bg-richblack-300 rounded-lg px-4 py-1 font-bold">
                        Cancel
                    </button>
                    <button  type="submit" className="text-black bg-yellow-25 rounded-lg px-4 py-1 font-bold">
                        Update
                    </button>
                </div>
            </form>    
        </div>
    )
}
