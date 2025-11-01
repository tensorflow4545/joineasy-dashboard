"use client"

import {useState,useEffect} from "react";
import { getStoredUser } from "@/lib/storage";
import Login from "@/components/Login";
import StudentDash from "@/components/StudentDash";
import AdminDash from "@/components/AdminDash";
export default function Home() {
  const [currentUser,setCurrentUser]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);

  useEffect(()=>{
    const user=getStoredUser();
    if(user){
      setCurrentUser(user);
    }else{
      setError(true);
    }
    setLoading(false);
  },[])

  

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if(!currentUser){
    return <Login onLogin={setCurrentUser}/>
  }

  // if(error){
  //   return(
  //     <div className="min-h-screen flex items-center justify-center">
  //         <p className="text-lg text-red-700">Something went wrong while logging in</p>
  //     </div>
  //   )
  // }

  if(currentUser.role==='student'){
    return <StudentDash user={currentUser} onLogout={()=> setCurrentUser(null)}/>
  }


  return <AdminDash user={currentUser} onLogout={()=>setCurrentUser(null)}/>
}
