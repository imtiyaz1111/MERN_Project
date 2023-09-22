import React,{useEffect,useState} from 'react';
import "./Home.css"

const Home = () => {
  const [userName,setUserName]=useState('');
  const [show ,setShow]=useState(false)
  const userHomePage=async()=>{
    try {
      const res=await fetch("http://localhost:8000/getdata",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      })
      const data=await res.json();
      console.log(data)
      setUserName(data.name)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    userHomePage();
  }, []);
  return (
    <>
    <div className="home">
    <p className='pt-5'>Welcome</p>
    <h1>{userName}</h1>
    <h1>{show ? 'Happy, to see you back' : 'We are the MERN Developer'}</h1>
    </div>
    </>
  );
}

export default Home;
