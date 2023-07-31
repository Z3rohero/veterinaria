import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ authToken }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchUserProfile = async () => {
      try {
        // Send a GET request to the API with the authentication token
        const response = await axios.get('https://cliente-api-3zzhc.ondigitalocean.app/api/user_profile', {
          headers: {
            Authorization: `Bearer ${authToken}`, // Use the authToken passed as a prop
          },
        });

        setUserData(response.data.userData);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error.response.data.message);
      }
    };

    fetchUserProfile();
  }, [authToken]); // Add authToken to the dependency array to re-run the effect when it changes

  return (
    <div>
      {userData ? (
        <div>
          <h2>Perfil de Usuario</h2>
          <p>Nombre: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Cargando perfil de usuario...</p>
      )}
    </div>
  );
};

export default UserProfile;