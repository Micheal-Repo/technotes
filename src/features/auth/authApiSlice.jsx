import {ApiSlice} from "../../app/api/apiSlice"
import {logOut,setCredential} from "./authSlice"

export const authApiSlice = ApiSlice.injectEndpoints({
  endpoints : builder => ({
     login : builder.mutation({
       query:(credentials)=>({
         url:"/auth",
         method:"POST",
         body:{...credentials}
       })
     }),
     
     sendLogout : builder.mutation({
       query:()=>({
         url:"/auth/logout",
         method:"POST"
       }),
       async onQueryStarted(arg,{dispatch,queryFufilled}){
         try{
         
     //  await  dispatch(logOut("Touch and hold a clip to pin it. Unpinned clips will be deleted after 1 hour."))
         
         await queryFufilled
         
         setTimeout(()=>{
           
         dispatch(apiSlice.util.resetApiState())
         },1000)
         
         }catch(err){
           console.log(err)
         }
       }
     }),
     
     refresh : builder.mutation({
       query:()=>({
         url:"/auth/refresh",
         method:"GET",
       }),
      
     }),
     
     
  })
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation
} = authApiSlice