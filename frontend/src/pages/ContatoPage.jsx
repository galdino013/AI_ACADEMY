// src/pages/ContatoPage.jsx (ATUALIZADO COM FLIP CARDS)
import React from 'react'
import './ContatoPage.css' 
import { Link } from 'react-router-dom'
import logoImage from '../assets/Logo_AI.png'
import { useAuth } from '../context/AuthContext'
import fotoPedro from '../assets/ftpedro.jpg'
import fotoIgor from '../assets/ftigor.jpg'
import fotoLukas from '../assets/ftlukas.jpg'
import fotoLeo from '../assets/ftleo.jpg'
import fotoErick from '../assets/fterick.jpg'

const IconGitHub = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1.9 1.6 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.4-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 3 .9a10.2 10.2 0 0 1 5.4 0c2.1-1.2 3-.9 3-.9.6 1.4.2 2.5.1 2.8.7.8 1.1 1.7 1.1 2.9 0 4.1-2.5 5-4.9 5.3.4.3.8.9.8 1.8v2.6c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>
);
const IconLinkedIn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V8h3v11zM6.5 6.8c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zM19 19h-3v-5.4c0-1.3-.02-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V19h-3V8h2.9v1.3a3.1 3.1 0 0 1 2.8-1.5c3 0 3.5 1.9 3.5 4.5V19z"/></svg>
);
const IconEmail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
);

const creatorsData = [
  {
    name: "Pedro Putinatti",
    photoUrl: fotoPedro,
    github: "https://github.com/jpplack",
    linkedin: "https://linkedin.com/in/pedroputinatti",
    email: "mailto:pedro170101@hotmail.com"
  },

  {
    name: "Igor Galdino",
    photoUrl: fotoIgor,
    github: "https://github.com/galdino013",
    linkedin: "https://linkedin.com/in/igor-galdino013",
    email: "mailto:galdinoigor013@gmail.com"
  },
 
   {
    name: "Lukas Andrade",
    photoUrl: fotoLukas,
    github: "https://github.com/Lukaslk10",
    linkedin: "https://linkedin.com/in/lukas-andrade-952284244",
    email: "mailto:Lukas.andrade2530@gmail.com"
  },

  {
    name: "Leonardo Marana",
    photoUrl: fotoLeo,
    github: "https://github.com/Hrleo07",
    linkedin: "https://linkedin.com/in/leonardo-marana-9a78a72b9",
    email: "Leomarana74@gmail.com"
  },

  {
    name: "Erick Marinho",
    photoUrl: fotoErick,
    github: "https://github.com/patrickmarinho",
    linkedin: "https://linkedin.com/in/erickmarinho",
    email: "erick.marinho2003@gmail.com"
  },
];


export const ContatoPage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <div className="gradient-background-container"></div>
      <div className="landing-container">
       
        {/* Cabeçalho */}
        <header className="landing-header">
          <div className="logo"><img src={logoImage} alt="AI Academy Logo" style={{ height: '40px' }}/></div>
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
                <button onClick={logout} className="btn btn-logout">Sair</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/lab" className="btn btn-primary">Comece a pesquisar</Link>
              </>
            )}
          </div>
        </header>

        {/* Conteúdo da Página de Contato */}
        <main className="contato-container hero">
          <h1 className="hero-title">Nossa <span className="gradient-text">Equipe</span></h1>
          <p className="hero-subtitle">Conheça os criadores por trás do AI Academy.</p>
          
          <div className="profile-grid">
            {creatorsData.map((creator) => (
              <div key={creator.name} className="profile-card-container">
                <div className="profile-card-inner">
                  {/* FRENTE (Foto) */}
                  <div className="profile-card-front">
                    <img src={creator.photoUrl} alt={`Foto de ${creator.name}`} />
                    <div className="profile-name-tag">{creator.name}</div>
                  </div>
                  {/* VERSO (Links) */}
                  <div className="profile-card-back">
                    <h3>{creator.name}</h3>
                    <div className="social-links">
                      <a href={creator.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                        <IconGitHub />
                      </a>
                      <a href={creator.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                        <IconLinkedIn />
                      </a>
                      <a href={`mailto:${creator.email}`} title="Email">
                        <IconEmail />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}