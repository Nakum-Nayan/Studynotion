import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
const ForgotPassword = () => {

    const [emailSend , setEmailSend] = useState(false);
    const [email,setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const handleOneSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSend))
    }

return (
    <div className="text-white flex justify-center items-center w-full min-h-screen px-5">
      {loading ? (
        <div> loading.....</div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-semibold">
              {!emailSend ? "Reset Your Password" : "Check Your Email"}
            </h1>
            <p className="text-sm text-richblack-300 mt-3">
              {!emailSend
                ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try acount recovery"
                : `We have sent the reset email to ${email}`}
            </p>
            <form onSubmit={handleOneSubmit}>
              {!emailSend && (
                <label className="block">
                  <p className="mt-4 my-1">Email Address</p>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email Address"
                    className="w-full rounded-md bg-richblack-800 h-10 py-2 px-3"
                  />
                </label>
              )}
              <button
                type="submit"
                className="w-full bg-yellow-200 px-3 py-2 mt-4 rounded-md text-black"
              >
                {!emailSend ? "Reset Passsword" : "Reset Email"}
              </button>
            </form>
            <div className="mt-4">
              <Link to="/login" className="flex items-center gap-1">
                <IoIosArrowRoundBack />
                <p>Back To Login</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
