import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSWORDTOKEN_API,
  RESETPASSWORD_API,
} = authEndpoints;


export function sendOtp(email,navigate) {
  return async (dispatch) => {
            const toastId = toast.loading("Loading...");
            dispatch(setLoading(true));
            try {
                const response = await apiConnector("POST", SENDOTP_API, {
                    email,
                    checkUserPresent: true,
                });

                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                    toast.success("OTP Sent Successfully");
                    navigate("/verify-email")
            }
            catch (error) {
                console.log("SENDOTP API ERROR............", error);
                toast.error("Could Not Send OTP");
            } 
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
  };
      
export function signUp (
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            secretkey,
            otp,
            navigate
       )
       {
        return async (dispatch) => {
          const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
          try {
            const response = await apiConnector("POST", SIGNUP_API, {
              accountType,
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
              secretkey,
              otp
            },
          );
            if (!response.data.success) {
              throw new Error(response.data.message);
            }
            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
                console.log("SIGNUP API ERROR............", error);
                toast.error("Correct Data Fill");
        } 
              
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
  }

export function login(email,password,navigate) {
        return async (dispatch) => {
          const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
          try {
            const response = await apiConnector("POST", LOGIN_API, {
              email,
              password,
            });
      
            if (!response.data.success) {
              throw new Error(response.data.message);
            }
            toast.success("Login Successful");
            dispatch(setToken(response.data.token));

            const userImage = response.data?.user?.image 
              ? response.data.user.image
              : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName},svg?sedd=${response.data.user.lastName}`;
            dispatch(setUser({ ...response.data.user,image: userImage }));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile");
          } catch (error) {
            console.log("LOGIN API ERROR............", error);

            const errorMessage = 
            error?.response?.data?.message || 
            error?.message || 
            "Login Failed";
            toast.error(errorMessage);
          } 
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        };
  }

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
      };
}
      
export function getPasswordResetToken(email,setEmailSend) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST",RESETPASSWORDTOKEN_API,{email})

      // console.log("RESET PASSWORD  TOKEN RESPONSE....",response)

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSend(true)
    }
    catch(error){
      console.log("RESET PASSWORD TOKEN Error",error)
    }
    dispatch(setLoading(false))
  }
}

export function resetPassword  (password,confirmPassword,token, navigate) {
  return async (dispatch) =>{
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token})
        // console.log("reset password  responce....",response)

        if(!response.data.success){
          throw new Error(response.data.message)
        }
  
        toast.success("Password Reset Updated SuccessFully")
        navigate("/login");
      }
      catch(error){ 
        console.log("RESET PASSWORD Error",error)
        toast.error("UpdatePassword Error")
      }
      dispatch(setLoading(false))
  }
} 
