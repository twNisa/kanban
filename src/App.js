import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './layout/Header/Header';
import Main from './layout/Main/Main';
import {globalTheme, lightTheme, darkTheme} from "./theme"
import data from "./data.json"
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const AppContainer = styled.section`
  overflow-x: hidden;
  background-color: ${props => props.theme.bg};
`

function App() {
  const colorTheme = useSelector((state) => state.preferences.theme)

  const theme = colorTheme === "light" ? lightTheme : darkTheme

  const boards = useSelector((state) => state.boards.boards)

  return (

    <ThemeProvider theme={theme}>
      <ThemeProvider theme={globalTheme}>
        <AppContainer className="App">
          <Header />
          <Main />
        </AppContainer>
      </ThemeProvider>
    </ThemeProvider>
  );
}

export default App;
