import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {toast} from 'react-hot-toast'
const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const action = "login"
        try {
            const response = await axios.post(`http://localhost:3000/api/users/${action}`, {
               
                email,
                password
            });
            console.log(response.data);
            
                toast.success(response.data.message);
            
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'An error occurred while signing up.';
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
               <Form.Group>
               <h2>Login Here</h2>
                <div >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      
                    />
                </div>
               </Form.Group>
                <Button type="submit" className='mt-2'>
                    Login
                </Button>
             
                
            </Form>
        </div>
    );
};



export default Signin;
