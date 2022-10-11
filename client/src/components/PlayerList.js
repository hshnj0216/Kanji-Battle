import React from 'react'
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap'

export default function PlayerList(props) {
  return (
    <ListGroup>
        {props.usersList.map(user => {
            <ListGroupItem>{user.userName}</ListGroupItem>
        })}
    </ListGroup>
  )
}
