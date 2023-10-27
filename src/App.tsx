import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Suspense, useState } from 'react';
import { GlobalStyle } from './theme/GlobalStyle';
import { lightheme, darkthem } from './theme/theme';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState(lightheme);
  const toggleTheme = () => {
    if (theme === lightheme) {
      setTheme(darkthem);
    } else {
      setTheme(darkthem);
    }
  };

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <button onClick={toggleTheme}>Toggle Theme</button>{' '}
        {theme === darkthem ? '🌚' : '🌝'}
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Suspense fallback={<div>...loading</div>}>
            <Router />
          </Suspense>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </BrowserRouter>
    </>
  );
}

export default App;
