import {Link} from "react-router-dom"
import {useGetNotesQuery} from "./noteApiSlice"
import Note from "./Note"
import "./note.css"
import {useNavigate} from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const NoteList =()=>{
  const {
    data:notes,
    isSuccess,
    isLoading,
    isError,
    error
  }= useGetNotesQuery("notelist",{
    pollingInterval:15000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  })

const navigate = useNavigate()
const {username,isAdmin,isManager} = useAuth()


let content;
if(isLoading){content = <p>loading...</p>}
if(isError){content = <p>{error?.data?.message}</p>}


if(isSuccess){
  const {ids,entities} = notes
  
  let filteredIds
  if(isAdmin || isManager){
    filteredIds = [...ids]
  }else{
    filteredIds = ids.filter(noteId => entities[noteId].username === username)
  }
  
  const tableContent = ids.length && filteredIds.map(id=> <Note key={id} noteId={id}/>)
  
  
  
    content = (
      <>
      <div className="w-full text-right pt-4 mb-4">
      <Link to="/dash/notes/new" 
      className="bg-slate-700 rounded-xl p-2"
       >
         Add New Note
      </Link>
      </div>
      
      { filteredIds.length ?
      <div className="table-cont w-[18rem]  m-auto  max-sm:overflow-auto p-1 rounded-2xl">
            <table className="mt-8">
              <thead className= "">
                 <tr className="">
                   <th>Title</th>
                   <th>Created</th>
                   <th>Updated</th>
                   <th>Owner</th>
                   <th>Status</th>
                   <th>TicketNo</th>
                   <th>Edit</th>
                   
                 </tr>
              </thead>
              <tbody>
                {tableContent}
              </tbody>
            </table>
            </div>
            :
            <p>You haven't created any not yet</p>
      }
            </>
        )
  
}


  return content 
}


export default NoteList