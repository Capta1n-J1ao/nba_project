import './App.css';
import React, {useState, useEffect} from "react";
// import Axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Match from './pages/Match';
import My_Team from './pages/My_Team';
import Investigator from './pages/Investigator';
import MC_Provider from './pages/MC_Provider';
import Stadium from './pages/Stadium';


// start cmd:
// npm start
// Hook 
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/My_Team' element={<My_Team/>} />
          <Route path='/Match' element={<Match/>} />
          <Route path='/Investigator' element={<Investigator/>} />
          <Route path='/MC_Provider' element={<MC_Provider/>} />
          <Route path='/Stadium' element={<Stadium/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
