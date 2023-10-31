import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="text-center" style={{ backgroundColor: 'lightgrey' }}>
      <footer className="py-5">
        <Row>
          <Col sm={6} md={2} className="mb-3">
            <h5>Shop Categories</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/mobiles" className="nav-link p-0 text-muted">
                  Mobiles
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/laptops" className="nav-link p-0 text-muted">
                  Laptops
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/earbuds" className="nav-link p-0 text-muted">
                  Earbuds
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/accessories" className="nav-link p-0 text-muted">
                  Accessories
                </a>
              </li>
            </ul>
          </Col>

          <Col sm={6} md={2} className="mb-3">
            <h5>Support</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/contact" className="nav-link p-0 text-muted">
                  Contact
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/faq" className="nav-link p-0 text-muted">
                  FAQs
                </a>
              </li>
            </ul>
          </Col>

          <Col sm={6} md={2} className="mb-3">
            <h5>About Us</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/about" className="nav-link p-0 text-muted">
                  Our Story
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/team" className="nav-link p-0 text-muted">
                  Our Team
                </a>
              </li>
            </ul>
          </Col>

          <Col md={5} className="mb-3" md={{ offset: 1 }}>
            <Form>
              <h5>Subscribe to Our Newsletter</h5>
              <p>Stay updated with the latest tech deals and offers from KahreedLou!</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2 justify-content-center">
                <Form.Group controlId="newsletter1">
                  <Form.Control type="email" placeholder="Email address" />
                </Form.Group>
                <Button variant="dark" type="submit">
                  Subscribe
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        <div className="container text-center">
          <ul className="list-unstyled d-flex justify-content-center">
            <li className="ms-3">
              <a className="link-dark" href="#">
                <FaTwitter />
              </a>
            </li>
            <li className="ms-3">
              <a className="link-dark" href="#">
                <FaInstagram />
              </a>
            </li>
            <li className="ms-3">
              <a className="link-dark" href="#">
                <FaFacebook />
              </a>
            </li>
          </ul>
          <br />
          <p>&copy; {new Date().getFullYear()} KahreedLou! All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
