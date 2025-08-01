import React from "react";
import frame from "../../../assets/images/frame.png";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm"
import { FcGoogle } from "react-icons/fc";

const Template = ({ title, desc1, desc2, image, formType }) => {
  return (
    <div className="flex md:w-11/12 sm:max-w-[1160px] py-12 mx-auto gap-y-0 gap-x-12 justify-between items-center">
      <div className="flex flex-col sm:w-11/12 sm:max-w-[450px] mx-2 sm:mx-0 text-white">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">{title}</h1>
        <p className="text-[1.125rem] mt-4 leading-[1.625rem]">
          <span className="text-richblack-100">{desc1}</span>
          <span className="text-blue-100 italic">{desc2}</span>
        </p>

        {formType === "signup" ? <SignupForm /> : <LoginForm/>}
      </div>

      <div className="md:block hidden relative w-11/12 max-w-[450px]">
        <img
          src={frame}
          alt="patter"
          width={558}
          height={504}
          loading="lazy"

        />
        <img
          src={image}
          alt="patter"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-4 right-4 "
        />
      </div>
    </div>
  );
};

export default Template;
