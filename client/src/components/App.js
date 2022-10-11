import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import useLocalStorage from "../hooks/useLocalStorage";
import { Container } from "react-bootstrap";
import Sidebar from "./Sidebar";

export default function App() {
  const [id, setId] = useLocalStorage('id');
  return (
    <div style={{height: '100vh'}}>
      <header className="border border-bottom row-lg-1">
          <h3>User Id: {id}</h3>
      </header>
      <Container className="h-100 row-lg-10 border-start border-end">
        <Dashboard id={id}/>
        <Sidebar />
      </Container>
      <footer className="border border-top-secondary row-lg-1">Created with: bootstrap</footer>
    </div>
  )
  
}


