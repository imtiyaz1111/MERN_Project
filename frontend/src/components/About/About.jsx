import React,{useEffect, useState} from "react";
import "./About.css"
import {useNavigate} from "react-router-dom"

const About = () => {
  const [userData,setUserData]=useState({});
  const  navigate=useNavigate()
  const callAboutPage=async()=>{
    try {
      const res=await fetch("http://localhost:8000/about",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      const data=await res.json();
      console.log(data)
      setUserData(data)
      if(!res.status === 200)
      {
        const error=new Error(res.error)
        throw error;
      }
    } catch (error) {
      console.log(error)
      navigate("/login")
    }
  }
  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>

      {/* about */}
      <div className="container">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
          <div className="progile-img">
          <img
                src="https://avatars.githubusercontent.com/u/118051060?s=400&u=705f17f823bf78f7164bbc7af5b6cb6a6fdbfc09&v=4https://avatars.githubusercontent.com/u/118051060?s=400&u=705f17f823bf78f7164bbc7af5b6cb6a6fdbfc09&v=4"
                alt="avatar"
                
              />
          </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="mt-3 MB-5">
                  RANKING: <span>1/10</span>{" "}
                </p>
                <ul class="nav nav-tabs" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active"  id="home-tab" data-toggle="tab" href="#home" role="tab">
                      About
                    </a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link active"  id="profile-tab" data-toggle="tab" href="#profile" role="tab">
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href="">Website</a> <br />
                <a href="">Instagram</a> <br />
                <a href="">Facebook</a> <br />
                <a href="">Lindin</a> <br />
                <a href="">Github</a> <br />
              </div>
            </div>
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="hhome" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>User ID</label>
                  </div>
                  <div className="col-md-6">
                    <p>16420354651355446465</p>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.name}</p>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.email}</p>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.phone}</p>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-6">
                    <label>Work</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.work}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
