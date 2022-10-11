import React, {useRef} from 'react';
import {v4 as uuidV4} from 'uuid';
import { Button, Container, Form } from 'react-bootstrap';

export default function Login({onIdSubmit}) {
  const userRef = useRef();

  function handleSubmit(e){
    e.preventDefault();
    onIdSubmit(useRef.current.value);
  }

  function createNewId(){
    onIdSubmit(uuidV4());
  }

  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Enter your username</Form.Label>
          <Form.Control type='text' ref={userRef} required style={{width: '100%'}} className='mb-3'></Form.Control>
        </Form.Group>
        <Button type='submit' className='me-2'>Login</Button>
        <Button variant='secondary' onClick={createNewId}>Create new id</Button>
      </Form>
     
    </Container>
  )
}
