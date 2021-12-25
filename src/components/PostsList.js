import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Post from './Post';

const PostsContainer = styled.div`
  min-height: 100vh;
  padding: 30px 80px;
  position: relative;
  background-color: white;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 20px;
  font-weight: bold;
`;

const AuthorText = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  font-size: 17px;
  font-weight: bold;
`;

export default function PostsList() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [lastPostId, setLastPostId] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchDcardPosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  async function fetchDcardPosts() {
    setLoading(true);

    const res = await fetch(
      `http://localhost:3000/getDcardPosts?lastPostId=${lastPostId}`
    );
    const json = await res.json();
    if (json.length) {
      setPosts((prevPosts) => {
        return [
          ...prevPosts,
          ...json.map((p) => {
            return { title: p.title, excerpt: p.excerpt, id: p.id };
          }),
        ];
      });
      setLastPostId(json[json.length - 1].id);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchDcardPosts();
  }, []);

  return (
    <PostsContainer>
      <AuthorText>Created by William, Juo-Wei Lin</AuthorText>
      {posts.map((post, index) => {
        return posts.length === index + 1 ? (
          <Post forwardedRef={lastPostElementRef} post={post} key={post.id} />
        ) : (
          <Post post={post} key={post.id} />
        );
      })}
      {loading ? <LoadingText>Loading...</LoadingText> : null}
    </PostsContainer>
  );
}
