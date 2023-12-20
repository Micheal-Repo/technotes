
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setCredential} from "../../features/auth/authSlice"
import {useNavigate} from "react-router-dom"

const baseQuery = fetchBaseQuery({
  baseUrl :  "https://technotes-api-3mcq.onrender.com",
  credentials: "include",
  prepareHeaders:(headers,{ getState })=>{
    
    const token = getState().auth.token
    if(token){
         headers.set("authorization",`Bearer ${token}`)
    }
    
    return headers
  }
})

const baseQueryWithReauths = async (args, api, extraOptions) => {
  
  
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)

    // If you want, handle other status codes, too
    if (result?.error?.status === 403) {
        //alert('sending refresh token')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult?.data?.token) {
            // store the new token 
         await api.dispatch(setCredential(refreshResult.data.token))

            // retry original query with new access token
           result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "login expired"
            }
            return refreshResult
        }
    }

    return result
}


const baseQueryWithReauth =async(args,api,extraOptions)=>{
  
//  const navigate = useNavigate()
  
  let result = await baseQuery(args,api,extraOptions)
  
  if(result?.error?.status === 403){
    
      
  
      //return refreshResult
      
    }
    
  
  return result 
}

export const ApiSlice = createApi({
  reducerPath: 'Technotes',
  baseQuery:baseQueryWithReauths,
  tageTypes:["Note","User"],
  endpoints: (builder) => ({}),
})


