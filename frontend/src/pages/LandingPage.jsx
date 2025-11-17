// frontend/src/pages/LandingPage.jsx (Revisado com container de animação)

import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css' 
import logoImage from '../assets/Logo_AI.png' 
import { useAuth } from '../context/AuthContext'

export const LandingPage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <div className="gradient-background-container"></div>
      <div className="landing-container">
        <header className="landing-header">
          <Link to="/" className="logo-link" aria-label="Voltar para a Página Principal">
            <div className="logo">
              <img 
                src={logoImage} 
                alt="AI Academy Logo" 
                style={{ height: '40px' }}
              />
            </div>
          </Link>
          <nav>
            <Link to="/sobre">Sobre</Link>
            <Link to="/funcionalidades">Funcionalidades</Link>
            <Link to="/contato">Contatos</Link>
          </nav>

          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <span className="user-greeting">Olá, {user}</span>
                <Link to="/lab" className="btn btn-primary">Ir para o Lab</Link>
                <button onClick={logout} className="btn btn-logout">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/lab" className="btn btn-primary">Comece a pesquisar</Link>
              </>
            )}
          </div>
        </header>

        <main className="hero">
          <h1 class="hero-title">PESQUISA CIENTÍFICA, 
          <span class="gradient-text"> REINVENTADA.</span></h1>
          <p className="hero-subtitle">Sua IA assistente que lê, resume e conecta artigos científicos para você.</p>
          <Link to="/lab" className="cta-button">COMECE A PESQUISAR AGORA ▸</Link>
        </main>
      </div>
    </>
  )
}