import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { sendOtp, signUp } from "../services/operations/authAPI";


const VerifyEmail = () =>{
    
    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {signupData, loading} = useSelector((state) => state.auth)

    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[signupData,navigate])


    const handleOnSubmit = (e) =>{
            e.preventDefault()

            const {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                secretkey
            }   = signupData;

            dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,secretkey,otp,navigate))
    }   


    return (
        <div className="text-white flex justify-center items-center m-auto">
            {
                loading ? (
                    <div>
                        Loading ....
                    </div>
                ) :(
                    <div>
                        <h1 className="text-3xl">Verify Email</h1>
                        <p className="my-2">A verifyEmail Code has been sent to you. Enter the code below</p>
                        <form onSubmit={handleOnSubmit}>
                            <OTPInput 
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span className="mx-2">-</span>}
                                renderInput={(props) => <input {...props}  placeholder="-"  style={{ width: "50px", height: "50px", textAlign: "center", border: "1px solid #ccc", borderRadius: "4px" ,   color: "#000", backgroundColor: "#fff", }}
                                />}
                            />
                            <button type="submit" className="w-full bg-yellow-200 px-1 py-1 mt-4 rounded-md text-black">
                                Verify Email
                            </button>
                        </form>
                        <div className="flex justify-between">
                            <div>
                                <Link to="/login" className="flex items-center">
                                    <IoIosArrowRoundBack />
                                    <p>Back To Login</p>
                                </Link>
                            </div>
                            <button
                                onClick={() => dispatch(sendOtp(signupData.email,navigate))}    
                                className="text-blue-100"
                            >
                                Resend It
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail






