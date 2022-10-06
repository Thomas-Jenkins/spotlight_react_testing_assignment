import { useState, useEffect } from 'react';
import { getPosts } from '../../services/fetchUtils';

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


// import { useEffect, useState } from 'react';
// import { getPostDetail } from '../services/posts';
// export function usePost(id) {
//   const [postDetail, setPostDetail] = useState({});
//   useEffect(() => {
//     const fetchData = async () => {
//
//         const data = await getPostDetail(id);
//         setPostDetail(data);
//      }
//     fetchData();
//   }, [id]);

//   return { postDetail, setPostDetail };
// }