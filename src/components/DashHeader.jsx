import { Link,useNavigate,useLocation} from 'react-router-dom'
import {useSendLogoutMutation} from "../features/auth/authApiSlice"
import {useDispatch} from "react-redux"
import {logOut} from "../features/auth/authSlice"
import {useEffect} from "react"
import useAuth from "../hooks/useAuth"


const DashHeader = () => {
const {isAdmin,isManager} = useAuth()

const [sendLogout,{
  isLoading,
  isSuccess,
  isError,
  error
}]= useSendLogoutMutation()

const navigate = useNavigate()
const dispatch= useDispatch()
const {pathname} = useLocation()

//regex
const DASH_RG= /^\/dash(\/)?$/
const NOTE_RG = /^\/dash\/notes(\/)?$/
const NEW_NOTE_RG = /^\/dash\/notes\/new(\/)?$/
const USER_RG = /^\/dash\/users(\/)?$/
const NEW_USER_RG = /^\/dash\/users\/new(\/)?$/

//button function

const onNewUserClick = ()=> navigate("/dash/users/new")
const onNewNoteClick = ()=> navigate("/dash/notes/new")
const onNoteClick = ()=> navigate("/dash/notes")
const onUserClick = ()=> navigate("/dash/users")


//is successful 
useEffect(()=>{
  if(isSuccess){
    alert("successfully logged out ")
  //  dispatch(logOut(""))
   navigate("/login")
  }
 
},[isSuccess, navigate])

const onLogout =async()=>{
  await sendLogout()
  alert("logged out")
}

let newNoteBtn = null
if(NOTE_RG.test(pathname) && pathname.includes("/dash")){
  newNoteBtn=(
          <button onClick={onNewNoteClick} className="px-2 py-1 bg-slate-700 rounded-lg font-bold text-[1rem] shadow">N-notes
      </button>
    )
}

let newUserBtn = null
if(USER_RG.test(pathname)){
  newUserBtn =(
    
          <button onClick={onNewUserClick} className="px-2 py-1 bg-slate-700 rounded-lg font-bold text-[1rem] shadow">N-User
      </button>)
}

let UserBtn = null
if(isAdmin || isManager){
  if(DASH_RG.test(pathname) || NEW_USER_RG.test(pathname)){
    UserBtn=(
            <button onClick={onUserClick} className="px-2 py-1 bg-slate-700 rounded-lg font-bold text-[1rem] shadow">User
      </button>
      )
  }
  }

let NoteBtn = null
if(DASH_RG.test(pathname) || NEW_NOTE_RG.test(pathname)){
  NoteBtn=(
          <button onClick={onNoteClick} className="px-2 py-1 bg-slate-700 rounded-lg font-bold text-[1rem] shadow">Notes
      </button>
    )
}

const logOutBTn = (
      <button onClick={onLogout} className="px-2 py-1 bg-slate-700 rounded-lg font-bold text-[1rem] shadow">LgO
      </button>
                    
  )
  
 let Buttons = null
 if(isLoading){
   Buttons = <p>Logging Out....</p>
 }else{
   Buttons=(
     <>
       {newUserBtn}
       {newNoteBtn}
       {UserBtn}
       {NoteBtn}
       {logOutBTn}
     </>
     )
 }
  



    const content = (
        <header className="py-2 dash-header">
            <div className="dash-header__container">
                <Link to="/dash">
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add nav buttons later */}
                    
                {Buttons}
                    
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader