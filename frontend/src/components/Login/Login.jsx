import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const  navigate=useNavigate()
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const userLogin=async (e)=>{
    e.preventDefault()
    const res=await fetch("https://mern-project-bice.vercel.app/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    })
    const data=await res.json();
    if(res.status === 400 || !data)
    {
      toast.error("Invalid Details")
    }
    else
    {
      localStorage.setItem("token",JSON.stringify(data))
      toast.success("Login Successfull")
      console.log("Registration Successfull")
      navigate("/")
      
    }
 
  }
  return (
    <>
     <ToastContainer/>
    <section class="vh-100 " style={{backgroundcolor: "#eee"}}>
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style={{borderradius: "25px"}}>
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                  <form method='POST' class="mx-1 mx-md-4" >
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="form3Example3c" class="form-control" />
                        <label class="form-label" for="form3Example3c">Your Email</label>
                      </div>
                    </div>
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="form3Example4c" class="form-control" />
                        <label class="form-label" for="form3Example4c">Password</label>
                      </div>
                    </div>
  
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" onClick={userLogin} class="btn btn-primary btn-lg">Login</button>
                    </div>
  
                  </form>
  
                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg"
                    class="img-fluid" alt="Sample image"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}

export default Login;
