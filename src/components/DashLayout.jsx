import {Outlet} from "react-router-dom"
import DashHeader from "./DashHeader"
import DashFooter from "./DashFooter"
import {useSelector,useDispatch} from "react-redux"
import {setCredential} from "../features/auth/authSlice"
import {useEffect} from "react"

const DashLayout =()=>{
  const token = useSelector(state=> state.auth.token)
  
  const dispatch = useDispatch()
  
  useEffect(()=>{
  //  const token = localStorage.getItem("token")
  //  alert(token)
  //  dispatch(setCredential(token))
  },[])
  
  const date = new Date()
  const year = date.getFullYear()
  const completeDate = date.toLocaleString("en-NG",{weekday:"long",day:"numeric",month:"long",year:"numeric"})
  return(
    <>
    <DashHeader/>
    <p>my Token: {token}</p>
    <p>date: {completeDate}</p>
       <div className="dash-container">
                <Outlet />
                DashLayout
       </div>
    <DashFooter/>
    </>
    
    )
}


export default DashLayout