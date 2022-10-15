import React, {useEffect, useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';

export default function Sidebar(props) {

   const [audio, setAudio] = useState({});

    useEffect(() => {
        if(props.kanji.audio){
            setAudio(new Audio(props.kanji.audio.uri));
        }
    }, [props.kanji.audio])

    const play = () => {
        audio.play();
    }

    return (
        <Container className='d-inline-block col-lg-4'>
            <img
                src={props.kanji.strokeOrderGifUri}
                style={{width:'200px', height: '200px'}} 
                className='d-block border mt-2 mx-auto rounded'
            >
            </img>
            {props.kanji.audio !== null? <Button onClick={play} className='d-block mt-3 mx-auto'>Play Audio</Button> : ''}
            <div className='ms-3 mt-3'>
                <p><span className='fw-bold'>Meaning: </span>{props.kanji.meaning}</p>
                <p><span className='fw-bold'>JLPT Level: </span>{props.kanji.jlptLevel}</p>
                <p><span className='fw-bold'>Stroke Count: </span>{props.kanji.strokeCount}</p>
                <p><span className='fw-bold'>Newspaper Frequency Rank: </span>{props.kanji.newspaperFrequencyRank}</p>
                <p><span className='fw-bold'>Kunyomi: </span>{props.kanji.kunyomi}</p>
                <p><span className='fw-bold'>Onyomi: </span>{props.kanji.onyomi}</p>
            </div>
        </Container>
  )
}
