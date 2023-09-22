import React,{useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contac = () => {
    const [contact,setContact]=useState({
        name:"",
        email:"",
        phone:"",
        message:""
      })

      let name,value
      const handleInput=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setContact({...contact,[name]:value})
      }

const sendData= async(e)=>{
    e.preventDefault()
    const {name,email,phone,message}=contact;
    const  res  =await fetch("http://localhost:8000/contact",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,message
      })
    })
    const data =await res.json();
    if(!data)
    {
        toast.error("Message send failed")
    }
    else if(!name)
    {
        toast.error("Name is required")
    }
    else if(!email)
    {
        toast.error("Email is required")
    }
    else if(!phone)
    {
        toast.error("Phone is required")
    }
    else if(!message)
    {
        toast.error("Message is required")
    }
    else
    {
        toast.success("Message send successfully")
    }
}

  return (
<>
<section class="mb-4 container">
<ToastContainer/>
    <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
    <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>
    <div class="row">
        <div class="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                <div class="row">
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <input type="text" id="name" name="name" value={contact.name} onChange={handleInput} class="form-control"/>
                            <label for="name" class="">Your name</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <input type="text" id="email" name="email" value={contact.email} onChange={handleInput} class="form-control"/>
                            <label for="email" class="">Your email</label>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mb-0">
                            <input type="text" id="phone" name="phone" value={contact.phone} onChange={handleInput} class="form-control"/>
                            <label for="subject" class="">Phone</label>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-md-12">

                        <div class="md-form">
                            <textarea type="text" id="message" name="message" value={contact.message} onChange={handleInput} rows="2" class="form-control md-textarea"></textarea>
                            <label for="message">Your message</label>
                        </div>

                    </div>
                </div>
                

            </form>

            <div class="text-center text-md-left">
                <a class="btn btn-primary" onClick={sendData}>Send</a>
            </div>
            <div class="status"></div>
        </div>

    </div>

</section>
</>
  );
}

export default Contac;
