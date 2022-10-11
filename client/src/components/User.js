import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

export default function User(props) {
  return (
    <ListGroupItem>
        <h6>{props.user.userName}</h6>
    </ListGroupItem>
  )
}
