import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home'; // Vamos criar essa página no próximo passo!

function App() {
  const [user, setUser] = useState(null); // Estado para controlar quem está logado
  const [theme, setTheme] = useState('light'); // Estado do tema

  // Aplica a classe 'dark' no body do HTML quando o tema muda
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app-container ${theme}`}>
      <header className="navbar">
        <h1>MiniTwitter</h1>
        <div>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="theme-btn">
            {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
          </button>
          
          {user && (
            <button onClick={() => setUser(null)} className="logout-btn" style={{marginLeft: '10px'}}>
              Sair ({user.username})
            </button>
          )}
        </div>
      </header>

      {/* Aqui carregaremos o feed e o login */}
      <Home user={user} setUser={setUser} />
    </div>
  );
}

export default App;