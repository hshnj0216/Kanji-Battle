import React from 'react';
import { Container } from 'react-bootstrap';
import ForceGraph from './ForceGraph';

export default function Dashboard(props) {
  return (
    <Container 
        className='d-inline-flex flex-column col-lg-8 border-end'
    >
       <h2 className='mt-3'>Dashboard</h2> 
       <h4>User id: {props.id}</h4>
       <ForceGraph /> 
    </Container>
  )
}
