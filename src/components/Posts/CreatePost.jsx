import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { createPost } from '../../services/fetchUtils';
import './CreatePost.css';
import { UserContext } from '../context/UserContext';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { user } = useContext(UserContext);
  
  const { userM } = useUser();
  if (!userM) {
    return <Redirect to="/auth" />;
  }

  return (
    <section className="create-post-wrapper">
      <h1>What&apos;s on your mind?</h1>
      <div className="create-post-container">
        <form className="create-post-form" onSubmit={ async (e) => {
          e.preventDefault();
          await createPost(user.id, user.email, title, description);
        }}>
          <label htmlFor="title" className="title-input">
            <input name="title" type="text" className="title" placeholder="title" value={ title } onChange={ (e) => setTitle(e.target.value)} />
          </label>
          <label htmlFor="description" className="description-input" >
            <input name="description" type="text" className="description" placeholder="description" value={ description } onChange={(e) => setDescription(e.target.value) }/>
          </label>
          <div className="create-post-button">
            <button>
              create post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;