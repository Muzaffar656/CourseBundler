import { ChakraProvider,theme, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './Redux/store.js'
import {BrowserRouter as Router } from 'react-router-dom';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
 <StrictMode>

<Provider store={store}>

<ChakraProvider theme={theme}>
    <ColorModeScript />
    <Router>
      
    <App />
    </Router>
  </ChakraProvider>
</Provider>
    
 </StrictMode>
);
