import React from 'react';
import "../styles/maps.css";
import Form from './form';
const Maps = () => {
    return (
        <>
            <div className="about-us-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5">
            
                            <p style={{textAlign:'center'}}>
                            Have questions, comments, or feedback? We'd love to hear from you! Use the form below to get in touch with us. Whether you're seeking product information, assistance with an order, or simply want to share your thoughts, our dedicated team is here to assist you. Your inquiries are important to us, and we strive to provide timely and helpful responses. Just fill out the fields with your email and message, then hit the "Send" button. We look forward to connecting with you and providing you with the exceptional service you deserve. Thank you for choosing OStore for all your tech needs!
                            </p>
                            {/* Rest of the text content */}
                        </div>
                        <div className="col-md-6">
                            <div className="google-maps-container">
                                <iframe
                                    title="Google Maps"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890123456!2d-71.06065553897949!3d42.35805169312345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0zNTjCsDAwJzEwLjIiTiA3McKwMzYnNDMuNiJX!5e0!3m2!1sen!2sus!4v1111111111111!5m2!1sen!2sus"
                                    width="100%"
                                    height="450"
                                    frameBorder="0"
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex="0"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Form />
        </>
    )
}
export default Maps;
