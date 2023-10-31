import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import the Email.js package

const Email = () => {
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = async () => {
    emailjs.init("cz9E25FDSiHitH_Gl"); // Replace with your Email.js user ID

    const templateParams = {
      to_email: 'hussainbukhari44@outlook.com',
      total_amount: 1500,
    };

    try {
      await emailjs.send(
        "service_m0eweuw", // Replace with your Email.js service ID
        "template_56o9sgb", // Replace with your Email.js template ID
        templateParams
      );
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div>
      {emailSent ? (
        <p>Email sent successfully!</p>
      ) : (
        <button onClick={sendEmail}>Send Email</button>
      )}
    </div>
  );
};

export default Email;
