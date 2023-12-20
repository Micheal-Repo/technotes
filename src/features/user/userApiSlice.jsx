import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";

import {ApiSlice} from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()


export const usersApiSlice = ApiSlice.injectEndpoints({
   endpoints: builder =>({
     
     getUsers : builder.query({
       query:()=> ({
         url:"/users",
     validateStatus:(response, result)=>{
        return response.status === 200 && !result.isError
      },
      }),
       keepUnusedDataFor:5,
       transformResponse :(responseData)=>{
         const loadedUsers = responseData.map(user=> {
           user.id = user._id
           return user
         });
         return usersAdapter.setAll(initialState,loadedUsers)
       },
       
       providesTags:(result,err,arg)=>{
         if(result?.ids){
           return[
             {type:"User",id:"LIST"}
             ,...result.ids.map(id => ({type:"User",id}))
             ]
         }else return [{type:"User",id:"LIST"}]
         
       }
     }),
     
     
     //addUser
     addUser:builder.mutation({
       query:userData=>({
         url:"/users",
         method:"POST",
         body:{...userData}
       }),
       invalidatesTags:(result,error,arg)=>[{type:"User",id:arg.id}]
     }),
     
     //updateUser
     updateUser: builder.mutation({
       query:userData=>({
         url:"/users",
         method:"PATCH",
         body:{...userData}
       }),
      invalidatesTags:(result,error,arg)=>[{type:"User",id:arg.id}]
     }),
     
     //deleteUser
     deleteUser:builder.mutation({
       query:({id})=>({
         url:"/users",
         method:"DELETE",
         body:{id}
       }),
      invalidatesTags:(result,error,arg)=> [{type:"User",id:arg.id}]
     })
 
      
   }),
})

//exporting hooks
export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice

//return query result
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()


//create memoize 
const selectUsersData = createSelector(selectUsersResult, usersResult => usersResult.data)

export const{
  selectAll : selectAllUsers,
  selectById : selectUserById,
  selectIds : selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)