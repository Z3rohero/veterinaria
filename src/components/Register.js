import React, { useState } from 'react';
//import Swal from 'sweetalert2';
import axios from 'axios';
import { show_alerta } from '../functions';


const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');

    try {
      // Send user registration data to the API
      const response = await axios.post('https://cliente-api-3zzhc.ondigitalocean.app/api/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
      console.log(response);
      show_alerta('Usuario registrado:' + name, response.data);
      // Handle any other logic or UI updates after successful registration
    } catch (error) {
      console.error('Error al registrar usuario:', error.response.data.error);
      setError('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Registro de usuario</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmación de contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
                {/* Agrega aquí más campos del formulario si es necesario */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Registrar
                  </button>
                </div>
                {error && <div className="text-center text-danger mt-2">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
