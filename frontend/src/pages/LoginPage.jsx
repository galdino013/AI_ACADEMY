import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './AuthPage.css';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, error, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  const location = useLocation();
  const successMessage = location.state?.message; 

  if (isAuthenticated) {
    return <Navigate to="/lab" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    
    if (success) {
      navigate('/lab');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <p>Acesse o laboratório de pesquisa.</p>
        
        {/* Mostra a msg de sucesso vinda do Registro */}
        {successMessage && <div className="auth-success">{successMessage}</div>}
        {/* Mostra erros de login (ex: senha errada) */}
        {error && <div className="auth-error">{error}</div>}
        
        <div className="input-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="auth-button">Entrar</button>
        
        <p className="auth-switch">
          Não tem uma conta? <Link to="/register">Registre-se</Link>
        </p>

        {/* ✅ ADIÇÃO: Link para voltar à Home (Problema 4) */}
        <p className="auth-switch auth-home">
          <Link to="/">‹ Voltar à Home</Link>
        </p>

      </form>
    </div>
  );
};

export default LoginPage;