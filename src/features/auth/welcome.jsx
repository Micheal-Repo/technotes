import {Link}  from "react-router-dom"
import useAuth from "../../hooks/useAuth"


const Welcome =()=>{
  const {username,isManager,isAdmin} = useAuth()
  
  const date = new Date()
  
  const today = Intl.DateTimeFormat("en-NG",{dateStyle:"full",timeStyle:"full"}).format(date)
  
  const content =(
     <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/notes">View techNotes</Link></p>
            

   {(isAdmin || isManager)  &&  <p><Link to="/dash/users">View User Settings</Link></p>}
   
  {(isAdmin || isManager)  &&
  <p><Link to="/dash/users/new">Add user</Link></p>}


        </section>
    )
  
 return content
}

export default Welcome