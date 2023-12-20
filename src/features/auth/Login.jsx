import {Link,useNavigate} from "react-router-dom"
import {useState,useRef,useEffect} from "react"
//import {AuthApiSlice} from "./authApiSlice3"
import { useLoginMutation } from './authApiSlice'
import {useDispatch} from "react-redux"
import {setCredential} from "./authSlice"
import usePersist from "../../hooks/Persist"

const Login =()=>{
  const [login,{
    isSuccess,
    isLoading,
    isError,
    error
  }] = useLoginMutation()
  
  const userRef = useRef()
  const errRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errMsg,setErrMsg] = useState("error")
 const [persist,setPersist] = usePersist()
  
  useEffect(()=>{
    userRef.current.focus()
  },[])
  
  useEffect(()=>{
    if(isError){
      setErrMsg(error?.data?.message)
    }
  },[error])
  
  //login State
  const [userData,setUserData] = useState({
    username:"",
    password:""
  })
  
  const {username,password} = userData
  
  useEffect(()=>{
   // setErrMsg("")
  },[username || password])
  
  //handleSubmit
  const onSubmit =async(e)=>{
    e.preventDefault()
   
    
    const res = await  login(userData)
    
    localStorage.setItem("token",res.data.AccessToken)
    
    dispatch(setCredential(res.data.AccessToken))
    
    setUserData({
      username:"",
      password:""
    })
    
    navigate("/dash")
    
    alert(res.data.AccessToken)
    
  }
  
  //handleUsername
const onUsernameChange =(e)=>{
    const username = e.target.value
    setUserData({...userData,username})
}  

//persist change
const handleToggle =()=> setPersist(pre=> !pre)


  //handlepassword
const onPasswordChange =(e)=>{
    const password = e.target.value
    setUserData({...userData,password})
}  

  const content=(
   <main className=""> 
   
    <header className="bg-slate-900 fixed top-0 left-0 px-[2rem] text-left w-full py-5 border-b-[2px] border-white text-[1.2rem] font-bold "> 
      <p>Employee Login h</p>
      
    </header>
    <main className="mt-[5rem] mb-[1rem]  w-full p-5 rounded-lg bg-slate-800 border-2 border-white text-left ">
       <form onSubmit={onSubmit} className="flex flex-col gap-5">
       <p>LOGIN
       {isLoading&&"loading..."}
       </p>
       <p className="text-center italic font-bold text-red-300" arial-label="assertive" >{errMsg}</p>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="username" className="font-semibold">
                username
            </label>
            <input
              id="username"
              type="text"
              ref={userRef}
              className="w-full p-2 rounded-lg p-3 bg-slate-800 border-[2px] border-slate-600 outline-2 outline-slate-400"
              value={username}
              onChange={onUsernameChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password" className="font-semibold">
                password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 rounded-lg p-3 bg-slate-800 border-[2px] border-slate-600 outline-slate-400"
              value={password}
              onChange={onPasswordChange}
            />
          </div>
          <div>
             <label htmlFor="persist" >
               <input
                type = "checkbox"
                id= "persist"
                name="persist"
                checked={persist}
                onChange={handleToggle}
               />
               {" "}
               do you trust this device
             </label>
          </div>
          <div>
            <button className="p-3 rounded-lg bg-slate-400 w-full mt-3 text-[1.5rem] font-bold">Login</button>
          </div>
       </form>
    </main>
    <footer className="bg-slate-900 fixed bottom-0 left-0 px-[2rem] text-left w-full py-5 border-t-[2px] border-white text-[1.2rem] font-bold">
      <Link to="/">Home</Link>
    </footer>
    </main>
    )
  return content 
}


export default Login