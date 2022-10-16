import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { Container, Button } from "react-bootstrap";
import CardDeck from './CardDeck';
import * as d3 from 'd3';

export default function App() {

  const [linksList, setLinksList] = useState([]);
  const [nodesList, setNodesList] = useState([]);
  const [kanji, setKanji] = useState({});
  const [examples, setExamples] = useState([]);
  const [partsData, setPartsData] = useState([]);
  const [query, setQuery] = useState('');
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    getKanjiData();
  }, [query, deck])

  const getKanjiData = async () => {
    fetch(`http://localhost:4000/data/${query}`)
      .then(res => res.json())
      .then(data => {

        //extract and pack only the desired data
        const kanjiData = {
          query: data.kanjiData.query,
          meaning: data.kanjiData.meaning,
          jlptLevel: data.kanjiData.jlptLevel,
          strokeCount: data.kanjiData.strokeCount,
          newspaperFrequencyRank: data.kanjiData.newspaperFrequencyRank,
          parts: data.kanjiData.parts,
          strokeOrderGifUri: data.kanjiData.strokeOrderGifUri,
          kunyomi: data.kanjiData.kunyomi.toString(),
          kunyomiExample: JSON.stringify(data.kanjiData.kunyomiExamples[0]),
          onyomi: data.kanjiData.onyomi.toString(),
          onyomiExample: JSON.stringify(data.kanjiData.onyomiExamples[0]),
          radical: data.kanjiData.radical,
          audio: (data.audioData) ? data.audioData[0] : null
        }
        getPartsData(data);
        setKanji(kanjiData);
        getExamples();

        
      });
  }

  const getPartsData = async (data) => {
    const _nodesList = [
      { id: data.kanjiData.query, meaning: `Meaning: ${data.kanjiData.meaning}`, val: 5},
    ];
    const _linksList = [];
    data.kanjiData.parts.forEach(part => {
      fetch(`http://localhost:4000/parts/${part}`)
      .then(res => res.json())
      .then(_data => {
          const partData = {part: _data.query, meaning: _data.meaning};
          setPartsData([...partsData, partData]);
          if (_data.query != data.kanjiData.query){
            _linksList.push({id: `${_data.query}-${data.kanjiData.query}`, target: data.kanjiData.query, source: _data.query});
          }
          _nodesList.push({id: _data.query, meaning: `Meaning: ${_data.meaning}`,val: 2, type: 'component'});
          setNodesList(_nodesList);
          setLinksList(_linksList);
        }
      );
    })
  }

  const getExamples = async () => {
    fetch(`http://localhost:4000/examples/${query}`)
      .then(res => res.json())
      .then(data => setExamples([data.results[0], data.results[1]]));
  }


  const getQuery = (_query) => {
    setQuery(_query);
  }

  const addCard = (card) => {
    setDeck([...deck, card]);
    console.log('deck set', deck);
  }

  const [show, setShow] = useState(false);

  const modalHandler = (bool) => {
      setShow(bool);
  }

  return (
    <div className='d-flex flex-column' style={{ height: '100vh' }}>
      <header className="d-flex justify-content-between border border-bottom row-lg-1 px-5" style={{height: '8vh'}}>
        <img className="d-inline-block my-2 h-75 align-top" src="/walogo.png"></img>
        <div>
          <Button disabled className='align-top my-2 me-3'>Test Yourself</Button>
          <Button variant="primary" disabled onClick={() => modalHandler(true)} className='align-top my-2 me-5'>
            Deck
          </Button>
        </div>
        <CardDeck modalHandler={modalHandler} show={show} cards={deck}/>
      </header>
      <Container className="d-flex row-lg-10 border-start border-end flex-grow-1">      
        <Dashboard 
          onSubmit={getQuery} 
          data={{links: linksList, nodes: nodesList}} 
          partsData={partsData}
          kanji={kanji}
          addCard={addCard}
          examples={examples}
        />
      </Container>
      <footer style={{ height: '5%' }} className='border-top'>
        Created with:
        <img src="/assets/images/d3.png" style={{width: '25px', height: '25px'}} className='mx-1'></img>
        <img src="/assets/images/bs.png" style={{width: '25px', height: '25px'}} className='mx-1'></img>
        <img src="/assets/images/node.png" style={{width: '35px', height: '25px'}} className='mx-1'></img>
        <img src="/assets/images/rbs.png" style={{width: '25px', height: '25px'}} className='mx-1'></img>
        <img src="/assets/images/react.png" style={{width: '25px', height: '25px'}} className='mx-1'></img>
        <img src="/assets/images/expressjs.png" style={{width: '50px', height: '25px'}} className='mx-1'></img>
      </footer>
    </div>
  )

}


