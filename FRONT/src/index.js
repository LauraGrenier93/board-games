
import React from 'react';
import { render } from 'react-dom'; 
import 'semantic-ui-css/semantic.min.css'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './store'; 

import App from './containers/App'; 

const rootReactElement = (
  <Provider store={store}> 
    <Router>
      <App />
    </Router>
  </Provider>
);

const target = document.getElementById('root');

render(rootReactElement, target);
