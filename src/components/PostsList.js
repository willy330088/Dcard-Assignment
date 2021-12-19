import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from './Post';

const PostsContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  padding: 30px 80px;
`;

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  async function fetchDcardPosts() {
    const res = await fetch(
      'https://asia-east1-dcard-assignment.cloudfunctions.net/getDcardPosts'
    );
    const json = await res.json();
    setPosts(json);
  }

  useEffect(() => {
    fetchDcardPosts();
  }, []);

  return (
    <PostsContainer>
      {posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </PostsContainer>
  );
}
