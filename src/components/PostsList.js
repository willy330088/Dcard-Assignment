import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Post from './Post';

const PostsContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  padding: 30px 80px;
`;

export default function PostsList() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [lastPost, setLastPost] = useState('');

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchDcardPosts();
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading]
  );

  async function fetchDcardPosts() {
    setLoading(true);
    const res = await fetch(
      `http://localhost:3000/getDcardPosts?isFirstPage=${isFirstPage}&lastPost=${lastPost}`
    );
    const json = await res.json();
    setPosts((prevPosts) => {
      return [...prevPosts, ...json];
    });
    setLastPost(json[json.length - 1].id);
    setIsFirstPage(false);
    setLoading(false);
  }

  useEffect(() => {
    fetchDcardPosts();
  }, []);

  return (
    <PostsContainer>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <Post forwardedRef={lastPostElementRef} post={post} key={post.id} />
          );
        } else {
          return <Post post={post} key={post.id} />;
        }
      })}
    </PostsContainer>
  );
}
