import React from "react";
import Dashboard from "./Dashboard";
import useLocalStorage from "../hooks/useLocalStorage";
import { Container } from "react-bootstrap";
import Sidebar from "./Sidebar";
import kanji from './ka_data.csv';
import * as d3 from 'd3';

export default function App() {
  const [id, setId] = useLocalStorage('id');

  d3.csv(kanji, (data) => {
    return data;
  }).then(data => console.log(data));

  return (
    <div className='d-flex flex-column' style={{height: '100vh'}}>
      <header className="d-flex justify-content-between border border-bottom row-lg-1 px-5">
          <h3 className="d-inline-block my-2">Logo</h3>
          <div className="my-2">
            <img src="../favicon.ico" style={{width: '30px', height: '30px'}} className='mx-1'></img>
            <img src="../favicon.ico" style={{width: '30px', height: '30px'}} className='mx-1'></img>
            <img src="../favicon.ico" style={{width: '30px', height: '30px'}} className='mx-1'></img>
          </div>
      </header>
      <Container className="d-flex row-lg-10 border-start border-end flex-grow-1">
        <Dashboard id={id}/>
        <Sidebar />
      </Container>
      <footer style={{height: '5%'}} className='border-top'>Created with:</footer>
    </div>
  )
  
}


