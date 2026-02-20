import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../../slices/authSlice";

const SignupForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCreatePass, setShowCreatePass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [accountType, setAccountType] = useState("Student");

  const [FormData, setFormData] = useState({
    accountType,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretkey:"",
  });

  const {email,firstName,lastName,password,confirmPassword,secretkey} = FormData;

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
}


  function submitHandler(e) {
    e.preventDefault();
    if (FormData.password !== FormData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
 
    const signupData = {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      secretkey,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(email,navigate))
  }

  return (
    <div>
      <div className="flex bg-richblack-800 p-1 gap-x-1 rounded-full max-w-max">
        <button
          onClick={() => setAccountType("Student")}
          className={`${
            accountType === "Student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200 "
          } py-2 px-5 rounded-full transition-all`}
        >
          Student
        </button>
        <button
          onClick={() => setAccountType("Instructor")}
          className={`${
            accountType === "Instructor"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200 "
          } py-2 px-5 rounded-full transition-all`}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="flex sm:flex-row flex-col gap-x-4">
          <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter First Name"
              onChange={changeHandler}
              value={FormData.firstName}
              name="firstName"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
          </label>

          <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter Last Name"
              onChange={changeHandler}
              value={FormData.lastName}
              name="lastName"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
          </label>
        </div>

        <label htmlFor="" className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address
            <sup className="text-pink-200">*</sup>
          </p>

          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={FormData.email}
            onChange={changeHandler}
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            name="email"
          />
        </label>

        <div className="flex sm:flex-row flex-col gap-x-4">
          <label htmlFor="" className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password
              <sup className="text-pink-200">*</sup>
            </p>

            <input
              type={showCreatePass ? "text" : "password"}
              required
              placeholder="Enter Password"
              onChange={changeHandler}
              value={FormData.password}
              name="password"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
            <span
              onClick={() => setShowCreatePass(!showCreatePass)}
              className="absolute right-2 top-[38px] cursor-pointer z-10"
            >
              {showCreatePass ? (
                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label htmlFor="" className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password
              <sup className="text-pink-200">*</sup>
            </p>

            <input
              type={showConfirmPass ? "text" : "password"}
              required
              placeholder="Confirm Password"
              onChange={changeHandler}
              value={FormData.confirmPassword}
              name="confirmPassword"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />

            <span
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-[38px] cursor-pointer z-10"
            >
              {showConfirmPass ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
      
        <label htmlFor="" className={`${
            accountType === "Instructor"
              ? "block"
              : "hidden"
          }`}>
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Secret key
            <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            placeholder="Enter your Secret key"
            value={FormData.secretkey}
            onChange={changeHandler}
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            name="secretkey"
          />
        </label>

        <button type="submit" className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 w-full">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
