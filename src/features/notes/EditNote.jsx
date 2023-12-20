import react,{useState} from "react"
import {useParams} from "react-router-dom"
import EditNoteForm from "./EditNoteForm"
import {useSelector} from "react-redux"
import {selectNoteById} from "./noteApiSlice"
import {useGetUsersQuery} from "../user/userApiSlice"
import {useGetNotesQuery} from "./noteApiSlice"
import useAuth from "../../hooks/useAuth"

const EditNote =()=>{
  const {isAdmin,isManager,username} = useAuth()
  
  const {id} = useParams()
  
  //const note = useSelector(state => selectNoteById(state,id))
  const {note} = useGetNotesQuery("notelist",{
    selectFromResult:({data})=>({
      note : data?.entities[id]
    })
  })
  
  const {users} = useGetUsersQuery("userlist",{
    selectFromResult:({data})=>({
      users : data?.ids.map(id=> data.entities[id])
    })
  })
  
  if(!note && !users?.length) return <p>Loading...</p>
  
  if(!isAdmin || !isManager){
    if(note.username !== username){
      return <p>Access denied</p>
    }
    
  }
   
   const content = <EditNoteForm note={note} users={users}/> 
 
    return content
}


export default EditNote;