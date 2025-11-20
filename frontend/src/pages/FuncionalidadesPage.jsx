// frontend/src/pages/FuncionalidadesPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/Logo_AI.png';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css'; // Reutiliza estilos do Header da Landing
import './FuncionalidadesPage.css'; // Estilos específicos dos cards

const FuncionalidadesPage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="funcionalidades-container">
      {/* --- CABEÇALHO (Igual ao da Landing/Contato) --- */}
      <header className="landing-header">
        <Link to="/" className="logo-link">
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
          <Link to="/funcionalidades" className="active-link" style={{color: 'var(--text-primary)'}}>Funcionalidades</Link>
          <Link to="/contato">Contatos</Link>
        </nav>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <span className="user-greeting">Olá, {user}</span>
              <Link to="/lab" className="btn btn-primary">Ir para o Lab</Link>
              <button onClick={logout} className="btn btn-secondary">
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

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="hero" style={{paddingTop: '60px'}}>
        <h1 className="hero-title" style={{fontSize: '2.5rem', marginBottom: '10px'}}>
            Nossas <span className="gradient-text">Funcionalidades</span>
        </h1>
        <p className="hero-subtitle" style={{maxWidth: '600px', marginBottom: '60px'}}>
            Descubra como o AI Academy potencializa sua pesquisa acadêmica com tecnologia de ponta.
        </p>

        <div className="features-grid">
            {/* Card 1 */}
            <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Busca Paralela e Rápida</h3>
                <p>Consultas assíncronas simultâneas em múltiplas fontes de dados confiáveis, incluindo IEEE Xplore, Semantic Scholar, arXiv e Wikipedia.</p>
            </div>

            {/* Card 2 */}
            <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h3>Inteligência Artificial</h3>
                <p>Utilizamos o poder do Google Gemini para otimizar suas perguntas e gerar resumos coesos e diretos em português.</p>
            </div>

            {/* Card 3 */}
            <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>Histórico Inteligente</h3>
                <p>Todas as suas buscas são salvas automaticamente. Nunca mais perca uma referência ou linha de pesquisa importante.</p>
            </div>

            {/* Card 4 */}
            <div className="feature-card">
                <div className="feature-icon">⚙️</div>
                <h3>Arquitetura Moderna</h3>
                <p>Construído com tecnologias de ponta: Backend robusto em FastAPI e Frontend reativo e veloz com React + Vite.</p>
            </div>
        </div>

        <Link to="/lab" className="cta-button">
            TESTAR FUNCIONALIDADES AGORA ▸
        </Link>
      </main>
    </div>
  );
};

export default FuncionalidadesPage;