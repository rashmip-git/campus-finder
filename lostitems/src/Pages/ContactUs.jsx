import React, { useState } from 'react';
import './ContactUs.css'
import emailjs from "emailjs-com";
import time from '../assets/time.png'
import email from '../assets/email.png'
import location from '../assets/location.png'
import call from '../assets/call.png'

const ContactUs = () => {
  const [form,setForm]=useState({
    name:"",
    email:"",
    subject:"",
    message:""
  });

  const handleChange =(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit =(e)=>{
    e.preventDefault();

    emailjs.send(
      "service_118esue",
      "template_8w7ydmn",{
        name:form.name,
        email:form.email,
        subject:form.subject,
        message:form.message,
      },
      "P2bXf53sI4D_dL2qH"
    )
    .then(()=>{
        alert("message sent successfully");
        setForm({name:"",email:"",subject:"",message:""});
      })
      .catch((error)=>{
        console.log(error);
        alert("failed to send");
      }
    )
  };
  return (
    <>
    <div className="contactbox">

      <h1>Contact Us</h1>
      <p>Have questions, suggestions, or need help?
         We're here to assist you in reuniting
          with your lost items.</p>

          <div className="contactbox2">
            <div className="cboxleft">
              <p><b>Send us a message</b></p>
              <p>Fill out the form below and we will respond as soon as possible</p>
              <form onSubmit ={handleSubmit}>
              <div className="continfo">
                <div className="continfoleft">
                <p><b>FULL NAME*</b></p>
                <input type="text" name="name" placeholder='Your full name' value={form.name} onChange={handleChange} required/>

                </div>
                <div className="continforight">
                  <p><b>EMAIL ADDRESS*</b></p>
                  <input type='email' placeholder='your.gmail.com' name="email" value={form.email} onChange={handleChange} required/>
                </div>

              </div>
              <p><b>SUBJECT*</b></p>
              <input type='text' className='sub' name="subject" placeholder='What is this regarding?' value={form.subject} onChange={handleChange} required/>
              <p><b>Message*</b></p>
              <textarea className='tt' name="message" placeholder='please describe your question or concern in detail' value={form.message} onChange={handleChange} required/>
              <button className='sendmsg'>Send Message</button></form>
            </div>
              <div className="cboxright">
                <div className="cboxrightup">
                  <p><b>Get in touch</b></p>
                  <p>Multiple ways to reach out support team</p>
                  <div className="c1">
                    <div className="cimg1">
                      <img src={email} height="40px"/></div>
                      <div className="t1">
                      <p><b>Email Support</b></p>
                      <p>itemslost44@gmail.com</p>
                      <p>We typically respond within 24 hours</p></div>
                  
                  </div>
                  <div className="c2">
                    <div className="cimg2">
                      <img src={call} height="40px"/>
                    </div>
                    <div className="t2">
                    <p><b>Phone support</b></p>
                    <p></p>
                    <p>Monday - Friday, 9 AM - 5 PM</p></div>
                  </div>
                  <div className="c3">
                    <div className="cimg3">
                      <img src={location} height="40px"/>
                    </div>
                    <div className="t3">
                    <p><b>college campus</b></p>
                    <p>JSSSTU</p>
                    <p>Mysore</p></div>
                  </div>
                  <div className="c4">
                    <div className="cimg4">
                      <img src={time} height="40px"/>
                    </div>
                    <div className="t4">
                    <p><b>Query hours</b></p>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p></div>
                  </div>

                </div>
                <div className="cboxrightdown">
                  <h4>Frequently asked question</h4>
                  <p><b>How do I report a found item?</b></p>
                  <p>Simply click "Add Product" and select "I found something" to post details about the item.</p>
                  <p><b>Is this service free?</b></p>
                  <p>Yes! This platform is completely free for all students and campus community members.</p>
                  <p><b>How do i safely meet someone?</b></p>
                  <p>Always meet in public campus locations during daylight hours. Consider bringing a friend.</p>
                </div>
              
            
          </div></div>

    </div>
    </>
  )
}

export default ContactUs