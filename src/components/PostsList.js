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
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [lastPost, setLastPost] = useState('');

  async function fetchDcardPosts() {
    const res = await fetch(
      `http://localhost:3000/getDcardPosts?isFirstPage=${isFirstPage}&lastPost=${lastPost}`
    );
    const json = await res.json();
    setPosts(
      json.map((p) => {
        return { title: p.title, excerpt: p.excerpt, id: p.id };
      })
    );
    setLastPost(json[json.length - 2].id);
    console.log(json);
  }

  useEffect(() => {
    fetchDcardPosts();
    setIsFirstPage(false);
  }, []);

  console.log(posts);
  console.log(isFirstPage);
  console.log(lastPost);

  return (
    <PostsContainer>
      <button onClick={fetchDcardPosts}>hi</button>
      {posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </PostsContainer>
  );
}
