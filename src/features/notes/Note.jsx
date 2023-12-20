import {selectNoteById} from "./noteApiSlice"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {useGetNotesQuery} from "./noteApiSlice"
import {memo} from "react"

const Note =({noteId})=>{
  
  // const Note = useSelector(state => selectNoteById(state, noteId))
  const {Note} = useGetNotesQuery("notelist",{
   selectFromResult :({data})=> ({
      
   Note : data?.entities[noteId]
     })
  })
  
 const navigate = useNavigate()
  
 if(Note){
   const created = new Date(Note.createdAt).toLocaleString("en-NG",{weekday:"long",day:"numeric",month:"short",year:"numeric"})
    
  const updated = new Date(Note.updatedAt).toLocaleString("en-NG",{ weekday:"long",month:"short", day:"numeric",year:"numeric"})
  
    
  const handleEdit =()=> navigate(`/dash/notes/${noteId}`)
    
    return (
      
      <tr className="table-row">
        <td className="">{Note.title}</td>
       <td className="">{created}</td>
        <td className="">{updated}</td>
        <td className="">{Note.username}</td>
        <td className="">{Note.completed ?"completed" : "In progress"}</td>
        <td className="">{Note.ticket}</td>
        <td className="" >
          <button className="p-2 bg-slate-600 rounded" onClick={handleEdit}>
            Edit
         </button>
      </td>
      </tr>
      
      )
      
      
      
  }else return null
  
}

const memoizeNote = memo(Note)

export default memoizeNote