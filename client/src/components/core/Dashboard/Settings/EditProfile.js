import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../../../../services/apiconnector";
import {settingsEndpoints} from "../../../../services/apis"
import { useSelector } from "react-redux";


export default function EditProfile() {

      const {token} = useSelector((state)=>state.auth)
      const {user} = useSelector((state)=>state.profile)
      
        const [profile,setProfile] = useState({
            firstName:"" || user.firstName,
            lastName:"" || user.lastName,
            dateOfBirth:"",
            gender:"",
            contactNumber:"",
            about:""
        })
        const id = user._id
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contactNumber,
            about,
        } = profile

        function changeHandler(event) {
            const { name, value } = event.target;
            setProfile((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        function cancelHandler(){
           setProfile({
                firstName:"",
                lastName:"",
                dateOfBirth:"",
                gender:"",
                contactNumber:"",
                about:""
           })
        }
        
        
    const About = async ()=>{
            try{
                const responce = await apiConnector("PUT",settingsEndpoints.UPDATE_PROFILE_API,{
                    token,id,about,gender,contactNumber,dateOfBirth,firstName,lastName
                })
                toast.success("About Data Successfully Update");
            }
            catch(error){
                console.log("Error API CALL :",error)
                toast.error("Error To Find")
            }
    }
    
    function submitHandler(e) {
            e.preventDefault();
            About()
            setProfile({
                firstName:"",
                lastName:"",
                dateOfBirth:"",
                gender:"",
                contactNumber:"",
                about:""
            })
    }    
  

    return(
       <div className="bg-richblack-800 px-1 py-4 rounded-md">
            <div className="flex flex-col px-4 gap-5">
                <p className="text-xl">Profile Information</p>
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-4">
                        <div className="flex sm:flex-row flex-col gap-x-4">
                            <label htmlFor="" className="w-full">
                                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                                First Name 
                                </p>
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    onChange={changeHandler}
                                    value={profile.firstName}
                                    name="firstName"
                                    className="bg-richblack-700 px-2 py-2 rounded-[0.75rem] w-full  text-richblack-5"
                                />
                            </label>
                            <label htmlFor="" className="w-full">
                                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                                last Name
                                </p>
                                <input
                                    type="text"
                                    placeholder="Enter last Name"
                                    onChange={changeHandler}
                                    value={profile.lastName}
                                    name="lastName"
                                    className="bg-richblack-700 px-2 py-2 rounded-[0.75rem] w-full  text-richblack-5"
                                />
                            </label>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-x-4">
                           <label htmlFor="" className="w-full">
                                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Date of Birth</p>
                                <input 
                                    type="date"
                                    name="dateOfBirth"
                                    onChange={changeHandler}
                                    value={profile.dateOfBirth}
                                    className="bg-richblack-700 px-2 py-2 rounded-[0.75rem] w-full text-richblack-5"
                                />
                           </label>
                           <label htmlFor="" className="w-full">
                                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Gender</p>
                                <select
                                 name="gender"
                                 value={profile.gender}
                                 onChange={changeHandler}
                                 className="bg-richblack-700 px-2 py-2 rounded-[0.75rem] w-full text-richblack-5"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                           </label>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-x-4">
                            <label htmlFor="" className="w-full">
                                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                                Contact Number 
                                </p>
                                <input
                                    type="text"
                                    placeholder="1234567890"
                                    onChange={changeHandler}
                                    value={profile.contactNumber}
                                    name="contactNumber"
                                    className="bg-richblack-700 px-2 py-2 rounded-[0.75rem] w-full  text-richblack-5"
                                />
                            </label>
                            <label htmlFor="" className="w-full">
                                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                                About
                                </p>
                                <input
                                    type="text"
                                    placeholder="Enter About"
                                    onChange={changeHandler}
                                    value={profile.about}
                                    name="about"
                                    className="bg-richblack-700 px-2 py-2 rounded-[0.75rem] w-full  text-richblack-5"
                                />
                            </label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={cancelHandler} className="text-black bg-richblack-300 rounded-lg px-4 py-1 font-bold">
                                Cancel
                            </button>
                            <button type="submit" className="text-black bg-yellow-25 rounded-lg px-4 py-1 font-bold">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
       </div>
    )
}


