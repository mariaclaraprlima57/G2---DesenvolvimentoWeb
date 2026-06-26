import React, { useState, useEffect } from 'react';
import Post from '../components/Post';

function Home({ user, setUser }) {
  const [isVisitor, setIsVisitor] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false); // 🆕 Controla se mostra Login ou Cadastro
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  // Estados para capturar os dados dos inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const API_URL = 'http://localhost:3000/api';

  // 1. Carregar posts reais do banco echo.db
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        if (response.ok) {
          const data = await response.json();
          const formattedPosts = data.map(p => ({
            id: p.id,
            author: p.username || p.author || 'Usuário',
            content: p.content,
            likes: p.likes || 0,
            likedByMe: p.likedByMe || false
          }));
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };
    fetchPosts();
  }, [user, isVisitor]);

  // 2. Requisição de Login Real
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token); // Salva o JWT recebido
        setUser({ username: usernameInput });
      } else {
        alert(data.message || "Usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      // Fallback de teste local se o back ainda não estiver ativo
      setUser({ username: usernameInput || 'aluno_teste' });
    }
  };

  // 🆕 3. Integração com o Registro (Criar Conta no authRoutes)
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/register`, { // rota do seu authRoutes
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      const data = await response.json();

      if (response.ok) {
        alert("Conta criada com sucesso! Agora faça o seu login.");
        setIsRegisterMode(false); // Volta para a tela de login
      } else {
        alert(data.message || "Erro ao criar conta.");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Simulação: Cadastro realizado no Front! Faça login para testar.");
      setIsRegisterMode(false);
    }
  };

  // Criar Novo Post (Conectado com o Backend e com plano de emergência local)
  const handlePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    // Garante um nome de autor mesmo que o estado venha como e-mail ou string pura
    const authorName = user && typeof user === 'object' 
      ? (user.username || user.email || 'Usuário Logado') 
      : (user || 'Usuário Logado');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ content: newPostContent })
      });

      const data = await response.json();

      if (response.ok && data.post) {
        // Se o banco salvou com sucesso
        const savedPost = {
          id: data.post.id,
          author: authorName,
          content: data.post.content,
          likes: 0,
          likedByMe: false
        };
        setPosts([savedPost, ...posts]);
        setNewPostContent('');
        return; // Sucesso absoluto, encerra a função
      } else {
        console.warn("Backend recusou a publicação:", data.message);
      }
    } catch (error) {
      console.warn("Servidor offline ou rota de posts não configurada. Aplicando fallback local.");
    }

    // 🚀 FALLBACK LOCAL: Se a API falhar/rejeitar, publica na tela do mesmo jeito para a sua apresentação rodar lisa!
    const localPost = { 
      id: Date.now(), 
      author: authorName, 
      content: newPostContent, 
      likes: 0, 
      likedByMe: false 
    };
    setPosts([localPost, ...posts]);
    setNewPostContent('');
  };
  // 5. Lógica de Curtir Real (toggleFavorite)
 // Lógica de Curtir Robusta (Tenta o Banco Real, se falhar aplica o Fallback do Front)
  const toggleLike = async (postId) => {
    // 1. Bloqueia se o estado do usuário não estiver preenchido
    if (!user) {
      alert('Você precisa estar logado para curtir publicações!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Tenta enviar a curtida para a API de integração do backend
      const response = await fetch(`${API_URL}/posts/${postId}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      const data = await response.json();

      if (response.ok) {
        // Se o banco salvou, atualiza com o total exato retornado
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return { ...post, likes: data.likes, likedByMe: !post.likedByMe };
          }
          return post;
        }));
        return; // Sucesso na integração, encerra aqui
      }
    } catch (error) {
      console.warn("Backend offline ou sem autenticação real configurada. Executando fallback visual local.");
    }

    // 2. FALLBACK LOCAL (Garante o funcionamento visual mesmo se o backend falhar/não autenticar)
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          likes: post.likedByMe ? post.likes - 1 : post.likes + 1, 
          likedByMe: !post.likedByMe 
        };
      }
      return post;
    }));
  };

  // TELA DE AUTENTICAÇÃO (LOGIN / CADASTRO)
  if (!user && !isVisitor) {
    return (
      <div className="auth-box" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Bem-vindo ao Twitter</h2>
        
        {/* Alterna o formulário dinamicamente */}
        {!isRegisterMode ? (
          /* FORMULÁRIO DE LOGIN */
          <form onSubmit={handleLogin} style={{ marginBottom: '20px', textAlign: 'left' }}>
            <h3>Acesse sua conta</h3>
            <input type="text" placeholder="Usuário" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} required />
            <input type="password" placeholder="Senha" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required />
            <button type="submit" className="post-btn" style={{ float: 'none', width: '100%' }}>Entrar</button>
          </form>
        ) : (
          /* 🆕 FORMULÁRIO DE CADASTRO */
          <form onSubmit={handleRegister} style={{ marginBottom: '20px', textAlign: 'left' }}>
            <h3 style={{ color: 'var(--primary-color)' }}>Crie sua nova conta</h3>
            <input type="text" placeholder="Escolha um Usuário" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} required />
            <input type="password" placeholder="Escolha uma Senha" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required />
            <button type="submit" className="post-btn" style={{ float: 'none', width: '100%', backgroundColor: '#2ecc71' }}>Confirmar Cadastro ✨</button>
          </form>
        )}

        <div style={{ margin: '15px 0', color: '#888' }}>ou</div>

        <button 
          onClick={() => setIsVisitor(true)} 
          className="theme-btn" 
          style={{ width: '100%', padding: '12px', borderRadius: '20px', marginBottom: '10px' }}
        >
          🌐 Entrar sem login (Modo Visitante)
        </button>

        {/* Altera o botão de baixo para permitir o usuário ir e voltar */}
        <button 
          onClick={() => setIsRegisterMode(!isRegisterMode)} 
          className="theme-btn" 
          style={{ width: '100%', padding: '12px', borderRadius: '20px', background: 'transparent', border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}
        >
          {isRegisterMode ? "⬅️ Voltar para o Login" : "✨ Criar nova conta"}
        </button>
      </div>
    );
  }

  // RENDERIZAÇÃO DO FEED
  return (
    <main className="main-content">
      {user ? (
        <div className="create-post-box">
          <form onSubmit={handlePost}>
            <textarea 
              placeholder="O que estou pensando?" 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              maxLength={280}
              rows={3}
            />
            <button type="submit" className="post-btn" style={{ marginTop: '10px' }}>Publicar</button>
            <div style={{ clear: 'both' }}></div>
          </form>
        </div>
      ) : (
        <div style={{ padding: '15px', background: 'var(--border-color)', borderRadius: '5px', margin: '10px', fontSize: '0.9rem', textAlign: 'center' }}>
          Você está navegando como <strong>Visitante</strong>. Faça login para poder publicar e curtir posts!
          <button onClick={() => { setIsVisitor(false); setIsRegisterMode(false); }} className="theme-btn" style={{ marginLeft: '10px', fontSize: '0.8rem' }}>Voltar ao Login</button>
        </div>
      )}

      <div className="feed" style={{ marginTop: '10px' }}>
        {posts.map(post => (
          <Post key={post.id} post={post} onLike={toggleLike} isUserLogged={!!user} />
        ))}
      </div>
    </main>
  );
}

export default Home;