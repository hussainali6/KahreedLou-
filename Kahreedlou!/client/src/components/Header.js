import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Header.css';

const Header = ({ mydata }) => {
  const { name } = mydata;
  return (
    <>
      <header className="header container text-center">
        <Container>
          <Row>
          
            <Col md={6} className="header-content">
              <h1 style={{ color: 'gray' }}>Welcome to KahreedLou!</h1>
              <p>Discover amazing products and more!</p>
              <Link to="/products" className="btn btn-dark btn-lg">
                Explore Now
              </Link>
            </Col>
            {/* Header Image */}
            <Col md={6} className="header-image">
              <img
                src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=1060&t=st=1698231805~exp=1698232405~hmac=ddb69b44ff6d10de06c1731fb8af8445f59bb2231d77ca93d9277b791ca107aa"
                alt="Header Image"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </header>
      <br/>
      <div class="container">
    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
            <img src="https://img.freepik.com/free-vector/brainstorming-concept-landing-page_23-2148298375.jpg?w=1060&t=st=1698232507~exp=1698233107~hmac=7c86b618f8281fdc5068f85f5353855aeadef8e70f6a46f13eac9c83aa1b4969" alt="About Us Image" class="img-fluid"/>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
            <h2>About Us</h2>
            <p>
                Welcome to Kahreedlou! We are an online destination for all your shopping needs.
                Our mission is to provide you with a seamless and enjoyable shopping experience.
                Whether you're looking for the latest fashion trends, electronics, home decor, or more,
                we've got you covered.
            </p>
            <p>
                At Kahreedlou, we value quality, affordability, and customer satisfaction. We source
                products from trusted suppliers and ensure that they meet our high standards.
                Customer service is at the heart of what we do, and we're here to assist you every
                step of the way.
            </p>
            <p>
                Thank you for choosing Kahreedlou as your preferred online shopping destination.
                We look forward to serving you and making your shopping experience exceptional.
            </p>
        </div>
    </div>
</div>
    </>
  );
};

export default Header;
