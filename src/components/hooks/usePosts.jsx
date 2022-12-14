import { useState, useEffect } from 'react';
import { getPosts, getPostDetail, updatePost } from '../../services/fetchUtils';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getPosts();
      return setPosts(data);
    }
    fetchData();
  }, []);
  return posts;
}

export function usePost(id) {
  const [postDetail, setPostDetail] = useState({});
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {

        const data = await getPostDetail(id);
        setPostDetail(data);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, [id]);
  return { postDetail, setPostDetail, error, setError };
}

export function useUpdatePost(id, title, description) {
  const [postTitle, setPostTitle] = useState(title);
  const [postDescription, setPostDescription] = useState(description);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await updatePost(id, postTitle, postDescription);
        setPostTitle(data.title);
        setPostDescription(data.description);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, [id, postTitle, postDescription]);
  return { postTitle, setPostTitle, postDescription, setPostDescription, error, setError };
}