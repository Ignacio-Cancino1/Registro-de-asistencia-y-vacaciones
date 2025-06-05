import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './Login.css';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  // 🔒 Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const mockUser = {
    correo: 'admin@empresa.com',
    clave: '123456',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (correo === mockUser.correo && clave === mockUser.clave) {
      login();
      navigate('/dashboard');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        {error && <p className="login-error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
