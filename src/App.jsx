import React from 'react';
import './App.css';
import Navbar from './component/navbar';
import AnimRoute from './component/animRoute';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar />
      <AnimRoute />
    </Router>
  );
}

export default App;
