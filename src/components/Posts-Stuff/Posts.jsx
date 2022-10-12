import React, { useContext } from 'react';
import PostCard from './PostCard';
import { usePosts } from '../hooks/usePosts';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Posts.css';

function Posts() {
  const { user } = useContext(UserContext);
 
  const posts = usePosts();

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <main className="posts">
      <h1 className="title">Bulletin Board</h1>
      <div className="posts-container">
        { posts.map((post) => (
          <PostCard
            key={ post.id } { ...post } />
        )) }
      </div>
    </main>
  );
}

export default Posts;
