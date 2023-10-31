import React from 'react'
import "../styles/maps2.css";
 const Form = () => {
  return (
    <>
    <div class="container">
    <form action="https://formspree.io/f/xvojkjya" method="POST" class="contact-form">
      <h2 class="mb-4">Contact Us</h2>
      <div class="mb-3">
        <label for="email" class="form-label">Your email:</label>
        <input type="email" id="email" name="email" class="form-control" required/>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Your message:</label>
        <textarea id="message" name="message" rows="4" class="form-control" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Send</button>
    </form>
  </div>  
 
  
    
    
    </>
  )
}
export default Form;
