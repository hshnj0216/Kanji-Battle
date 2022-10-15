import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { Container } from "react-bootstrap";
import Sidebar from "./Sidebar";
import JishoApI from 'unofficial-jisho-api';
import * as d3 from 'd3';

export default function App() {

  const [linksList, setLinksList] = useState([]);
  const [nodesList, setNodesList] = useState([]);
  const [kanji, setKanji] = useState({});
  const [query, setQuery] = useState('緑');

  useEffect(() => {
    getKanjiData();
  }, [])

  const getKanjiData = async () => {
    fetch(`http://localhost:4000/data/${query}`)
      .then(res => res.json())
      .then(data => {

        //extract and pack only the desired data
        const kanjiData = {
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
        console.log(data);
        
        const createLinksList = () => {
          const linksList = [];
          data.kanjiData.parts.forEach(part => {
            if (part != data.kanjiData.query) {
              linksList.push({ id: `${part}-${data.kanjiData.query}`, source: data.kanjiData.query, target: part });
            }
          });
          return linksList;
        }

        const createNodesList = () => {
          const nodesList = [
            { id: data.kanjiData.query, order: 2 }
          ];
          data.kanjiData.parts.forEach(part => {
            if (part != data.kanjiData.query) {
              nodesList.push({ id: part, order: 1, type: "component" });
            }
          });
          return nodesList;
        }
        setKanji(kanjiData);
        setLinksList(createLinksList());
        setNodesList(createNodesList());
      });
  }

  const getExamples = () => {
    fetch('http://localhost:4000/examples')
      .then(res => res.json())
      .then(data => console.log(data));
  }


  const getQuery = (_query) => {
    console.log('query performed, query string is:', _query);
    setQuery(_query);
    getKanjiData();
  }

  return (
    <div className='d-flex flex-column' style={{ height: '100vh' }}>
      <header className="d-flex justify-content-between border border-bottom row-lg-1 px-5">
        <h3 className="d-inline-block my-2">Logo</h3>
      </header>
      <Container className="d-flex row-lg-10 border-start border-end flex-grow-1">
        <Dashboard onSubmit={getQuery} data={{links: linksList, nodes: nodesList}}/>
        <Sidebar kanji={kanji} />
      </Container>
      <footer style={{ height: '5%' }} className='border-top'>Created with:</footer>
    </div>
  )

}


