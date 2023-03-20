import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cadastro from './components/Cadastro/Cadastro';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;