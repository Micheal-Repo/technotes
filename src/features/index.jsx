import Welcome from "./auth/welcome"
import Login from "./auth/Login"
import Prefetch from "./auth/Prefetch"
import PersistLogin from "./auth/persistLogin"
import RequireAuth from "./auth/RequireAuth"

import UserList from "./user/userList"
import NewUserForm from "./user/newUserForm"
import EditUser from "./user/EditUser"

import NoteList from "./notes/noteList"
import NewNote from "./notes/newNotes"
import EditNote from "./notes/EditNote"


export{
  Welcome,
  Login,
  
  //notes
  NoteList,
  NewNote,
  EditNote,
  
  //uset
  UserList,
  NewUserForm,
  EditUser,
  
  //others
  Prefetch,
  PersistLogin,
  RequireAuth
}