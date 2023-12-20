import {useState,useEffect} from "react"
import {ROLES} from "../../config/roles"
import {useSelector} from "react-redux"
import {useUpdateUserMutation,useDeleteUserMutation} from "./userApiSlice"
import {useNavigate} from "react-router-dom"

const EditUserForm =({user})=>{
  
  const [updateUser,{
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateUserMutation()
  const [deleteUser,{
    isLoading:isDeLoading,
    isSuccess:isDelSuccess,
    isError:isDelError,
    error:Delerror
  }] = useDeleteUserMutation()
  
  
  const [userData,setUserData] = useState({
    username:user.username,
    password:user.password,
    roles:user.roles,
    active:user.active
  })
  const {username,password,roles,active}= userData
  
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(isSuccess || isDelSuccess){
      setUserData({
        username:"",
        password:"",
        roles:[],
        active:active
      })
      navigate("/dash/users")
    }
  },[isSuccess,navigate,isDelSuccess])
  
  //ROLeS
  const Options= Object.values(ROLES).map(role =>{
    return (
      <option value={role} key={role}>
        {role}
      </option>
      )
  })
  
  //onUsernameChange
  const onUsernameChange =(e)=>{
    const username = e.target.value
    setUserData({...userData, username})
  }
  
  //onPasswordChange
  const onPasswordChange =(e)=>{
    const password = e.target.value
    setUserData({...userData, password})
  }
  
  //onActiveChange
  const onActiveChange=()=> {
    setUserData({...userData, active:!active})
  }
  
  //onRolesChange
  const onRolesChange =(e)=>{
    const SelectedOpt = e.target.selectedOptions
    
    const roles = Array.from(SelectedOpt,(option)=> option.value)
    
    setUserData({...userData,roles})
  }
  
  const canSave=[username,roles?.length].every(Boolean) && !isLoading
  
  //handleUpdate
  const handleUpdate = async(e)=>{
    e.preventDefault()
    if(canSave){
      await updateUser({
        id:user.id,
        username,
        password,
        roles,
        active 
      })
    
    }
  }
  
  const handleDelete = ()=>{
    deleteUser({id:user.id})
  }
  
  const content=(
   <div >
       <p className="text-red-300 italic">{error?.data.message}</p>
       <form onSubmit={handleUpdate}  className="flex flex-col gap-3 px-8 justify-center items-center border-2 border-white rounded-xl py-4 my-4 ">
         <h1>Edit User </h1>
          
         <div>
           <label htmlFor="username" className="">
             Edit Username 
           </label>
           <input
           id="username"
           name="username"
           type="text"
           className="bg-slate-700 rounded-xl p-2 my-2 border-b-2 border-white border-t-2 outline-none" 
           value={username}
           onChange={onUsernameChange}
           />
         </div>
         
         <div>
           <label htmlFor="password">
             Edit password
           </label>
           <input
           id="password"
           name="password"
           type="text"
           className="bg-slate-700 rounded-xl p-2 my-2 border-b-2 border-white border-t-2 outline-none" 
           value={password}
           onChange={onPasswordChange}
           />
         </div>
         
         <div className="flex justify-between items-center gap-4 w-full bg-slate-700 px-2 py-2 rounded-lg my-3">
           <label htmlFor="active" className="font-bold text-[0.9rem]">Active Status
           </label>
           
           <div className="flex items-center gap-1">
             <label htmlFor="active" className="font-medium text-[0.8rem] bg-slate-800 px-2 py-1 rounded">
             {active ? "active" : "in-active"}
             </label>
             <input
             id="active"
            type="checkbox"
            checked={active}
            onChange={onActiveChange}
             />
            </div>
         
         </div>
         
         <div className="flex flex-col gap-2 w-full">
         <label>Assign Roles</label>
            <select
            id="roles"
            name="roles"
            multiple={true}
            size="3"
            className="bg-slate-700 p-2 rounded"
           value={roles}
           onChange={onRolesChange}
            >
             {Options} 
            </select>
            <div className="w-full p-2 bg-slate-700 rounded-xl flex flex-col  items-start">
            <p className="font-bold">Assigned Role(s)</p>
            <div>
             {roles?.map(role=> <p>{role}</p>)}
            </div>
              
            </div>
         </div>
         <div className="w-full flex justify-between">
         <button type="submit" disabled ={!canSave} className={`rounded-xl mt-3 px-6 py-2  ${canSave ? "bg-slate-700":"bg-gray-500 text-gray-600"} font-bold`}>
         {isLoading?"updating..":"update"}
         </button>
         <button onClick={handleDelete} type="button" className={`rounded-xl mt-3 px-6 py-2  ${!isDeLoading ? "bg-slate-700":"bg-gray-500 text-gray-600"} font-bold`}>
         {isDeLoading?"Deleting..":"Delete"}
         </button>
       </div>
       </form>
    </div>
    )
  return content 
}


export default EditUserForm