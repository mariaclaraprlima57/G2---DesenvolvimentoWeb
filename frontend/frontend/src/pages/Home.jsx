import React, { useState } from 'react';
import Post from '../components/Post';

function Home({ user, setUser }) {
  // Posts falsos apenas para vermos o design
  const [posts, setPosts] = useState([
    { id: 1, author: 'Prof. Marianne', content: 'Boa prova a todos! Não esqueçam dos commits.', likes: 5, likedByMe: false },
    { id: 2, author: 'Aluno', content: 'Focando no front-end para garantir os pontos de design!', likes: 2, likedByMe: true },
  ]);
  const [newPostContent, setNewPostContent] = useState('');

  // Simulação de Login (visitante virando usuário logado)
  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ username: 'aluno_teste' }); // Mock de usuário
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

  return (
    <main className="main-content">
      {/* Exibe o Login se NÃO estiver logado */}
      {!user && (
        <div className="auth-box">
          <h2>Entre para participar</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Usuário" required />
            <input type="password" placeholder="Senha" required />
            <button type="submit" className="post-btn">Entrar</button>
          </form>
        </div>
      )}

      {/* Exibe o "O que estou pensando?" se ESTIVER logado */}
      {user && (
        <div className="create-post-box">
          <form onSubmit={handlePost}>
            <textarea 
              placeholder="O que estou pensando?" 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              maxLength={280}
              rows={3}
            />
            <button type="submit" className="post-btn" style={{marginTop: '10px'}}>Publicar</button>
            <div style={{clear: 'both'}}></div>
          </form>
        </div>
      )}

      {/* Feed de Posts (Visível para todos) */}
      <div className="feed" style={{marginTop: '20px'}}>
        {posts.map(post => (
          <Post key={post.id} post={post} onLike={toggleLike} isUserLogged={!!user} />
        ))}
      </div>
    </main>
  );
}

export default Home;