import React from 'react'
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import User from './User';

export default function PlayerList(props) {
  return (
    <ListGroup>
        {props.usersList.map(user => <User user={user}/>)}
    </ListGroup>
  )
}
