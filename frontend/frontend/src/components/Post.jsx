import React from 'react';

function Post({ post, onLike, isUserLogged }) {
  return (
    <div className="post-card">
      <h3>@{post.author}</h3>
      <p className="post-content">{post.content}</p>
      
      {/* Botão de Curtir */}
      <button 
        onClick={() => onLike(post.id)} 
        style={{
          background: 'transparent',
          fontSize: '1.1rem',
          padding: '5px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: post.likedByMe ? '#e0245e' : 'var(--text-color)',
          cursor: 'pointer'
        }}
      >
        <span>{post.likedByMe ? '❤️' : '🖤'}</span>
        <span>{post.likes}</span>
      </button>
    </div>
  );
}

export default Post;