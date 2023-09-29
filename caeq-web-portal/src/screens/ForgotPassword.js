import React, { useState } from 'react';
import '../styles/courses.scss';
import { Link, useNavigate } from 'react-router-dom';


function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleForgotPassword = async () => {
      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (response.status === 200) {
          setMessage(data.message);
        } else {
          setMessage('Error: ' + data.message);
        }
        navigate('/');
      } catch (error) {
        console.error(error);
        setMessage('Error interno del servidor');
      }
    };
  
    return (
      <div>
        <h2>Olvidé mi contraseña</h2>
        <input
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={handleForgotPassword}>Enviar solicitud</button>
        <p>{message}</p>
      </div>
    );
  }
  
  export default ForgotPassword;