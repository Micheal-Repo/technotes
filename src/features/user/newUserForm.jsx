import react,{useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useAddUserMutation} from "./userApiSlice"
import {ROLES} from "../../config/roles"

const newUserForm =()=>{
  
  const [addUser,{
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddUserMutation()
  
  const navigate = useNavigate()
  const USER_REGEX = /^[A-z]{3,20}$/
  const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
  //userData
  const [userData,setUserData]=useState({
    username:"",
    validateUsername: false,
    password:"",
    validatePassword:false,
    roles:["Employee"]
  })
  
  
  //Easch userData
  const {username,validateUsername,password,validatePassword,roles} = userData
  
  //useEffect username 
  useEffect(()=>{
    const validateUsername = USER_REGEX.test(username)
    
    setUserData({...userData,validateUsername})
  },[username])
  
  //password
  useEffect(()=>{
    const validatePassword = PWD_REGEX.test(password)
     
   setUserData({...userData,validatePassword})
        
    
  },[password])
  
  //is successful 
  useEffect(()=>{
    if(isSuccess){
      alert("submitted successfully")
      setUserData({...userData,username:"",password:"",roles:[]})
      navigate("/dash/users")
    }
  },[isSuccess])
  
  
  //onUserNameChange
  const onUserNameChange =async(e)=>{
    const username = e.target.value
   setUserData({...userData,username})
  }
  
  //onPasswordChange
  const onPasswordChange =async(e)=>{
    const password = e.target.value
   setUserData({...userData,password})
  }
  
  //onrolesChange
  const onRolesChange =async(e)=>{
    const selectedOpt= e.target.selectedOptions
    const roles = Array.from(selectedOpt,(option)=> option.value)
    
    
  setUserData({...userData,roles})
  }
  
  
  //Roles Array
  const Options = Object.values(ROLES).map(role=> 
         <option
           key={role} 
           value={role}
        >{role}</option>
    )
  
  
  
  
  const canSave =[username,password,roles.length].every(Boolean) && !isLoading
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    
    if(canSave){
     
     // alert("can save ")
    addUser({username,password,roles})
      
    }
  }
  
 
  
  return(
    <div >
       <p className="text-red-300 italic">{error?.data?.message}</p>
       <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-8 justify-center items-center border-2 border-white rounded-xl py-4 my-4 ">
         <h1>Add New User: {username}</h1>
          
         <div>
           <label htmlFor="username" className="">
             Enter Username 
           </label>
           <input
           id="username"
           name="username"
           type="text"
           className="bg-slate-700 rounded-xl p-2 my-2 border-b-2 border-white border-t-2 outline-none" 
           value={username}
           onChange={onUserNameChange}
           />
         </div>
         
         <div>
           <label htmlFor="password">
             Enter password
           </label>
           <input
           id="password"
           name="password"
           type="password"
           className="bg-slate-700 rounded-xl p-2 my-2 border-b-2 border-white border-t-2 outline-none" 
           value={password}
           onChange={onPasswordChange}
           />
         </div>
         
         <div className="flex flex-col gap-2 w-full">
         <label>Assign Roles</label>
            <select
            id="roles"
            name="roles"
            multiple={true}
            size="1"
            value={roles}
            onChange={onRolesChange}
            className="bg-slate-700 p-2 rounded"
           
            >
              {Options}
            </select>
            <div className="w-full p-2 bg-slate-700 rounded-xl flex flex-col  items-start">
            <p className="font-bold">Selected Roles</p>
            <div>
            </div>
              {roles.map(role=> <p>@{role}</p>)}
            </div>
         </div>
         <button type="submit" disabled ={!canSave} className={`rounded-xl mt-3 px-6 py-2 ${canSave ? "bg-slate-700" : "bg-gray-500 text-gray-600"} font-bold`}>{isLoading?"submitting...." : "Submit"}</button>
       </form>
    </div>
    
    )
}


export default newUserForm;