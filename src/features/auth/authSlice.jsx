import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
  name:"auth",
  initialState:{ token: null, wel:null},
  reducers:{
    setCredential:(state,action)=>{
    //  const {AccessToken} = action.payload
      state.token = action.payload
    },
    
    logOut :(state,action)=>{
      state.token = action.payload
    }
    
  }
})


export const {setCredential,logOut} = authSlice.actions

export default authSlice.reducer

export const setCurrentToken =(state)=> state.auth.token