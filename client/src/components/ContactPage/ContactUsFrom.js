import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import CountyCode from "../../data/countycode.json"

const ContactUsFrom = () =>{

    const [loading,setloading]  = useState(false)

    const {
        register,
        reset,
        handleSubmit,
        formState : {errors,isSubmitSuccessful} 
    }   =   useForm()

    const submitContactForm = async (data) => {
      try{                                                                  
          setloading(true)
          const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API,data)
          setloading(false)
      } 
      catch(error){
        console.log("Contact Data To Error",error.message)
        setloading(false)
      } 
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstname:"",
                lastname:"",
                email:"",
                message:"",
                phonenumber:"",
                countrycode:""
            })
        }
    },[reset,isSubmitSuccessful])

    return(
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="firstname">FirstName</label>
                        <input 
                            type="firstname"
                            name="firstname"
                            id="firstname"
                            placeholder="Enter The FirstName"
                            className="text-richblack-200 bg-richblack-700 rounded-md p-2"
                            {...register("firstname",{required:true})}
                        />
                        {
                            errors.firstname && (
                                <span>
                                    please enter the FirstName
                                </span>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="lastname">LastName</label>
                        <input 
                            type="lastname"
                            name="lastname"
                            id="lastname"
                            placeholder="Enter The lastname"
                            className="text-richblack-200 bg-richblack-700 rounded-md p-2"
                            {...register("lastname")}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Email Address"
                            className="text-richblack-200 bg-richblack-700 rounded-md p-2"
                            {...register("email",{required:true})}
                        />
                        {
                            errors.firstname && (
                                <span>
                                    please enter your email Address
                                </span>
                            )
                        }
                </div>
                <div className="flex flex-col w-[100%]">
                    <label htmlFor="phonenumber">Phone Number</label>
                    <div className="flex flex-row gap-5">
                            <select
                                name="countrycode"
                                id="countrycode"
                                {...register("countrycode", {required:true})}
                                  defaultValue="+91"
                                className=" text-richblack-200 bg-richblack-700 rounded-lg w-[90px] p-2" 
                            >
                                {
                                    CountyCode.map((element,index)=>{
                                        return(
                                            <option key={index} value={element.code} >
                                                {element.code} - {element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <input 
                                type="phonenumber"
                                name="phonenumber"
                                id="phonenumber"
                                placeholder="12345 67890"   
                                className=" text-richblack-200 bg-richblack-700 rounded-lg w-[calc(100%-80px)] p-2" 
                                {...register("phonenumber",
                                    {
                                        required :{value:true, message:"please Enter Your PhoneNumber"},
                                        maxLength:{value:10, message:"invalid Phone Number"},
                                        minLength:{value:8, message:"invalid Phone Number"} })}
                            />
                    </div>
                            {
                                errors.phonenumber && (
                                    <span>please Enter Your PhoneNumber</span>
                                )
                            }
                </div>
                <div className="flex  flex-col gap-1">
                    <label htmlFor="message">Message</label>
                    <textarea 
                        name="message"
                        id="message"
                        cols="30"
                        rows="7"
                        placeholder="Enter Your Message Here"
                         className="text-richblack-200 bg-richblack-700 rounded-md p-2"
                        {...register("message",{require:true})}
                    />
                    {
                        errors.message && (
                            <span>
                            please Enter Your Message 
                            </span>
                        )
                    }
                </div>
                <button type='submit' className="bg-yellow-50 py-[6px] px-[10px] rounded-[8px] my-3 font-medium text-richblack-900">
                    Send Message
                </button>
            </div>
        </form>
    )

}

export default ContactUsFrom