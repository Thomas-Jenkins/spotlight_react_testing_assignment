import { Redirect, Link, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { usePost } from '../hooks/usePosts';

export default function PostDetail() {
  const { user } = useUser();
  const { id } = useParams();
  
  const { postDetail, error } = usePost(id);

  if (!user) {
    return <Redirect to="/auth" />;
  }
  const owner = user.id === postDetail.uuid;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <div>
        <h2>{ postDetail.title }</h2>
        <p>{ postDetail.description }</p>
        <p>{ postDetail.email }</p>
        {owner && (
          <p aria-label="edit">
            <Link to={`/post/edit/${id}`}>Edit</Link>
          </p>
        )}
      </div>
    </>
  );
}
