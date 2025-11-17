import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom';
import './sidebar.css'; // <-- AJUSTE 2: Garante a importação do CSS correto

const Sidebar = ({ 
  history = [], 
  onHistoryClick = ()=>{}, 
  onClearHistory = ()=>{}, 
  onLogout = ()=>{},
  user = null,
  isOpen = true 
}) => {

  const sidebarClassName = clsx('sidebar', { 'sidebar-open': isOpen });
  
  return (
    <aside className={sidebarClassName} aria-hidden={!isOpen}>
      <div className="sidebar-header">
        <h2>Histórico</h2>
        {/* O 'sidebar-user' FOI REMOVIDO DAQUI */}
      </div>
      
      {/* AJUSTE 1: Movido para cá, abaixo do header e acima da lista */}
      {user && (
        <div className="sidebar-user">
          Logado como: <strong>{user}</strong>
        </div>
      )}

      <ul className="history-list">
        {history.length === 0 && <p className="small">Nenhuma pesquisa ainda</p>}
        
        {/* BÔNUS: Chave mais robusta para evitar erros com itens duplicados */}
        {history.map((it, index) => (
          <li 
            key={it.id || it.timestamp || `${it.pergunta}-${index}`} 
            className="history-item" 
            onClick={() => onHistoryClick(it)} 
            title={it.pergunta}
          >
            {it.pergunta}
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <Link 
          to="/" 
          className="clear-history-btn home-link" 
        >
          Voltar ao Início
        </Link>
        
        <button className="clear-history-btn clear-btn" onClick={onClearHistory}>
          Limpar histórico
        </button>
        
        <button className="clear-history-btn logout-btn" onClick={onLogout}>
          Sair (Logout)
        </button>
      </div>
    </aside>
  )
}

export default Sidebar