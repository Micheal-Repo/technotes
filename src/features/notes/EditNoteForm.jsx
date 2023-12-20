import {useState,useEffect} from "react"
import {useSelector}  from "react-redux"
import {useDeleteNoteMutation,useUpdateNoteMutation} from "./noteApiSlice"
import {useNavigate} from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const EditNoteForm =({note,users})=>{
  const navigate = useNavigate()
  const {isAdmin,isManager} = useAuth()
  
  const [updateNote,{
    isLoading,
    isSuccess,
    isError,
    error
  }]=useUpdateNoteMutation()
  
  const [deleteNote,{
    isLoading:isDelLoading,
    isSuccess:isDelSuccess,
    isError:isDelError,
    error:delerror
  }]=useDeleteNoteMutation()
  
  
  const [noteData,setNoteData]=useState({
    id:note.id,
    user:note.user,
    title:note.title,
    text:note.text,
    completed:note.completed
  })
  
  const {id,user,title,text,completed} = noteData
  
  const Options = users.map(user=>(
    <option value={user.id} key={user.id}>
      {user.username}
    </option>
    ))
  
  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
  
  //Change Event
  
  const onCompletedChange=()=> {
    setNoteData({...noteData,completed:!completed})
  }
  
  const onTitleChange=(e)=>{
    const title = e.target.value
    setNoteData({...noteData,title})
  }
  
  const onTextChange=(e)=>{
    const text = e.target.value
    setNoteData({...noteData,text})
  }
  
  const onUserChange=(e)=>{
    const user = e.target.value
    setNoteData({...noteData,user})
  }
  
    const canUpdate = [title,text,user].every(Boolean) && !isLoading
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(canUpdate){
      updateNote(noteData)
    }
  }
  
  const handleDelete=()=>{
    deleteNote({id})
  }
  
  let DeleteButton = null
  if(isAdmin || isManager){
    DeleteButton =(
               <button type="button"  className={`px-3 font-bold py-2 rounded bg-slate-700 ${!isDelLoading ? "bg-slate-700" : "bg-slate-600 text-gray-400"}`}
         onClick={handleDelete}>
           {!isDelLoading ? "Delete" : "Deleting..."}
         </button>
      )
  }
  
  //isSuccess
  useEffect(()=>{
    if(isSuccess || isDelSuccess){
     navigate("/dash/notes")
    }
  },[isSuccess,navigate,isDelSuccess])
  
  const content=(
    <div>
      <p className="text-red-300 italic">{errContent}</p>
      
       <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-8 justify-center items-center border-2 border-white rounded-xl py-4 my-4 ">
         <h1>Add New Note</h1>
          
         <div>
           <label htmlFor="title" className="font-bold">
            Enter Title
           </label>
           <input
           id="title"
           name="title"
           type="text"
           className="bg-slate-700 rounded-xl p-2 my-2 border-b-2 border-white border-t-2 outline-none" 
           value={title}
           onChange={onTitleChange}
           />
         </div>
         
         <div>
           <label htmlFor="text" className="font-bold">
             Enter Description
           </label>
           <textarea
           id="text"
           name="text"
           type="text"
           
           className="bg-slate-700 rounded-xl p-2 my-2 border-b-2 border-white border-t-2 outline-none w-full h-[10rem]" 
           
           value={text}
           onChange={onTextChange}
           />
         </div>
         
         <div className="w-full rounded-lg border-[1px] border-slate-700 p-2 flex flex-col gap-2 justify-between items-center my-2 relative">
           <label className="font-bold text-[1.5rem]">Work Status</label>
           <span className="px-[1rem] py-[0.6rem] bg-slate-800 rounded-xl">{completed ? "completed" : "In progress...."}</span>
           <input type="checkbox" className="absolute top-0 right-0 w-[1.5rem] h-[1.5rem]"
           checked={completed}
           onChange={onCompletedChange}
           />
         </div>
         
         <div>
           <label htmlFor="user" className="font-bold">
           Employee Assigned To
           </label>
           <select className="bg-slate-700 rounded-xl p-2 my-2 border-b-2 border-white border-t-2 outline-none w-full"
           value={user}
           onChange ={onUserChange}>
                {Options}
           </select>
         </div>
         
         <div className="w-full flex justify-between mt-3">
         <button type="submit" disabled={!canUpdate} className={`px-3 font-bold py-2 rounded bg-slate-700 ${canUpdate ? "bg-slate-700" : "bg-slate-600 text-gray-400"}`}>
           {!isLoading ? "Update" : "Updating..."}
         </button>
         {DeleteButton}
    </div>
       
       </form>
    </div>
    )
  return content 
}


export default EditNoteForm