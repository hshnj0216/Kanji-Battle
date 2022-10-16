import React, { useMemo, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { ForceGraph2D } from 'react-force-graph';
import loadingStatus from './loadingStatus';
import * as d3 from 'd3';

export default function Dashboard(props) {

    const [audio, setAudio] = useState({});
    const [loadingState, setLoadingState] = useState('');

    useEffect(() => {
        if (props.kanji.audio) {
            setAudio(new Audio(props.kanji.audio.uri));
        }
    }, [props.kanji.audio])

    const play = (e) => {
        e.preventDefault();
        audio.play();
    }

    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(e.target.query.value.trim());
        setQuery('');
    }

    const addCardHandler = () => {
        console.log('id', props.kanji.query);
        const card = {
            id: props.kanji.query,
            meaning: props.kanji.meaning,
            meaningArray: props.kanji.meaning.split(','),
        };
        props.addCard(card);
    }

    return (
        <Container>
            <Form onSubmit={e => handleSubmit(e)} className='d-block px-3 my-2'>
                <Form.Group className='d-inline-block me-3'>
                    <Form.Control
                        name='query'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder='Enter the kanji...'
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' className='align-top me-3'>Search Kanji</Button>
            </Form>
            <Container
                className='d-inline-flex flex-column col-lg-8'
            >
                {(props.data.nodes.length > 0 && props.data.links.length > 0) ?
                    <ForceGraph2D
                        className='mt-3'
                        width={825}
                        height={500}
                        backgroundColor={'#adb5bd'}
                        graphData={props.data}
                        linkDirectionalArrowLength={5}
                        linkDirectionalArrowRelPos={1}
                        linkDirectionalParticles={3}
                        linkOpacity={0.5}
                        nodeRelSize={4}
                        nodeLabel={'meaning'}
                        nodeAutoColorBy={d => props.data.d}
                        nodeCanvasObject={(node, ctx, globalScale) => {
                            const label = node.id;
                            const fontSize = 15;
                            ctx.font = `${fontSize}px Sans-Serif`;
                            const textWidth = ctx.measureText(label).width;
                            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

                            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = node.color;
                            ctx.fillText(label, node.x, node.y);

                            node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                        }}
                        nodePointerAreaPaint={(node, color, ctx) => {
                            ctx.fillStyle = color;
                            const bckgDimensions = node.__bckgDimensions;
                            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                        }}

                    /> :
                    <div style={{ width: '825px', height: '500px' }}>
                        <img src='/rlogo.gif' style={{ width: '100%', height: '100%' }}></img>
                    </div>
                }
            </Container>
            {props.kanji.meaning?
                <Container className='d-inline-block col-lg-4 border rounded' style={{verticalAlign: 'top'}}>
                    <img
                        src={props.kanji.strokeOrderGifUri}
                        style={{ width: '150px', height: '150px' }}
                        className='d-block border mt-2 mx-auto rounded'
                    >
                    </img>
                    {props.kanji.audio !== null ? <Button onClick={(e) => play(e)} className='d-block mt-3 mx-auto'>Play Audio</Button> : ''}
                    <div className='mt-3 mx-auto'>
                        <p className='fw-bold text-light bg-dark rounded p-1 m-1'>Meaning: {props.kanji.meaning}</p>
                        <p className='fw-bold text-light bg-secondary rounded p-1 m-1'>JLPT Level: {props.kanji.jlptLevel}</p>
                        <p className='fw-bold text-light bg-dark rounded p-1 m-1'>Stroke Count:{props.kanji.strokeCount}</p>
                        <p className='fw-bold text-light bg-secondary rounded p-1 m-1'>Newspaper Frequency Rank: {props.kanji.newspaperFrequencyRank}</p>
                        <p className='fw-bold text-light bg-dark rounded p-1 m-1'>Kunyomi: {props.kanji.kunyomi}</p>
                        <p className='fw-bold text-light bg-secondary rounded p-1 m-1'>Onyomi: {props.kanji.onyomi}</p>
                    </div>
                    <div className='text-end'>
                        <Button className='my-3' onClick={addCardHandler} disabled>Add to Deck</Button>
                    </div>
                </Container>
                 :
                <Container className='d-inline-flex flex-column col-lg-4 border rounded bg-secondary h-25 p-3' style={{verticalAlign: 'top'}}>
                    <h3 className='text-light fs-1 text-center'>Search for a kanji to get its data</h3>
                </Container>
            }       
        </Container>
    )
}
