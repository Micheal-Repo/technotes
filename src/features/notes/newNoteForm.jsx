import {useState,useEffect} from "react"
import {useAddNoteMutation} from "./noteApiSlice"
import {useNavigate} from "react-router-dom"

const NewNoteForm =({users})=>{
  //add botes
const [addNotes,{
  isLoading,
  isSuccess,
  isError,
  error
}] = useAddNoteMutation()


  //userData
  const [noteData,setNoteData] = useState({
    user:"",
    title:"",
    text:"",
  })
  
  const {user,title,text} = noteData
  
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(isSuccess){
      setNoteData({
        user:"",
        title:"",
        text:"",
      })
    navigate("/dash/notes")
    }
  },[isSuccess, navigate])
  
  //titleonChange
  const onTitleChange =(e)=>{
    const title = e.target.value
    setNoteData({...noteData,title})
  }
  
  //onTextChange
  const onTextChange =(e)=>{
    const text = e.target.value
    setNoteData({...noteData,text})
  }
  
  //canSubmit
  const canSubmit = [title,text,user,user !== "null"].every(Boolean) && !isLoading

  //onSelectChange
  const onSelectChange =(e)=>{
    const userId = e.target.value
   // alert(userId)
    setNoteData({...noteData,user:userId})
    
  }
  
  
 //handleSubmit
 const handleSubmit=(e)=>{
    e.preventDefault()
    if(canSubmit){
      addNotes({user,title,text})
    }
 }
  
  //SelectOption
  const Options =users.map(user=>(
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
      ))
  
  const content=(
    <div>
      <p className="text-red-300 italic">{error?.data?.message}</p>
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
         
         <div>
           <label htmlFor="user" className="font-bold">
            Assign Note To Employee 
           </label>
           <select className="bg-slate-700 rounded-xl p-2 my-2 border-b-2 border-white border-t-2 outline-none w-full" onChange={onSelectChange}>
           <option value={"null"}>Select Employee</option>
                {Options}
           </select>
         </div>
         <button disabled={!canSubmit} className={`px-3 font-bold py-2 rounded bg-slate-700 ${canSubmit ? "bg-slate-700" : "bg-slate-600 text-gray-400"}`}>
           {!isLoading ? "Submit" : "Submiting..."}
         </button>
       
       </form>
    </div>
    )
  return content 
}


export default NewNoteForm