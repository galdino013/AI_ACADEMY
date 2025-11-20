import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './AuthPage.css'; 

const API_URL = import.meta.env.VITE_API_URL;

const ConfirmAccountPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Confirmando sua conta...');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setMessage('Nenhum token de confirmação fornecido.');
      setError(true);
      setLoading(false);
      return;
    }

    const confirmAccount = async () => {
      try {
        const response = await fetch(`${API_URL}/users/confirm-account?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          setError(false);
        } else {
          setMessage(data.detail || 'Falha ao confirmar a conta.');
          setError(true);
        }
      } catch (err) {
        console.error('Erro ao confirmar conta:', err);
        setMessage('Não foi possível conectar ao servidor para confirmar a conta.');
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    confirmAccount();
  }, [searchParams]);

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Confirmação de Conta</h1>
        {loading ? (
          <div className="loader"></div> // Adicionei o loader visual se tiver no CSS
        ) : (
          <>
            <p className={error ? 'auth-error' : 'auth-success'}>{message}</p>
            
            {!error && (
              <div style={{ marginTop: '20px' }}>
                 <p>Sua conta está ativa!</p>
                 <Link to="/login" className="auth-button" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '10px' }}>
                    Ir para Login
                 </Link>
              </div>
            )}
            
            {error && (
              <p style={{ marginTop: '20px' }}>
                <Link to="/register">Tentar registrar novamente</Link> ou <Link to="/login">fazer login</Link>.
              </p>
            )}
          </>
        )}
        <p className="auth-switch auth-home" style={{ marginTop: '30px' }}>
          <Link to="/">‹ Voltar à Home</Link>
        </p>
      </div>
    </div>
  );
};

export default ConfirmAccountPage;
