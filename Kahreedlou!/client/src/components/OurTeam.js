import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import '../styles/OurTeam.css';

const teamMembers = [
  {
    name: 'John Doe',
    designation: 'CEO',
    imageSrc: 'https://images.unsplash.com/photo-1568316674077-d72ee56de61c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
    },
  },
  {
    name: 'Jane Smith',
    designation: 'Designer',
    imageSrc: 'https://images.unsplash.com/photo-1582610285985-a42d9193f2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1903&q=80',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/janesmith',
      twitter: 'https://twitter.com/janesmith',
    },
  },
  {
    name: 'Stifart',
    designation: 'Developer',
    imageSrc: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80vh',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/janesmith',
      twitter: 'https://twitter.com/janesmith',
    },
  },
  // Add more team members
];

const OurTeam = () => {
  return (
    <div className="our-team-section text-center">
      <marquee direction="left" behavior="scroll" scrollamount="3">
        Our Amazing Team - Meet the Experts
      </marquee>
      <Container>
        
        <h2 className="section-title" style={{color:'gray'}}>Our Team</h2>
        <Row>
          {teamMembers.map((member, index) => (
            <Col md={4} key={index} className="team-member">
              <Card className="card">
                <div className="text-center">
                  <img src={member.imageSrc} alt={member.name} className="member-image" style={{borderRadius:'50%'}} />
                </div>
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Text>{member.designation}</Card.Text>
                  <div className="social-icons">
                    <a href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="social-icon" />
                    </a>
                    <a href={member.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter className="social-icon" />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default OurTeam;
