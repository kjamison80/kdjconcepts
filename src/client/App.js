import React from 'react';
import styled from 'styled-components';

// Our single Styled Component definition
const AppContaienr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 40px;
  background: #333;
  color: #fff;
  font-family: arial;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const App = () => <AppContaienr>Coming Soon.</AppContaienr>;

export default App;