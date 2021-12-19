import React from 'react';
import styled from 'styled-components';
import PostsList from './components/PostsList';

const MainContainer = styled.div`
  background-color: #03334d;
  min-height: 100vh;
  padding: 0 18%;
`;

function App() {
  return (
    <MainContainer>
      <PostsList />
    </MainContainer>
  );
}

export default App;
