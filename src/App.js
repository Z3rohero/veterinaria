import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Historia from './components/Historia';
import LoginForm from './components/login';
import Clientes from './components/Cliente';
import Mascotas from './components/mascotas';
import RegistrationForm from './components/Register';

function App() {
  
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>

        <Route path="/" element={<LoginForm />} />
        <Route path="/registro" element={<RegistrationForm />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/mascotas" element={<Mascotas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
