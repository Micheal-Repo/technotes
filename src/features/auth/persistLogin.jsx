import {Link,Outlet} from "react-router-dom"
import {useState,useEffect,useRef} from "react"
import usePersist from "../../hooks/Persist"
import {useSelector,useDispatch} from "react-redux"
import {setCurrentToken,setCredential} from "./authSlice"
import {useRefreshMutation} from "./authApiSlice"


const PersistLogin =()=>{
  const token = useSelector(setCurrentToken)
  const [persist] = usePersist()
  const effectRan = useRef(false)
  const [trueSucess,setTrueSuccess] = useState(false)
  const dispatch = useDispatch()
  
  const [refresh,{
    isUninitialized,
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()
  
  useEffect(()=>{
    if(data?.token){
      dispatch(setCredential(data.token))
    }
  },[data])
  
  
  useEffect(()=>{
    if(effectRan.current === true || process.env.NODE_ENV === "online"){
      
      const verifyRefreshToken =async()=>{
        
        
        try{
          
          await refresh()
           setTrueSuccess(true)
        }catch(err){
          alert(err.data.message)
          console.error(err)
        }
        
      }
      
  if(!token && persist) 
  verifyRefreshToken()
    }
    
    return ()=> effectRan.current = true
    //eslint-disable-next-line
  },[])
  
  let content
  if(!persist){
    content = <Outlet/>
  }else if(isLoading){
    content = <p>Loading....</p>
  }else if(isError){
    content = (
      <p className="flex flex-col gap3">
      <span>  {error?.status === 403 ? 
      "your login has expired" : error?.data?.message}
      </span>
      <Link to="/login" className="bg-slate-700 p-2 rounded-lg mt-3">Click to login again</Link>
      </p>
      )
  }else if(isSuccess && trueSucess){
    content = <Outlet/>
  }else if(token && isUninitialized){
   
    content= <Outlet/>
  }
  
  return <p>welcome</p>
  

}

export default PersistLogin