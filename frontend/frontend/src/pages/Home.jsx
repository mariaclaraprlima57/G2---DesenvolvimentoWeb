import React, { useState } from 'react';
import Post from '../components/Post';

function Home({ user, setUser }) {
  // Estado para controlar se quem não está logado escolheu "Entrar sem Login"
  const [isVisitor, setIsVisitor] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  // Posts fictícios para teste visual
  const [posts, setPosts] = useState([
    { id: 1, author: 'Prof. Marianne', content: 'Boa prova a todos! Não esqueçam dos commits.', likes: 5, likedByMe: false },
    { id: 2, author: 'Aluno', content: 'Focando no front-end para garantir os pontos de design!', likes: 2, likedByMe: true },
  ]);

  // Simulação de Login
  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ username: 'aluno_teste' });
  };

  // Simulação de Publicação
  const handlePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    const newPost = { id: Date.now(), author: user.username, content: newPostContent, likes: 0, likedByMe: false };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  // Lógica de Curtir
  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likedByMe ? post.likes - 1 : post.likes + 1, likedByMe: !post.likedByMe };
      }
      return post;
    }));
  };

  // Se NÃO estiver logado E também NÃO tiver clicado em entrar como visitante, mostra a tela de boas-vindas
  if (!user && !isVisitor) {
    return (
      <div className="auth-box" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Bem-vindo ao Twitter</h2>
        
        <form onSubmit={handleLogin} style={{ marginBottom: '20px', textAlign: 'left' }}>
          <h3>Acesse sua conta</h3>
          <input type="text" placeholder="Usuário" required />
          <input type="password" placeholder="Senha" required />
          <button type="submit" className="post-btn" style={{ float: 'none', width: '100%' }}>Entrar</button>
        </form>

        <div style={{ margin: '20px 0', color: '#888' }}>ou</div>

        <button 
          onClick={() => setIsVisitor(true)} 
          className="theme-btn" 
          style={{ width: '100%', padding: '12px', borderRadius: '5px' }}
        >
          Entrar sem login (Modo Visitante)
        </button>
      </div>
    );
  }

  // Se estiver logado OU tiver aceitado entrar como visitante, carrega o Feed correspondente
  return (
    <main className="main-content">
      {/* Caixa de postagem: Só aparece se o usuário de fato LOGOU */}
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
        /* Aviso discreto se ele for apenas um visitante */
        <div style={{ padding: '15px', background: 'var(--border-color)', borderRadius: '5px', margin: '10px', fontSize: '0.9rem', textAlign: 'center' }}>
          Você está navegando como <strong>Visitante</strong>. Faça login para poder publicar e curtir posts!
          <button onClick={() => setIsVisitor(false)} className="theme-btn" style={{ marginLeft: '10px', fontSize: '0.8rem' }}>Voltar ao Login</button>
        </div>
      )}

      {/* Feed de Posts - Agora condicional e limpo */}
      <div className="feed" style={{ marginTop: '10px' }}>
        {posts.map(post => (
          <Post key={post.id} post={post} onLike={toggleLike} isUserLogged={!!user} />
        ))}
      </div>
    </main>
  );
}

export default Home;