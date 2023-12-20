import {useSelector} from "react-redux"
import {selectAllUsers} from "../user/userApiSlice"
import NewNoteForm from "./newNoteForm"
import {useGetUsersQuery} from "../user/userApiSlice"

const NewNote =()=>{
 // const users = useSelector(selectAllUsers)
  
  const {users} = useGetUsersQuery("userlist",{
    selectFromResult:({data})=>({
      users : data?.ids.map(id=> data?.entities[id])
    })
  })
  
 //const content= users && users.map(user=> <p>{user.username}</p>)
 
 const content = users ? <NewNoteForm users={users}/> :<p>Loading</p>
 
  return content
}


export default NewNote