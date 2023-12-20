 import Texting from "./Texting"
import {Routes,Route} from "react-router-dom"
import {ROLES} from "./config/roles"
//component 
import {Layout,Public,DashLayout} from "./components/index" 
import useTitle from "./hooks/useTitle"

//features
import {
  Welcome,
  Login,
  
  //user
  UserList,
  NewUserForm,
  EditUser,
  
  //note
  NoteList,
  NewNote,
  EditNote,
  
  //others
  Prefetch,
  PersistLogin,
  RequireAuth
  
} from "./features/index"

//import Texting from "./Texting"

const App =()=>{
useTitle("dand D")
  return (
    <>
<Routes>
    
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public/>} />
        <Route path="login" element={<Login/>}/>
        <Route path="texting" element={<Texting/>}/>
        
        {/*protected*/}
    <Route element={<PersistLogin/>}>
    <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
        <Route element={<Prefetch/>}>
        {/*Dash*/}
        <Route path="dash" element={<DashLayout/>} >
          <Route index element={<Welcome/>}/>
          
        {/*Notes*/}
        
          <Route path="notes" >
            <Route index element={<NoteList/>}/>
            <Route path="new" element={<NewNote/>}/>
            <Route path=":id" element={<EditNote/>}/>
          </Route>
          
        {/*user*/}
    <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Manager]}/>}>
          <Route path="users" >
            <Route index element={<UserList/>}/>
            <Route path="new" element={<NewUserForm/>}/>
            <Route path=":id" element={<EditUser/>}/>
          </Route>
      </Route>
          
        </Route>
    </Route>
        {/*Dash ends*/}
        </Route>
        </Route>
        {/*protected*/}
      </Route>
</Routes>
</>
    )
}

export default App