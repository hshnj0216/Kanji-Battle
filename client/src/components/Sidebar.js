import React, {useState} from 'react';
import {Container, Form} from 'react-bootstrap';
import PlayerList from './PlayerList';

export default function Sidebar() {
    const [listType, setListType] = useState('All');
    const [list, setList] = useState([]);

  return (
    <Container className='d-inline-block col-lg-4'>
        <Form>
            <Form.Check type='radio' label='All' name='list-type'></Form.Check>
            <Form.Check type='radio' label='Friends' name='list-type'></Form.Check>
        </Form>
        <PlayerList usersList={list}/>
    </Container>
  )
}
