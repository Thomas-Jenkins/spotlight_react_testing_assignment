import { useContext, useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { deletePost, updatePost } from '../../services/fetchUtils';
import { usePost } from '../hooks/usePosts';
import { UserContext } from '../context/UserContext';
import './EditPostDetail.css';

export default function EditPostDetail() {
  const { id } = useParams();
  const { postDetail } = usePost(id);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const history = useHistory();

  const { user } = useContext(UserContext);


  if (!user) {
    return <Redirect to="/auth" />;
  }

  const handleSubmit = async () => {
    await updatePost(id, titleInput, descriptionInput);
    setTitleInput('');
    setDescriptionInput('');
    history.push(`/post/detail/${id}`);
  };

  const handleDelete = async () => {
    await deletePost(id);
    history.push('/');
  };
  
  return (
    <>
      <div className="edit-post=wrapper">
        <h1 className="edit-post-title">Edit Post</h1>
        <h2 className="title-display">{postDetail.title}</h2>
        <input className="edit-title-input" type="text" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
        <p className="description-display">{postDetail.description}</p>
        <input className="edit-description-display" type="text" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}/>
        <button className="edit-post-button" onClick={() => handleSubmit({ id, titleInput, descriptionInput })}>Save This Post</button>
        <button className="delete-post-button" onClick={() => handleDelete({ id })}>Delete This Post</button>
      </div>
    </>
  );
}
