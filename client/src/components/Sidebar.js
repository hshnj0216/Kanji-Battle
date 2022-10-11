import React, {useState} from 'react';
import {Container, Form} from 'react-bootstrap';
import PlayerList from './PlayerList';

export default function Sidebar() {
    const playerList = [
        {userName: 'John'}, {userName: 'Mike'}, {userName: 'Peter'}
    ]
    const [listType, setListType] = useState('All');
    const [list, setList] = useState(playerList);

  return (
    <Container className='d-inline-block col-lg-4'>
        <Form className='d-flex justify-content-center border rounded my-3 p-1'>
            <Form.Check type='radio' label='All' name='list-type' className='d-inline-block me-5'></Form.Check>
            <Form.Check type='radio' label='Friends' name='list-type' className='d-inline-block'></Form.Check>
        </Form>
        <PlayerList usersList={list}/>
    </Container>
  )
}
