import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { signupData, loading } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!signupData) {
            navigate("/signup")
        }
    }, [signupData, navigate])


    const handleOnSubmit = (e) => {
        e.preventDefault()

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            secretkey
        } = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, secretkey, otp, navigate))
    }

    return (
        <div className="text-white flex justify-center items-center w-full min-h-screen px-4">
            {loading ? (
                <div>Loading ....</div>
            ) : (
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-semibold text-center">Verify Email</h1>
                    <p className="my-3 text-center text-sm text-richblack-300">
                        A verification code has been sent to you. Enter the code below.
                    </p>
                    <form onSubmit={handleOnSubmit} className="mt-4 flex flex-col items-center">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className="mx-2">-</span>}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                   className="w-[50px] h-[50px] text-center border border-gray-300 rounded sm:mx-2 text-richblack-900 bg-white"
                                />
                            )}
                        />
                        <button
                            type="submit"
                            className="w-full bg-yellow-200 px-3 py-2 mt-6 rounded-md text-richblack-900"
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className="flex justify-between items-center mt-6">
                        <Link to="/login" className="flex items-center gap-1 text-sm">
                            <IoIosArrowRoundBack />
                            <p>Back To Login</p>
                        </Link>
                        <button
                            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                            className="text-blue-400 hover:underline text-sm"
                        >
                            Resend It
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default VerifyEmail






