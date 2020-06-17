import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './screens/app/App';
import * as serviceWorker from './serviceWorker';

// Styling
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const _App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
  )
}

ReactDOM.render(
  <_App/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
