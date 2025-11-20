// src/pages/SobrePage.jsx (ESTÉTICA ATUALIZADA)
import React from 'react';
import { Link } from 'react-router-dom';
import './SobrePage.css'; // Vamos criar este CSS baseado no Contato
import logoImage from '../assets/Logo_AI.png';
import { useAuth } from '../context/AuthContext';

const SobrePage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      {/* Fundo Gradiente Animado */}
      <div className="gradient-background-container"></div>
      
      <div className="landing-container">
        
        {/* === CABEÇALHO PADRÃO === */}
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

        {/* === CONTEÚDO PRINCIPAL (Estilo Hero/Contato) === */}
        <main className="sobre-container hero">
          <h1 className="hero-title">Sobre o 
            <span className="gradient-text"> AI Academy</span>
          </h1>
          
          <div className="sobre-content-box">
            <p className="hero-subtitle" style={{ textAlign: 'justify' }}>
              O <strong>AI Academy</strong> é um assistente de pesquisa inteligente, projetado para transformar a maneira como estudantes e profissionais de tecnologia interagem com o conhecimento acadêmico.
            </p>
            <p className="hero-subtitle" style={{ textAlign: 'justify' }}>
              Nossa plataforma realiza buscas paralelas em múltiplas fontes de alta credibilidade (IEEE Xplore, Semantic Scholar, arXiv, Wikipedia, etc.) e utiliza o poder do Google Gemini para otimizar as perguntas e gerar resumos coesos em português, tornando a pesquisa mais rápida, intuitiva e eficiente.
            </p>
            
            <div className="cta-wrapper">
                <Link to="/" className="cta-button">‹ Voltar ao Início</Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SobrePage;