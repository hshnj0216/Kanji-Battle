import React, { useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import ForceGraph from './ForceGraph';
import * as d3 from 'd3';

export default function Dashboard(props) {

    const [query, setQuery] = useState('');

    console.log(props.data)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.query.value);
        props.onSubmit(e.target.query.value.trim());
        setQuery('');
    }

    return (
        <Container
            className='d-inline-flex flex-column col-lg-8 border-end'
        >
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group className='d-inline-block me-3'>
                    <Form.Control
                        name='query'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit'>Find Kanji</Button>
            </Form>
            {props.data.nodes.length > 0 && props.data.links.length > 0? 
                <ForceGraph data={props.data}/> : 
                <div></div>
            }
        </Container>
    )
}
