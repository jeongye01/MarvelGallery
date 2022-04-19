import Router from './Router';
import GlobalStyle, { darkTheme, lightTheme } from './Styles';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />

        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
