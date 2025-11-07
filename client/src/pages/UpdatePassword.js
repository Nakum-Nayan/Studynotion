import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () =>{

    const [fromData,setFromData] = useState({
        password:"",
        confirmPassword:""
    })
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const {loading} = useSelector( (state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation();
    const {password ,confirmPassword} = fromData

    const handleOneChange = (e) =>{
      setFromData((prevData) =>(
        {
            ...prevData,
            [e.target.name] : e.target.value
        }
      ))
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password,confirmPassword,token,navigate))
    }

    return( 
        <div className="text-white flex justify-center items-center m-auto w-full">
            {
                loading ? (
                    <div>
                        Loading....
                    </div>
                )
                :
                (
                    <div className="w-[20%]">
                        <h1 className="text-3xl">Choose new Password</h1>
                        <p className="mt-2 text-sm">Almost done. Enter Your new Password and youre all set.</p>
                        <form onSubmit={handleOnSubmit} className="my-4">
                            <label>
                                <p>New Passsword<sup>*</sup></p>
                               <div  className="flex justify-end items-center">
                                    <input 
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={handleOneChange}
                                        placeholder="Enter New Password"
                                        className="w-full rounded-md bg-richblack-800 h-8 py-2 px-2"
                                    />
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute px-2"
                                    >
                                        {
                                            showPassword ? <IoMdEye fontSize={20}/> : <IoMdEyeOff fontSize={20}/>
                                        }
                                    </span>
                               </div>
                            </label>
                            <label>
                                <p className="mt-4">New ConfirmPasssword<sup>*</sup></p>
                               <div className="flex justify-end items-center">
                                <input 
                                        required
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleOneChange}
                                        placeholder="Enter New ConfirmPassword"
                                        className="w-full rounded-md bg-richblack-800 h-8 py-2 px-2 "
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute px-2"
                                    >
                                        {
                                            showConfirmPassword ? <IoMdEye fontSize={20}/> : <IoMdEyeOff fontSize={20}/>
                                        }
                                    </span>
                               </div>
                            </label> 
                            <button type="submit" className="w-full bg-yellow-200 px-1 py-1 mt-4 rounded-md text-black">
                                Reset Password
                            </button>
                        </form>
                        <div>
                            <Link to="/login" className="flex items-center">
                                <IoIosArrowRoundBack />
                                <p>Back To Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword
