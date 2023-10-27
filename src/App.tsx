import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Suspense, useState } from 'react';
import { GlobalStyle } from './theme/GlobalStyle';
import { lightheme, darkthem } from './theme/theme';

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
      <button onClick={toggleTheme}>Toggle Theme</button>{' '}
      {theme === darkthem ? '🌚' : '🌝'}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Suspense fallback={<div>...loading</div>}>
          <Router />
        </Suspense>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
