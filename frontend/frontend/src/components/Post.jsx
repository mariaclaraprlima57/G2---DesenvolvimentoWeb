import React from 'react';

function Post({ post, onLike, isUserLogged }) {
  return (
    <div className="post-card">
      <h3 className="post-author">@{post.author}</h3>
      <p className="post-content">{post.content}</p>
      
      <button 
        onClick={() => onLike(post.id)}
        className="theme-btn"
        disabled={!isUserLogged} // Só deixa curtir se estiver logado (Requisito da prova!)
      >
        {post.likedByMe ? '❤️' : '🤍'} {post.likes}
      </button>
    </div>
  );
}

export default Post;