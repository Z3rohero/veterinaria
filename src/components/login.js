import React, { useState, useEffect } from 'react';

//import { show_alerta } from '../functions';
import axios from 'axios';
;

const LoginForm = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [userData, setUserData] = useState(null);
  //const [redirectLink, setRedirectLink] = useState(null); // State to store the redirect link

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
    //setRedirectLink = "http://localhost:3000/mascotas";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Send user login data to the API
      const response = await axios.post('https://cliente-api-3zzhc.ondigitalocean.app/api/login', {
        email: email,
        password: password,
      });

      // Extract the token from the response
      const token = response.data.token;
      setAuthToken(token);

     
      // Handle any other logic or UI updates after successful login

      // Fetch the user profile data after successful login
      fetchUserProfile();
    } catch (error) {
      console.error('Error al registrar usuario:', error.response.data.error);
      setError('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const fetchUserProfile = async () => {
    try {
      // Send a GET request to the API with the authentication token
      const response = await axios.get('https://cliente-api-3zzhc.ondigitalocean.app/api/user-profile', {
        headers: {
          Authorization: `Bearer ${authToken}`, // Use the authToken passed as a prop
        },
      });

      setUserData(response.data.userData);
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error.response.data.message);
    }
  };

  // useEffect to monitor changes to userData and trigger the redirect
  useEffect(() => {
    if (userData) {
      // Redirect to the link stored in redirectLink
      
        window.location.href = 'http://localhost:3000/mascotas';
      
      }
  }, [userData]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Iniciar sesión</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                  <button type="submit" className="btn btn-primary" >Registro
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

export default LoginForm;
