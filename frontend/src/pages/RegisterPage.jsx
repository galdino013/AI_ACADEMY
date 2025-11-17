import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import './AuthPage.css';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, error, isAuthenticated, loading } = useAuth(); 
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/lab" replace />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    const success = await register(username, email, password);

    if (success) {
      navigate('/login', { 
        state: { message: 'Conta criada! Verifique seu e-mail para confirmar a conta.' } 
      });
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1>Registro</h1>
        <p>Crie sua conta para começar.</p>
        
        {error && <div className="auth-error">{error}</div>}

        <div className="input-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirm-password">Confirmar Senha</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Criando Conta...' : 'Criar Conta'}
        </button>
        
        <p className="auth-switch">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>

        <p className="auth-switch auth-home">
          <Link to="/">‹ Voltar à Home</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;