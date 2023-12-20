import { useState,useEffect } from 'react'
import './App.css'
import axios from "axios"

function Texting() {
  const [Id,setId] = useState("65677881d03e7a106983b270")
  
  
  //user
  const Post=async()=>{
     // alert("he'll ")
    const user = {
      username:"Michele",
      password:"eze4902.",
      roles:["employee"]
    }
    try{
     const res = await axios.post("http://localhost:3000/users",user)
      
    //alert("sent")
     alert(res.message)
    alert("sent2")
     // setId(res.data.id)
    }catch(err){
    //alert("error")
      alert(err?.data?.message)
    alert("error2")
    }
  }
  
  const update =async()=>{
    const user ={
      id:Id,
      username:"francis",
      roles:["staff"],
      active:false
    }
    
    
    try{
    const res = await axios.patch("http://localhost:3000/users",user)
      
      alert(res.data.message)
    }catch(err){
      alert(err.message)
    }
    
  }

const Delete = async()=>{
  
  try{
    const res = await axios.delete("http://localhost:3000/users/6566ee0ce49410d3741658c4")
    alert(res.data.message)
  }catch(err){
    console.log(err.message)
  }
}


const Get = async()=>{
  try{
    const res = await axios.get("http://localhost:3000/users")
    alert(res.data.message)
    //setId(res.data.id)
  }catch(err){
    alert(err.data.message)
  }
}




  //notep
  //get
const Getn=async()=>{

  try{
    const res = await axios.get("http://localhost:3000/notes")
    alert(res.data.message)
  }catch(err){
    alert(err.message)
  }
}


//post
const Postn=async()=>{
  const notes ={
    user:Id,
    title:"Obey",
    text:"Use the edit icon to pin, add or delete clips."
  }
  
  
  try{
    const res = await axios.post("http://localhost:3000/notes",notes)
    alert(res.data.message)
  }catch(err){
    alert(res.message)
    
  }
  
  
}


//patch
const updaten = async()=>{
  const notes ={
    id:"656b80037a2aa52fa5252511",
    user:Id,
    title:"Nice book",
    text:"Use the edit icon to pin, add or delete clips.",
    completed:true
  }
  
  
  try{
    const res = await axios.patch("http://localhost:3000/notes",notes)
    alert(res.data.message)
  }catch(err){
    alert(res.message)
    
  }
}


//Delete
const Deleten =async()=>{
  try{
    const res = await axios.delete(`http://localhost:3000/notes/65678481571389b334d53c5c`)
    alert(res.data.message)
  }catch(err){
    alert(err.message)
  }
}

  return (
    <div>
     welcome {Id}
     <br/>
     <br/>
     <h1 className="text-3xl font-extrabold text-center">User Crud</h1>
     <div className="flex gap-2">
   
     <button onClick={Get} className="bg-green-500 text-white p-4">Get</button>
     
     <button onClick={Post} className="bg-green-500 text-white p-4">post</button>
     
     <button onClick={update} className="bg-green-500 text-white p-4">update</button>
     
     <button onClick={Delete} className="bg-green-500 text-white p-4">delete</button>
    </div>
    
     <br/>
     
     <h1 className="text-3xl font-extrabold text-center">Note Crud</h1>
       <div className="flex gap-2">
   
     <button onClick={Getn} className="bg-green-500 text-white p-4">Get</button>
     
     <button onClick={Postn} className="bg-green-500 text-white p-4">post</button>
     
     <button onClick={updaten} className="bg-green-500 text-white p-4">update</button>
     
     <button onClick={Deleten} className="bg-green-500 text-white p-4">delete</button>
    </div>
    
    
    </div>
  )
}

export default Texting