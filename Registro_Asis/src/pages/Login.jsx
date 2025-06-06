import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const usuariosSimulados = [
    { correo: 'admin@empresa.com', clave: '123456', rol: 'admin' },
    { correo: 'empleado@empresa.com', clave: '123456', rol: 'empleado' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = usuariosSimulados.find(
      (u) => u.correo === correo && u.clave === clave
    );

    if (user) {
      login(user.rol);
      navigate('/dashboard');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      <button type="submit">Iniciar Sesión</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
