
import {useEffect} from "react"
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {useGetUsersQuery} from "./userApiSlice"
import EditUserForm from "./EditUserForm"


const EditUser =()=>{
  const {id} = useParams()
  
  const {user} = useGetUsersQuery("userlist",{
    selectFromResult:({data})=>({
      user : data?.entities[id]
    })
  })
  
  const content = user ? 
  <EditUserForm user={user}/> :
  <p>loading..</p> 
  
 
  
  
  
  return content 
}


export default EditUser