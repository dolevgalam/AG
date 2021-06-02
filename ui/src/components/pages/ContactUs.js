import React, { useState, useEffect, Component } from "react";
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_iRO5lu1u0qDkoRv7VYE84");


const ContactUs = () => {
    
    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_c92u7ae', 'template_0dz5h89', e.target,'user_iRO5lu1u0qDkoRv7VYE84')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }
    
    
    return ( <form className="contact-form" onSubmit={sendEmail}>
    <input type="hidden" name="contact_number" />
    <label>Name</label>
    <input type="text" name="name" />
    <label>Email</label>
    <input type="email" name="email" />
    <label>Phone</label>
    <input type="text" name="phone" />
    <label>Message</label>
    <input type="text" name="message" />
    <input type="submit" value="Send" />
  </form>
  );
};
export default ContactUs;
