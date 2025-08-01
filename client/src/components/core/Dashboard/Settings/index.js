import React from "react";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";
const Settings = () =>{
    return(
        <div className="text-white overflow-hidden">
            <div className="flex flex-col gap-8">
                <h1 className="text-xl">Edit Profile</h1>
                <EditProfile />
                <UpdatePassword />
                <DeleteAccount />
            </div>
        </div>
    )
}

export default Settings