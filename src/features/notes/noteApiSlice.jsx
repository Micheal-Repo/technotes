import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";

import {ApiSlice} from "../../app/api/apiSlice"

const notesAdapter = createEntityAdapter({
  sortComparer:(a,b)=> (a.completed === b.completed) ? 0 : a.completed ? 1 : -1})
const initialState = notesAdapter.getInitialState()


export const notesApiSlice = ApiSlice.injectEndpoints({
   endpoints: builder =>({
     
     getNotes : builder.query({
       query:()=> ({
         url:"/notes",
       validateStatus:(response, result)=>{
         return response.status === 200 && !result.isError
       },
       }),
       
       keepUnusedDataFor:5,
       transformResponse :(responseData)=>{
         const loadedNotes = responseData.map(note=> {
           note.id = note._id
           return note
         });
         return notesAdapter.setAll(initialState,loadedNotes)
       },
       
       providesTags:(result,err,arg)=>{
         if(result?.ids){
           return[
             {type:"Note",id:"LIST"}
             ,...result.ids.map(id => ({type:"Note",id}))
             ]
         }else{
           return [{type:"Note",id:"LIST"}]
         }
       }
     }),
     
     //addNotes
     addNote:builder.mutation({
       query:noteData=>({
         url:"/notes",
         method:"POST",
         body:{...noteData}
       }),
       invalidatesTags:[{type:"Note",id:"LIST"}]
     }),
     
     //update 
     updateNote:builder.mutation({
       query:noteData=>({
         url:"/notes",
         method:"PATCH",
         body:{...noteData}
       }),
       invalidatesTags:(result,error,arg)=>[{type:"Note",id:arg.id}]
     }),
     
     //delete
     deleteNote:builder.mutation({
       query:noteData=>({
         url:"/notes",
         method:"DELETE",
         body:{...noteData}
       }),
       invalidatesTags:(result,error,arg)=>[{type:"Note",id:arg.id}]
     })
     
   })
})

//exporting hooks
export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice

//return query result
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()


//create memoize 
const selectNotesData = createSelector(selectNotesResult, notesResult => notesResult.data)

export const{
  selectAll : selectAllNotes,
  selectById : selectNoteById,
  selectIds : selectNoteIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)