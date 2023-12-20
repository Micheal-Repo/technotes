import {useSelector} from "react-redux"
import {selectUserById,selectAllUsers} from "./userApiSlice"

const Userr =({userId})=>{
  const user= useSelector(state=> selectUserById(state,userId))
  
  const users= useSelector(state=> selectAllUsers(state))
  
  const content=(
    <div>
       {user.username}
       {users.map(user => <p>{user.id}</p>)}
    </div>
    )
  return content 
}


export default Userr