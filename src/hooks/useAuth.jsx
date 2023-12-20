import react,{useState} from "react"
import {useSelector} from "react-redux"
import {setCurrentToken} from '../features/auth/authSlice'
import {jwtDecode} from "jwt-decode"

const useAuth =()=>{
  const token = useSelector(setCurrentToken)
  
  let isAdmin = false
  let isManager = false
  let status ="Employee"
  
  if(token){
   const decoded = jwtDecode(token)
   const {username,roles} = decoded
   
   isManager = roles.includes("Manager")
   isAdmin = roles.includes("Admin")
    
   if(isManager) status = "Manager"
   if(isAdmin) status = "Admin"
    
    
    return {username,roles,isAdmin,isManager,status}
  }
  
  return {username:" ",role:[],isAdmin,isManager,status}

}
export default useAuth