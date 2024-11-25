import React, { useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
const Chat = () => {
    const [message,setMessage] = useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();
         // Clear previous messages
        const action = 'sendMessage';
        try {
            const response = await axios.post(`http://localhost:3000/api/chats/${action}`, {
                message
            });
            console.log(response.data);
            
                toast.success(response.data.message);
            
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'An error occurred while signing up.';
            toast.error(errorMsg);
        }
    };


  return (
    <Form onSubmit={handleSubmit}>
               <Form.Group>
               <h2>Send Message</h2>
                <div>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
               </Form.Group>
                <Button type="submit" className='mt-2'>
                    Send
                </Button>
             
                
            </Form>
  )
}

export default Chat