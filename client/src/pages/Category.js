import { useState } from "react"
import {apiConnector} from "../services/apiconnector"
import { categories } from "../services/apis"
import { useSelector } from "react-redux"

function Category() {

    const [category,setCategory] = useState({
        name:"",
        description :""
    })

    const {token} = useSelector((state)=>state.auth)

    function changeHandler(event) {
        const { name, value } = event.target;
        setCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
        const {name,description} = category
    const categoryCreate =  async() =>{
        try{
            let response =  await apiConnector("POST",categories.CREATE_CATEGORIES_API,{
                token,name,description
            })
            // console.log("data",response)
        }
        catch(error){
            console.log("category is not create",error)
        }
    }   

    function submitHandler (e){
        e.preventDefault();
        categoryCreate()
        setCategory({
            name:"",
            description :""
        })
    }

    return(
       <form onSubmit={submitHandler}>
            <div className="ring-richblack-800 flex flex-col gap-4">
                <label className="w-full">
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                        Name Category
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        type="name"
                        required
                        value={category.name}
                        placeholder="Enter your category"
                        onChange={changeHandler}
                        name="name"
                        className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                    />
                </label>
                <label className="w-full">
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Description
                        <sup className="text-pink-200">*</sup>
                    </p>

                    <input
                        type="description"
                        required
                        value={category.description}
                        placeholder="Enter your category description"
                        onChange={changeHandler}
                        name="description"
                        className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                    />
                </label>
                <button type="submit" className="text-richblack-900 text-xl border border-pure-greys-600 w-fit p-2 bg-yellow-200 rounded-xl">Submit</button>
            </div>
        </form>
    )
}

export default Category 