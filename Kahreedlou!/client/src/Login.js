import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { MdAccountCircle } from 'react-icons/md'; // Import the React icon
import '../src/styles/losin.css';
import {NavLink} from 'react-router-dom';
import Footer from './components/footer';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3017/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Login successful!');
                const { token, name } = data;
                console.log('Token:', token, 'Name', name);
                localStorage.setItem('authToken', token);
                window.alert(`Welcome, ${name}! Login successful`);
                navigate('/profile');
            } else {
                setMessage(data.message || 'Login failed');
                window.alert('Login unsuccessful!');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred');
        }
    };

    return (
        <>
            <div className="container login-container">
                <h2 className="text-center">Login</h2>
                <div className="text-center user-icon">
                    <MdAccountCircle size={100} color="black" /> {/* Use MdAccountCircle from react-icons */}
                </div>
                <Form onSubmit={loginUser}>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            id="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter password"
                        />
                    </Form.Group>
                    <br/>
                    <Button variant="dark" type="submit" block>
                        Login
                    </Button>
                    <br/>
                    <br/>
                    <NavLink to='/register' style={{color:'black'}}>Create Account</NavLink>
                </Form>
            </div>
            <br />
            <br />
            <Footer />
        </>
    );
}

export default Login;
