import React from 'react';
import styled from 'styled-components';
import Grocery from './pages/grocery/Grocery';

// Our single Styled Component definition
const AppContaienr = styled.div`
  text-align: center;
  font-family: arial;
`;

const App = () => <AppContaienr><Grocery /></AppContaienr>;

export default App;