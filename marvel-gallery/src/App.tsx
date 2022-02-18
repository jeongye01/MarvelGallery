import Router from './Router';
import GlobalStyle, { darkTheme, lightTheme } from './Styles';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <Router />
    </ThemeProvider>
  );
}

export default App;
