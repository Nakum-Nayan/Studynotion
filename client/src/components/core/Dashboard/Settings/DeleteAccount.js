import React from "react";
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { apiConnector } from "../../../../services/apiconnector";
import { settingsEndpoints }  from "../../../../services/apis"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../../../slices/authSlice";
import { setUser } from "../../../../slices/profileSlice";
import { resetCart } from "../../../../slices/cartSlice";


export default function DeleteAccount() {

    const navigate = useNavigate()
    const dispatch = useNavigate()

    const {user} = useSelector((state) => state.profile)
    const{token} = useSelector((state)=>state.auth)
    const id = user.id


    const deleteHandler = async() =>{
        try{
            const response = await apiConnector("DELETE",settingsEndpoints.DELETE_PROFILE_API,{
                token,id
            })
            dispatch(setToken(null));
            dispatch(setUser(null));
            dispatch(resetCart());
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/")
            toast.success("Delete Account Successfully")
        }
        catch(error){
            console.log("Delete Account",error)
            toast.error("Account Not Delete")
        }
    }

    return(
        <div className="bg-red-900">
            <div className="flex sm:flex-row flex-col px-5 py-5 gap-3">
                <RiDeleteBin5Line  className="bg-red-800 rounded-full w-[50px] h-[50px] px-2 py-2 text-white text-4xl"/>
                <div> 
                    <h1 className="font-bold text-xl mb-1">Delete Account</h1>
                    <p>Whould you like to delete account?</p>
                    <p>This account may contain Paid Courses. Deleting your account is</p>
                    <p>permanent and will remove all the contain associated with it.</p>
                    <p className="italic text-red-500 mt-1 cursor-pointer" onClick={deleteHandler}>I Want To Delete My Account</p>
                </div>
            </div>
        </div>
    )

}
