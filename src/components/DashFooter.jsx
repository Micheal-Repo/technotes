
import {Link , useNavigate, useLocation} from "react-router-dom"
//import {Link} from "react-router-dom"
//icons
import {FaHome} from "react-icons/fa"
import useAuth from "../hooks/useAuth"


const DashFooter =()=>{
  const {pathname}  = useLocation()
  const Navigate = useNavigate()
 const {username,status} = useAuth()
  
  let goHomeButton = null
  if(pathname !== "/dash"){
   goHomeButton=(
      <button
       className="dash-footer__button icon-button"
      title="Home"
      onClick={()=> Navigate("/dash")}
    >
    <FaHome size={25}/>
    </button>
     )
  }
  
  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current user: {username}</p>
      <p>Status: {status}</p>
      <Link to="/">Home</Link>
    </footer>
    )
  
  return content 
}

export default DashFooter