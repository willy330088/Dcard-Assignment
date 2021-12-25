import React from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
  padding: 40px;
  cursor: pointer;
  border-bottom: 1px solid #e3e3e3;
`;

const PostTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  padding-bottom: 20px;
`;

const PostExcerpt = styled.div`
  font-size: 18px;
  color: grey;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function Post({ post, forwardedRef }) {
  return (
    <PostContainer ref={forwardedRef}>
      <PostTitle>{post.title}</PostTitle>
      <PostExcerpt>{post.excerpt ? post.excerpt : '本文無摘要'}</PostExcerpt>
    </PostContainer>
  );
}
