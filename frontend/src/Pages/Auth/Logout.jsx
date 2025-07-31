import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../../api/axios'


export default function Logout(){
    const navigate = useNavigate();

    useEffect(()=>{
        const logoutUser = async()=>{
            try{
                const refreshToken=localStorage.getItem("refresh_token")
                await axiosInstance.post("auth/logout",{refresh:refreshToken})

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token")
                localStorage.removeItem("user")
                navigate("/login")
            }catch(error){
                console.error("logout failed",error)
            }
        }
        logoutUser();

    },[])

  return null;
}

