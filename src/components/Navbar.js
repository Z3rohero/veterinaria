import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/logoveterinaria.png" alt="Logo Veterinaria" height="40" />
          Veterinaria
          {/* Adjust the "height" attribute as per your logo's size */}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Clientes">
                Cliente
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mascotas">
              Mascota
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/historia">
              Historia
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Registro">
              Registro
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
              login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
