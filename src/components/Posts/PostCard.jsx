import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ id, email, title, description }) {
  return (
    <section className="post-card-wrapper">
      <Link to={ `/post/detail/${id}` }>
        <div className="title-container">{ title }</div>
        <p className="description-container">{ description }</p>
        <p className="email-container">{ email }</p>
      </Link>
    </section>
    
  );
}

export default PostCard;