import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTruck, FaMoneyBillAlt, FaHeadset, FaShieldAlt } from 'react-icons/fa';
import '../styles/services.css';

const Services = () => {
    const services = [
        {
            title: "Fast Delivery",
            description: "Get your products quickly.",
            icon: <FaTruck />,
            image: "https://img.freepik.com/free-vector/way-concept-illustration_114360-1191.jpg?w=1060&t=st=1697460116~exp=1697460716~hmac=032968b045acc9b143146350005f33f9ec9125a31d0e62ee9f827c900c7eac42", // Replace with your image URL
        },
        {
            title: "Money-Back Guarantee",
            description: "Satisfaction guaranteed money back.",
            icon: <FaMoneyBillAlt />,
            image: "https://img.freepik.com/free-vector/cashback-shopping-offer_23-2148472730.jpg?w=740&t=st=1697460477~exp=1697461077~hmac=ffbd29f9ed304b3ed4ac30adec060ae99e3820727062c2ac59c3f0e9db962621", // Replace with your image URL
        },
        {
            title: "Customer Care Support",
            description: "24/7 support for your queries.",
            icon: <FaHeadset />,
            image: "https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1697460647~exp=1697461247~hmac=d250a81aa8118a1932136e3d30c5343507da11ad841ce93f0719c64035e2ad68", // Replace with your image URL
        },
        {
            title: "Secure Payments",
            description: "Safe and secure payment options.",
            icon: <FaShieldAlt />,
            image: "https://img.freepik.com/free-vector/business-woman-inserting-credit-card-into-smartphone_74855-2347.jpg?w=996&t=st=1697460718~exp=1697461318~hmac=8c4d1d63426e120142589fd054cf43e6515944cdb868faac21de4ca1d6beda13", // Replace with your image URL
        },
    ];

    return (
        <Container>
            <h2 className="text-center my-4" style={{fontWeight:'bold',color:'gray'}}>Our Services</h2>
            <Row>
                {services.map((service, index) => (
                    <Col key={index} md={3} sm={6} className="text-center my-3">
                        <div className="service-item">
                            <img src={service.image} alt={service.title} className="service-image" style={{height:'200px',width:'200px'}} />
                            <h4>{service.title}</h4>
                            <div className="service-icon">{service.icon}</div>
                            <p>{service.description}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Services;
