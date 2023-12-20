import {store} from "../../app/store"
import {usersApiSlice} from "../user/userApiSlice"
import {notesApiSlice} from "../notes/noteApiSlice"
import {useEffect} from "react"
import {Outlet} from "react-router-dom"



const Prefetch =()=>{
  
  
  
  useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch("getNotes","notelist",{force:true}))
        store.dispatch(usersApiSlice.util.prefetch("getUsers","userlist",{force:true}))
        // console.log('subscribing')
        // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        // return () => {
        //     console.log('unsubscribing')
        //     notes.unsubscribe()
        //     users.unsubscribe()
        // }
    }, [])
  
  return <Outlet/>
}


export default Prefetch